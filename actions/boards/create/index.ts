'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import CreateBoardSchema from './schema';
import { CreateBoardInputType } from './types';

const handler = async (data: CreateBoardInputType) => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }
  const { title } = data;
  let board;
  try {
    board = await prismadb.board.create({
      data: {
        title,
      },
    });
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
