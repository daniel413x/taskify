'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import CopyCardSchema from './schema';
import { CopyCardInputType, CopyCardReturnType } from './types';

const handler = async (data: CopyCardInputType): Promise<CopyCardReturnType> => {
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
  let card;
  try {
    const copiedCard = await prismadb.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!copiedCard) {
      return { error: 'Card not found' };
    }
    // get new order
    const lastCard = await prismadb.card.findFirst({
      where: { listId: copiedCard.listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await prismadb.card.create({
      data: {
        title: `${copiedCard.title} – Copy`,
        desc: copiedCard.desc,
        listId: copiedCard.listId,
        order: newOrder,
      },
    });
  } catch (e) {
    return {
      error: 'Could not copy',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: card };
};

const copyCard = createValidatedAction(CopyCardSchema, handler);

export default copyCard;
