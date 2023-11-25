import { z } from 'zod';

const DeleteBoardSchema = z.string({
  required_error: 'Id is required',
  invalid_type_error: 'Id is required',
});

export default DeleteBoardSchema;
