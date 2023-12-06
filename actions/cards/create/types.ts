import { z } from 'zod';
import { Card } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import CreateCardSchema from './schema';

export type CreateCardInputType = z.infer<typeof CreateCardSchema>;
export type CreateCardReturnType = ActionState<CreateCardInputType, Card>;
