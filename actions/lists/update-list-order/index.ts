'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import UpdateListOrderOrderSchema from './schema';
import { UpdateListOrderInputType, UpdateListOrderReturnType } from './types';

const handler = async (data: UpdateListOrderInputType): Promise<UpdateListOrderReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    items,
    boardId,
  } = data;
  let lists;
  try {
    const transaction = items.map((list) => prismadb.list.update({
      where: {
        id: list.id,
        board: {
          orgId,
        },
      },
      data: {
        order: list.order,
      },
    }));
    lists = await prismadb.$transaction(transaction);
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return {
    data: lists,
  };
};

const updateListOrder = createValidatedAction(UpdateListOrderOrderSchema, handler);

export default updateListOrder;
