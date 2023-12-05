import { z } from 'zod';

const CopyBoardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

export default CopyBoardSchema;
