'use client';

import { Input } from '@/components/ui/common/shadcn/input';
import { useFormStatus } from 'react-dom';

interface FormInputProps {
  errors?: Record<string, any>;
}

const FormInput = ({
  errors,
}: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col space-y-2">
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
        disabled={pending}
      />
      {errors?.title ? (
        <div>
          {errors.title.map((e: string) => (
            <p key={e} className="text-rose-500">
              {e}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
