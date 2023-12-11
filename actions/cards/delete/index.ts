'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import ApiException from '@/app/api/(exception)/ApiException';
import { createAuditLog } from '@/lib/utils';
import { ACTION, Card, ENTITY_TYPE } from '@prisma/client';
import { DeleteCardInputType, DeleteCardReturnType } from './types';
import DeleteCardSchema from './schema';

const handler = async (data: DeleteCardInputType): Promise<DeleteCardReturnType> => {
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
      prismadb.card.delete({
        where,
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.CARD,
        card.title,
        ACTION.DELETE,
        orgId,
        user,
      ),
    ];
    card = (await prismadb.$transaction(transaction))[0];
  } catch (e) {
    return {
      error: 'Could not delete',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: card as Card };
};

const deleteCard = createValidatedAction(DeleteCardSchema, handler);

export default deleteCard;
