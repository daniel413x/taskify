'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import UpdateListSchema from './schema';
import { UpdateListInputType, UpdateListReturnType } from './types';

const handler = async (data: UpdateListInputType): Promise<UpdateListReturnType> => {
  const { userId, orgId } = auth();
  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    id,
    title,
    boardId,
  } = data;
  let list;
  try {
    list = await prismadb.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${id}`);
  return {
    data: list,
  };
};

const updateList = createValidatedAction(UpdateListSchema, handler);

export default updateList;
