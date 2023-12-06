import { z } from 'zod';

export type FieldErrors<T> = {
  [K in keyof T]: string[];
};

export type ActionState<I, O> = {
  fieldErrors?: FieldErrors<I>;
  error?: string | null;
  data?: O;
};

export const createValidatedAction = <I, O>(
  schema: z.Schema<I>,
  handler: (data: I) => Promise<ActionState<I, O>>,
) => async (data: I): Promise<ActionState<I, O>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      // throw new Error(validationResult.error.flatten().fieldErrors, 500);
      return {
        fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<I>,
      };
    }
    return handler(validationResult.data);
  };
