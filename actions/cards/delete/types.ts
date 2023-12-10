import { z } from 'zod';
import { Card } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import DeleteCardSchema from './schema';

export type DeleteCardInputType = z.infer<typeof DeleteCardSchema>;
export type DeleteCardReturnType = ActionState<DeleteCardInputType, Card>;
