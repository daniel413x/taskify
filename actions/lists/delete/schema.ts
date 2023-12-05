import { z } from 'zod';

const DeleteBoardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

export default DeleteBoardSchema;
