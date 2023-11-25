'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import DeleteBoardSchema from './schema';
import { DeleteBoardInputType } from './types';

const handler = async (id: DeleteBoardInputType) => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }
  await prismadb.board.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/${ORGANIZATION_ROUTE}/${id}`);
  return {};
};

const deleteBoard = createValidatedAction(DeleteBoardSchema, handler);

export default deleteBoard;
