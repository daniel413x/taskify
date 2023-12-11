'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { createAuditLog } from '@/lib/utils';
import ApiException from '@/app/api/(exception)/ApiException';
import { ACTION, ENTITY_TYPE, List } from '@prisma/client';
import { DeleteListInputType, DeleteListReturnType } from './types';
import DeleteListSchema from './schema';

const handler = async (data: DeleteListInputType): Promise<DeleteListReturnType> => {
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
  let list;
  try {
    const where = {
      id,
      boardId,
      board: {
        orgId,
      },
    };
    list = await prismadb.list.findUnique({
      where,
    });
    if (!list) {
      throw new ApiException('List not found', 404);
    }
    const transaction = [
      prismadb.list.delete({
        where,
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.LIST,
        list.title,
        ACTION.DELETE,
        orgId,
        user,
      ),
    ];
    list = (await prismadb.$transaction(transaction))[0];
  } catch (e) {
    return {
      error: 'Could not delete',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${boardId}`);
  return { data: list as List };
};

const deleteList = createValidatedAction(DeleteListSchema, handler);

export default deleteList;
