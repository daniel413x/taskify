'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { createAuditLog } from '@/lib/utils';
import { ACTION, Card, ENTITY_TYPE } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import CopyCardSchema from './schema';
import { CopyCardInputType, CopyCardReturnType } from './types';

const handler = async (data: CopyCardInputType): Promise<CopyCardReturnType> => {
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
    const idForNewCard = uuid();
    const titleForNewCard = `${copiedCard.title} – Copy`;
    const transaction = [
      prismadb.card.create({
        data: {
          id: idForNewCard,
          title: titleForNewCard,
          desc: copiedCard.desc,
          listId: copiedCard.listId,
          order: newOrder,
        },
      }),
      createAuditLog(
        idForNewCard,
        ENTITY_TYPE.CARD,
        titleForNewCard,
        ACTION.CREATE,
        orgId!,
        user!,
      ),
    ];
    card = (await prismadb.$transaction(transaction))[0];
  } catch (e) {
    return {
      error: 'Could not copy',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: card as Card };
};

const copyCard = createValidatedAction(CopyCardSchema, handler);

export default copyCard;
