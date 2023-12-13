import { z } from 'zod';
import { ActionState } from '@/actions/utils/create-validated-action';
import RedirectSchema from './schema';

export type RedirectInputType = z.infer<typeof RedirectSchema>;
export type RedirectReturnType = ActionState<RedirectInputType, string>;
