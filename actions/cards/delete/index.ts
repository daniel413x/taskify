'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import DeleteCardSchema from './schema';
import { DeleteCardInputType, DeleteCardReturnType } from './types';

const handler = async (data: DeleteCardInputType): Promise<DeleteCardReturnType> => {
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
    card = await prismadb.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (e) {
    return {
      error: 'Could not delete',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: card };
};

const deleteCard = createValidatedAction(DeleteCardSchema, handler);

export default deleteCard;
