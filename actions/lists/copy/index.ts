'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import CopyListSchema from './schema';
import { CopyListInputType, CopyListReturnType } from './types';

const handler = async (data: CopyListInputType): Promise<CopyListReturnType> => {
  const { userId, orgId } = auth();
  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    id,
    boardId,
  } = data;
  let list;
  try {
    const copiedList = await prismadb.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!copiedList) {
      return { error: 'List not found' };
    }
    // get new order
    const lastList = await prismadb.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await prismadb.list.create({
      data: {
        boardId: copiedList.boardId,
        title: copiedList.title,
        order: newOrder,
        cards: {
          createMany: {
            data: copiedList.cards.map((card) => ({
              title: card.title,
              desc: card.desc,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (e) {
    return {
      error: 'Could not copy',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: list };
};

const copyList = createValidatedAction(CopyListSchema, handler);

export default copyList;
