'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { createAuditLog } from '@/lib/utils';
import { v4 as uuid } from 'uuid';
import { ACTION, ENTITY_TYPE, PrismaPromise } from '@prisma/client';
import { CreateCardInputType } from './types';
import CreateCardSchema from './schema';

const handler = async (data: CreateCardInputType) => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
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
    const id = uuid();
    const transaction = [
      prismadb.card.create({
        data: {
          listId,
          title,
          id,
          order: newOrder,
        },
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.CARD,
        title,
        ACTION.CREATE,
        orgId,
        user,
      ),
    ];
    card = (await prismadb.$transaction(transaction as PrismaPromise<any>[]))[0];
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
