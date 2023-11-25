'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import { useFormStatus } from 'react-dom';

const FormDelete = () => {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" variant="destructive" type="submit" disabled={pending}>
      Delete
    </Button>
  );
};

export default FormDelete;
