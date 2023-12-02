import { z } from 'zod';
import { Board } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import UpdateBoardSchema from './schema';

export type UpdateBoardInputType = z.infer<typeof UpdateBoardSchema>;
export type UpdateBoardReturnType = ActionState<UpdateBoardInputType, Board>;
