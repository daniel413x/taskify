'use client';

import { Plus, X } from 'lucide-react';
import FormInput from '@/components/ui/common/form/FormInput';
import FormSubmit from '@/components/ui/common/form/FormSubmit';
import { Button } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import { toast } from 'sonner';
import createList from '@/actions/lists/create';
import { useRouter } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import useInlineEditing from '@/lib/hooks/useInlineEditing';
import ListWrapper from './ListWrapper';

interface ListFormProps {
  boardId: string;
}

const ListForm = ({
  boardId,
}: ListFormProps) => {
  const {
    formRef,
    inputRef,
    isEditing,
    enableEditing,
    disableEditing,
  } = useInlineEditing();
  const router = useRouter();
  const {
    execute,
    isLoading,
    fieldErrors,
  } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created!`);
      disableEditing();
      router.refresh();
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onSubmit = (formData: FormData) => {
    execute({ title: formData.get('title') as string, boardId });
  };
  useOnClickOutside(formRef, disableEditing);
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-md space-y-4 shadow-md bg-white/50"
          action={onSubmit}
        >
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input
            hidden
            value={boardId}
            name="boardId"
          />
          <div className="flex items-centerr gap-x-1">
            <FormSubmit disabled={isLoading}>
              Add list
            </FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X width={20} height={20} />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <form className="w-full p-3 rounded-md space-y-4 shadow-md hover:bg-white/50">
        <button
          className="w-full h-7 rounded-md transition p-3 flex items-center font-medium text-sm"
          type="button"
          onClick={enableEditing}
        >
          <Plus width={16} height={16} className="mr-2" />
          Add a list
        </button>
      </form>
    </ListWrapper>
  );
};

export default ListForm;
