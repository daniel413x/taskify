'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { createAuditLog, hasBoardsRemaining } from '@/lib/utils';
import { ACTION, ENTITY_TYPE, PrismaPromise } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { CreateBoardInputType } from './types';
import CreateBoardSchema from './schema';

const handler = async (data: CreateBoardInputType) => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    };
  }
  const isPro = false;
  const canCreate = await hasBoardsRemaining();
  if (!isPro && !canCreate) {
    return {
      error: 'You have reached your limit of free boards. Please upgrade to create more.',
    };
  }
  const { title, image } = data;
  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  ] = image.split('|');
  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: 'Missing fields. Failed to create board.',
    };
  }
  let board;
  try {
    const id = uuid();
    const transaction: PrismaPromise<any>[] = [
      prismadb.board.create({
        data: {
          id,
          orgId,
          title,
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageLinkHTML,
          imageUserName,
        },
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.BOARD,
        title,
        ACTION.CREATE,
        orgId!,
        user!,
      ),
    ];
    // handle free user restriction counting
    if (!isPro) {
      const orgLimit = await prismadb.orgLimit.findUnique({
        where: {
          orgId,
        },
      });
      if (orgLimit) {
        transaction.push(prismadb.orgLimit.update({
          where: { orgId },
          data: { count: orgLimit.count + 1 },
        }));
      } else {
        transaction.push(prismadb.orgLimit.create({
          data: { orgId, count: 0 },
        }));
      }
    }
    board = (await prismadb.$transaction(transaction))[0];
  } catch (e: any) {
    return {
      error: 'Could not create',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${board.id}`);
  return { data: board };
};

const createBoard = createValidatedAction(CreateBoardSchema, handler);

export default createBoard;
