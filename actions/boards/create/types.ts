import { z } from 'zod';
import { Board } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import CreateBoardSchema from './schema';

export type CreateBoardInputType = z.infer<typeof CreateBoardSchema>;
export type CreateBoardReturnType = ActionState<CreateBoardInputType, Board>;
