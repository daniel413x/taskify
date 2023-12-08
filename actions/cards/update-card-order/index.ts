'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import UpdateCardOrderOrderSchema from './schema';
import { UpdateCardOrderInputType, UpdateCardOrderReturnType } from './types';

const handler = async (data: UpdateCardOrderInputType): Promise<UpdateCardOrderReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    items,
    boardId,
  } = data;
  let cards;
  try {
    const transaction = items.map((card) => prismadb.card.update({
      where: {
        id: card.id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        order: card.order,
        listId: card.listId,
      },
    }));
    cards = await prismadb.$transaction(transaction);
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return {
    data: cards,
  };
};

const updateCardOrder = createValidatedAction(UpdateCardOrderOrderSchema, handler);

export default updateCardOrder;
