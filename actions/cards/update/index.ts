'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { ACTION, Card, ENTITY_TYPE } from '@prisma/client';
import { createAuditLog } from '@/lib/utils';
import ApiException from '@/app/api/(exception)/ApiException';
import { UpdateCardInputType, UpdateCardReturnType } from './types';
import UpdateCardSchema from './schema';

const handler = async (data: UpdateCardInputType): Promise<UpdateCardReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
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
    const where = {
      id,
      list: {
        board: {
          orgId,
        },
      },
    };
    card = await prismadb.card.findUnique({
      where,
    });
    if (!card) {
      throw new ApiException('Card not found', 404);
    }
    const transaction = [
      prismadb.card.update({
        where,
        data: {
          ...values,
        },
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.CARD,
        values.title || card.title,
        ACTION.UPDATE,
        orgId,
        user,
      ),
    ];
    card = (await prismadb.$transaction(transaction))[0];
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${id}`);
  return {
    data: card as Card,
  };
};

const updateCard = createValidatedAction(UpdateCardSchema, handler);

export default updateCard;
