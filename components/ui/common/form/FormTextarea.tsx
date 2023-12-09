'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/common/shadcn/label';
import { cn } from '@/lib/utils';
import { Textarea } from '../shadcn/textarea';
import FormErrors from './FormErrors';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errors?: Record<string, string[]> | undefined;
  id: string;
  onKeyDown?: (...args: any[]) => void;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  label,
  errors,
  onKeyDown,
  ...props
}: FormTextareaProps, ref) => {
  const {
    id,
    className,
  } = props;
  const { pending } = useFormStatus();
  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {label ? (
          <Label
            htmlFor={id}
            className="text-xs font-semibold text-neutral-700"
          >
            {label}
          </Label>
        ) : null}
        <Textarea
          {...props}
          onKeyDown={onKeyDown}
          name={props.name || props.id}
          ref={ref}
          className={cn('resize-non focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm', className)}
          area-aria-describedby={`${id}-error`}
          disabled={pending || props.disabled}
          defaultValue={props.defaultValue}
        />
      </div>
      <FormErrors
        id={id}
        errors={errors}
      />
    </div>
  );
});

export default FormTextarea;
