'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { redirect } from 'next/navigation';
import DeleteBoardSchema from './schema';
import { DeleteBoardInputType, DeleteBoardReturnType } from './types';

const handler = async (data: DeleteBoardInputType): Promise<DeleteBoardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    id,
  } = data;
  try {
    await prismadb.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (e) {
    return {
      error: 'Could not delete',
    };
  }
  revalidatePath(`/${ORGANIZATION_ROUTE}/${orgId}`);
  redirect(`/${ORGANIZATION_ROUTE}/${orgId}`);
};

const deleteBoard = createValidatedAction(DeleteBoardSchema, handler);

export default deleteBoard;
