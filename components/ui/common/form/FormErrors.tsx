import { FC } from 'react';
import { XCircle } from 'lucide-react';

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormErrors: FC<FormErrorsProps> = ({
  errors,
  id,
}: FormErrorsProps) => {
  if (!errors) {
    return null;
  }
  return (
    <div
      className="mt-2 text-xs text-rose-500"
      aria-live="polite"
      id={`${id}-error`}
    >
      {errors?.[id]?.map((e: string, i) => (
        <div className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm" key={i}>
          <XCircle height={16} width={16} className="mr-2" />
          {e}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
