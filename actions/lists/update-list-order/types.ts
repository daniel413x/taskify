import { z } from 'zod';
import { List } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import UpdateListOrderSchema from './schema';

export type UpdateListOrderInputType = z.infer<typeof UpdateListOrderSchema>;
export type UpdateListOrderReturnType = ActionState<UpdateListOrderInputType, List[]>;
