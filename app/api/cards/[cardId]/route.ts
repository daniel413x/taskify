import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/db';
import { NextRequest } from 'next/server';
import BaseApi from '../../(base)/BaseApi';
import ApiException from '../../(exception)/ApiException';
import { ApiRouteHandler } from '../../(types)';

export const GET: ApiRouteHandler = BaseApi(async (
  _req: NextRequest,
  { params }: { params: { cardId: string; } },
) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    throw new ApiException('Unauthorized', 401);
  }
  const card = await prismadb.card.findUnique({
    where: {
      id: params.cardId,
      list: {
        board: {
          orgId,
        },
      },
    },
    include: {
      list: {
        select: {
          title: true,
        },
      },
    },
  });
  return {
    body: card,
  };
});
