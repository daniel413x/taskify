'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { redirect } from 'next/navigation';
import { createAuditLog } from '@/lib/utils';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
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
    const transaction = [
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
