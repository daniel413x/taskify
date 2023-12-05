import { z } from 'zod';
import { List } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import CopyListSchema from './schema';

export type CopyListInputType = z.infer<typeof CopyListSchema>;
export type CopyListReturnType = ActionState<CopyListInputType, List>;
