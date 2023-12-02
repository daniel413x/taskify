'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import UpdateBoardSchema from './schema';
import { UpdateBoardInputType, UpdateBoardReturnType } from './types';

const handler = async (data: UpdateBoardInputType): Promise<UpdateBoardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId) {
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
    board = await prismadb.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${id}`);
  return {
    data: board,
  };
};

const updateBoard = createValidatedAction(UpdateBoardSchema, handler);

export default updateBoard;
