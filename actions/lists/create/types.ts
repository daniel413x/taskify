import { z } from 'zod';
import { List } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import CreateListSchema from './schema';

export type CreateListInputType = z.infer<typeof CreateListSchema>;
export type CreateListReturnType = ActionState<CreateListInputType, List>;
