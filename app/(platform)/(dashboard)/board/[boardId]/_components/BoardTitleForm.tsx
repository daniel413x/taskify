'use client';

import updateBoard from '@/actions/boards/update';
import FormInput from '@/components/ui/common/form/FormInput';
import { Button } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import { Board } from '@prisma/client';
import { useState } from 'react';
import { toast } from 'sonner';
import useInlineEditing from './useInlineEditing';

interface BoardTitleFormProps {
  board: Board;
}

const BoardTitleForm = ({
  board,
}: BoardTitleFormProps) => {
  const {
    formRef,
    inputRef,
    isEditing,
    enableEditing,
    disableEditing,
    onBlur,
  } = useInlineEditing();
  const [title, setTitle] = useState<string>(board.title);
  const {
    execute,
  } = useAction(updateBoard, {
    onSuccess: (data) => {
      setTitle(data.title);
      disableEditing();
      toast.success(`Board "${data.title}" updated!`);
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onSubmit = (formData: FormData) => {
    execute({ title: formData.get('title') as string, id: board.id });
  };
  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={onSubmit}
      >
        <FormInput
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
          ref={inputRef}
        />
      </form>
    );
  }
  return (
    <Button
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
