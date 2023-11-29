'use client';

import { Button, ButtonProps } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import { Children } from '@/lib/types';
import { X } from 'lucide-react';
import createBoard from '@/actions/boards/create';
import { toast } from 'sonner';
import {
  Popover, PopoverClose, PopoverContent, PopoverTrigger,
} from '../shadcn/popover';
import FormInput from './FormInput';
import FormSubmit from './FormSubmit';

interface FormPopoverProps extends ButtonProps {
  children: Children;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
      toast.success('Board created!');
    },
    onError: (e) => {
      console.log(e);
      toast.error(e);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({
      title,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3 relative" side={side} sideOffset={sideOffset}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute h-auto w-auto p-2 top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X width={16} height={16} />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <FormInput
            id="title"
            label="Board title"
            type="text"
            className="space-y-4"
            errors={fieldErrors}
          />
          <FormSubmit
            className="w-full"
          >
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
