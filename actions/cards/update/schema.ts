import { z } from 'zod';

const UpdateCardSchema = z.object({
  boardId: z.string(),
  title: z.optional(
    z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    }).min(3, {
      message: 'Title is too short',
    }),
  ),
  desc: z.optional(
    z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description is required',
    }).min(3, {
      message: 'Description is too short',
    }),
  ),
  id: z.string(),
});

export default UpdateCardSchema;
