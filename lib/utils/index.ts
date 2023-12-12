import { ACTION, AuditLog, ENTITY_TYPE } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs';
import prismadb from '../db';
import { MAX_FREE_BOARDS } from '../data/consts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorCatch = (error: any): string => {
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === 'object') {
      return error.response.data.message[0];
    }
    return error.response.data.message;
  }
  return error.message;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const createAuditLog = (
  entityId: string,
  entityType: ENTITY_TYPE,
  entityTitle: string,
  action: ACTION,
  orgId: string,
  user: User,
) => {
  if (!user || !orgId) {
    throw new Error('User not found');
  }
  return prismadb.auditLog.create({
    data: {
      entityId,
      entityType,
      entityTitle,
      action,
      orgId,
      userId: user.id,
      userImage: user.imageUrl,
      userName: `${user.firstName} ${user.lastName}`,
    },
  });
};

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;
  const entity = `${entityType.toLowerCase()} "${entityTitle}"`;
  switch (action) {
    case ACTION.CREATE:
      return `created ${entity}`;
    case ACTION.UPDATE:
      return `updated ${entity}`;
    case ACTION.DELETE:
      return `deleted ${entity}`;
    default:
      return `unknown action ${entity}`;
  }
};

export const hasBoardsRemaining = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error('Unauthorized');
  }
  const orgLimit = await prismadb.orgLimit.findUnique({
    where: { orgId },
  });
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  }
  return false;
};

export const getBoardsCreatedCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return 0;
  }
  const orgLimit = await prismadb.orgLimit.findUnique({
    where: { orgId },
  });
  if (!orgLimit) {
    return 0;
  }
  return orgLimit.count;
};
