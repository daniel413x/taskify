'use client';

import updateList from '@/actions/lists/update';
import FormInput from '@/components/ui/common/form/FormInput';
import { Button } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import { ListWithCards } from '@/lib/types';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';

interface ListHeaderProps {
  list: ListWithCards;
}

const ListHeader = ({
  list,
}: ListHeaderProps) => {
  const [title, setTitle] = useState<string>(list.title);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };
  useEventListener('keydown', onKeyDown);
  const {
    execute,
    isLoading,
    fieldErrors,
  } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"!`);
      disableEditing();
      setTitle(data.title);
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string;
    const newId = formData.get('id') as string;
    const newBoardId = formData.get('boardId') as string;
    if (newTitle === list.title) {
      return disableEditing();
    }
    execute({
      title: newTitle,
      id: newId,
      boardId: newBoardId,
    });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
    disableEditing();
  };
  return (
    <div className="p-3 font-semibold text-sm flex justify-center items-start gap-x-2">
      {isEditing ? (
        <form
          className="flex-1 px-[2px]"
          action={onSubmit}
          ref={formRef}
        >
          <input
            hidden
            id="id"
            name="id"
            value={list.id}
            readOnly
          />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={list.boardId}
            readOnly
          />
          <FormInput
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            errors={fieldErrors}
            disabled={isLoading}
            onBlur={onBlur}
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="submit" hidden />
        </form>
      ) : (
        <Button
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent items-start justify-start"
          variant="ghost"
          onClick={enableEditing}
        >
          {list.title}
        </Button>
      )}
    </div>
  );
};

export default ListHeader;
