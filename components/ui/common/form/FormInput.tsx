'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/common/shadcn/label';
import { cn } from '@/lib/utils';
import { Input } from '../shadcn/input';
import FormErrors from './FormErrors';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: Record<string, string[]> | undefined;
  id: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  errors,
  ...props
}: FormInputProps, ref) => {
  const {
    id,
    className,
  } = props;
  const { pending } = useFormStatus();
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label ? (
          <Label
            htmlFor={id}
            className="text-xs font-semibold text-neutral-700"
          >
            {label}
          </Label>
        ) : null}
        <Input
          {...props}
          name={props.name || props.id}
          ref={ref}
          className={cn('text-xs py-1 px-2 h-7', className)}
          area-aria-describedby={`${id}-error`}
          disabled={pending}
        />
      </div>
      <FormErrors
        id={id}
        errors={errors}
      />
    </div>
  );
});

export default FormInput;
