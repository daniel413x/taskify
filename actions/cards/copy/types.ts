import { z } from 'zod';
import { Card } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import CopyCardSchema from './schema';

export type CopyCardInputType = z.infer<typeof CopyCardSchema>;
export type CopyCardReturnType = ActionState<CopyCardInputType, Card>;
