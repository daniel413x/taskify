'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { createAuditLog } from '@/lib/utils';
import { ACTION, Board, ENTITY_TYPE } from '@prisma/client';
import UpdateBoardSchema from './schema';
import { UpdateBoardInputType, UpdateBoardReturnType } from './types';

const handler = async (data: UpdateBoardInputType): Promise<UpdateBoardReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    id,
    title,
  } = data;
  let board;
  try {
    const transaction = [
      prismadb.board.update({
        where: {
          id,
          orgId,
        },
        data: {
          title,
        },
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.BOARD,
        title,
        ACTION.UPDATE,
        orgId,
        user,
      ),
    ];
    board = (await prismadb.$transaction(transaction))[0];
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${id}`);
  return {
    data: board as Board,
  };
};

const updateBoard = createValidatedAction(UpdateBoardSchema, handler);

export default updateBoard;
