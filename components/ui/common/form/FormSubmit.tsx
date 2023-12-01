'use client';

import { Button, ButtonProps } from '@/components/ui/common/shadcn/button';
import { Children } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

interface FormSubmitProps extends ButtonProps {
  children: Children;
}

const FormSubmit = ({
  children,
  ...props
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      size="sm"
      {...props}
      className={cn(props.className, '')}
      type="submit"
      disabled={pending}
      variant="primary"
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
