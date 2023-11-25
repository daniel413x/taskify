'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import { useFormStatus } from 'react-dom';

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Submit
    </Button>
  );
};

export default FormButton;
