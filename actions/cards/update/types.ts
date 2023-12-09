import { z } from 'zod';
import { Card } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import UpdateCardSchema from './schema';

export type UpdateCardInputType = z.infer<typeof UpdateCardSchema>;
export type UpdateCardReturnType = ActionState<UpdateCardInputType, Card>;
