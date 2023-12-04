'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import CreateListSchema from './schema';
import { CreateListInputType } from './types';

const handler = async (data: CreateListInputType) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const { title, boardId } = data;
  let list;
  try {
    const board = await prismadb.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return {
        error: 'Board not found',
      };
    }
    const lastList = await prismadb.list.findFirst({
      where: {
        boardId,
      },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await prismadb.list.create({
      data: {
        boardId,
        title,
        order: newOrder,
      },
    });
  } catch (e: any) {
    return {
      error: 'Could not create',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: list };
};

const createList = createValidatedAction(CreateListSchema, handler);

export default createList;
