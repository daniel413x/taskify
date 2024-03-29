'use client';

import updateList from '@/actions/lists/update';
import FormInput from '@/components/ui/common/form/FormInput';
import { Button } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import { ListWithCards } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';
import useOnKeyDown from '@/lib/hooks/useOnKeyDown';
import useInlineEditing from '@/lib/hooks/useInlineEditing';
import { cn } from '@/lib/utils';
import ListOptions from './ListOptions';

interface ListHeaderProps {
  list: ListWithCards;
  onAddCard: () => void;
}

const ListHeader = ({
  list,
  onAddCard,
}: ListHeaderProps) => {
  const {
    formRef,
    inputRef,
    isEditing,
    enableEditing,
    disableEditing,
    onBlur,
  } = useInlineEditing();
  const [title, setTitle] = useState<string>(list.title);
  const {
    execute,
    isLoading,
    fieldErrors,
  } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (e) => {
      toast.error(e);
      setTitle(list.title);
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
  const onEscape = () => {
    if (isEditing) {
      setTitle(list.title);
    }
  };
  useOnKeyDown('Escape', onEscape);
  const maxW = 'max-w-[216px]';
  return (
    <div className="p-3 font-semibold text-sm flex justify-center items-center gap-x-2">
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
            className={cn('text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white', maxW)}
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
          className={cn('w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent items-start justify-start', 'maxW')}
          variant="ghost"
          onClick={enableEditing}
        >
          <span className="truncate">
            {title}
          </span>
        </Button>
      )}
      <ListOptions
        list={list}
        onAddCard={onAddCard}
      />
    </div>
  );
};

export default ListHeader;
