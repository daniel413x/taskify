import { z } from 'zod';
import { List } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import UpdateListSchema from './schema';

export type UpdateListInputType = z.infer<typeof UpdateListSchema>;
export type UpdateListReturnType = ActionState<UpdateListInputType, List>;
