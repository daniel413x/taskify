'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import CreateCardSchema from './schema';
import { CreateCardInputType } from './types';

const handler = async (data: CreateCardInputType) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const { title, boardId, listId } = data;
  let card;
  try {
    const list = await prismadb.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });
    if (!list) {
      return {
        error: 'List not found',
      };
    }
    const lastCard = await prismadb.card.findFirst({
      where: {
        listId,
      },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await prismadb.card.create({
      data: {
        listId,
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
  return { data: card };
};

const createCard = createValidatedAction(CreateCardSchema, handler);

export default createCard;
