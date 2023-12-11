'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { BOARD_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { createAuditLog } from '@/lib/utils';
import { ACTION, ENTITY_TYPE, List } from '@prisma/client';
import { UpdateListInputType, UpdateListReturnType } from './types';
import UpdateListSchema from './schema';

const handler = async (data: UpdateListInputType): Promise<UpdateListReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
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
    const transaction = [
      prismadb.list.update({
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
      }),
      createAuditLog(
        id,
        ENTITY_TYPE.LIST,
        title,
        ACTION.UPDATE,
        orgId,
        user,
      ),
    ];
    list = (await prismadb.$transaction(transaction))[0];
  } catch (e) {
    return {
      error: 'Could not update',
    };
  }
  revalidatePath(`/${BOARD_ROUTE}/${id}`);
  return {
    data: list as List,
  };
};

const updateList = createValidatedAction(UpdateListSchema, handler);

export default updateList;
