import { z } from 'zod';
import { List } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import DeleteListSchema from './schema';

export type DeleteListInputType = z.infer<typeof DeleteListSchema>;
export type DeleteListReturnType = ActionState<DeleteListInputType, List>;
