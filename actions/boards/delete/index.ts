'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { redirect } from 'next/navigation';
import { checkSubscription, createAuditLog } from '@/lib/utils';
import {
  ACTION, ENTITY_TYPE, PrismaPromise,
} from '@prisma/client';
import ApiException from '@/app/api/(exception)/ApiException';
import { DeleteBoardInputType, DeleteBoardReturnType } from './types';
import DeleteBoardSchema from './schema';

const handler = async (data: DeleteBoardInputType): Promise<DeleteBoardReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    id,
  } = data;
  let board;
  try {
    const where = {
      id,
      orgId,
    };
    board = await prismadb.board.findUnique({
      where,
    });
    if (!board) {
      throw new ApiException('Board not found', 404);
    }
    const transaction: PrismaPromise<any>[] = [
      prismadb.board.delete({
        where,
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.BOARD,
        board.title,
        ACTION.DELETE,
        orgId,
        user,
      ),
    ];
    // handle free user restriction counting
    const isPro = await checkSubscription();
    if (!isPro) {
      const orgLimit = await prismadb.orgLimit.findUnique({
        where: {
          orgId,
        },
      });
      if (orgLimit) {
        if (orgLimit.count > 0) {
          transaction.push(prismadb.orgLimit.update({
            where: { orgId },
            data: { count: orgLimit.count - 1 },
          }));
        }
      } else {
        transaction.push(prismadb.orgLimit.create({
          data: { orgId, count: 1 },
        }));
      }
    }
    await prismadb.$transaction(transaction);
  } catch (e) {
    return {
      error: 'Could not delete',
    };
  }
  revalidatePath(`/${ORGANIZATION_ROUTE}/${orgId}`);
  redirect(`/${ORGANIZATION_ROUTE}/${orgId}`);
};

const deleteBoard = createValidatedAction(DeleteBoardSchema, handler);

export default deleteBoard;
