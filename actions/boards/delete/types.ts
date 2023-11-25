import { z } from 'zod';
import { Board } from '@prisma/client';
import { ActionState } from '@/actions/utils/create-validated-action';
import DeleteBoardSchema from './schema';

export type DeleteBoardInputType = z.infer<typeof DeleteBoardSchema>;
export type DeleteBoardReturnType = ActionState<DeleteBoardInputType, Board>;
