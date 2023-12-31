import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/db';
import { ENTITY_TYPE } from '@prisma/client';
import { NextResponse } from 'next/server';
import BaseApi from '../../../(base)/BaseApi';
import ApiException from '../../../(exception)/ApiException';
import { ApiRouteHandler } from '../../../(types)';

export const GET: ApiRouteHandler = BaseApi(async (
  _req,
  { params }: { params: { cardId: string; } },
) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    throw new ApiException('Unauthorized', 401);
  }
  const auditLogs = await prismadb.auditLog.findMany({
    where: {
      orgId,
      entityType: ENTITY_TYPE.CARD,
      entityId: params.cardId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });
  return NextResponse.json(auditLogs);
});
