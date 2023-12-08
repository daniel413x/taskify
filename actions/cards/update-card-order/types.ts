import { z } from 'zod';
import { Card } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import UpdateCardOrderSchema from './schema';

export type UpdateCardOrderInputType = z.infer<typeof UpdateCardOrderSchema>;
export type UpdateCardOrderReturnType = ActionState<UpdateCardOrderInputType, Card[]>;
