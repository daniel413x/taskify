'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import DeleteListSchema from './schema';
import { DeleteListInputType, DeleteListReturnType } from './types';

const handler = async (data: DeleteListInputType): Promise<DeleteListReturnType> => {
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
  let list;
  try {
    list = await prismadb.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (e) {
    return {
      error: 'Could not delete',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: list };
};

const deleteList = createValidatedAction(DeleteListSchema, handler);

export default deleteList;
