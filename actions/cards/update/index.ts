'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import UpdateCardSchema from './schema';
import { UpdateCardInputType, UpdateCardReturnType } from './types';

const handler = async (data: UpdateCardInputType): Promise<UpdateCardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    id,
    boardId,
    ...values
  } = data;
  let card;
  try {
    card = await prismadb.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${id}`);
  return {
    data: card,
  };
};

const updateCard = createValidatedAction(UpdateCardSchema, handler);

export default updateCard;
