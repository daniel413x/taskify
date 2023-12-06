import {
  ElementRef, ForwardedRef, KeyboardEventHandler, forwardRef, useRef,
} from 'react';
import { Button } from '@/components/ui/common/shadcn/button';
import { Plus, X } from 'lucide-react';
import FormTextarea from '@/components/ui/common/form/FormTextarea';
import FormSubmit from '@/components/ui/common/form/FormSubmit';
import { cn } from '@/lib/utils';
import useAction from '@/lib/hooks/useAction';
import createCard from '@/actions/cards/create';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

interface CardFormProps {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  listId: string;
}

const CardForm = forwardRef(({
  listId,
  isEditing,
  enableEditing,
  disableEditing,
}: CardFormProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const bPadding = 'pb-2';
  const params = useParams();
  const formRef = useRef<ElementRef<'form'>>(null);
  const {
    execute,
    fieldErrors,
  } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} created!`);
      formRef.current?.reset();
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };
  const onSubmit = (formData: FormData) => {
    execute({
      title: formData.get('title') as string,
      listId: formData.get('listId') as string,
      boardId: params.boardId as string,
    });
  };
  if (isEditing) {
    return (
      <form
        ref={formRef}
        className={cn('m-1 py-0.5 px-1 space-y-4', bPadding)}
        action={onSubmit}
      >
        <FormTextarea
          id="title"
          onKeyDown={onTextareaKeyDown}
          ref={ref}
          placeholder="Enter a title for this card..."
          errors={fieldErrors}
        />
        <input hidden id="listId" name="listId" value={listId} />
        <div
          className="flex items-center gap-x-1"
        >
          <FormSubmit>
            Add card
          </FormSubmit>
          <Button
            onClick={disableEditing}
            variant="ghost"
            size="sm"
          >
            <X width={20} height={20} />
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div className={cn('px-2', bPadding)}>
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        variant="ghost"
        size="sm"
      >
        <Plus width={16} height={16} className="mr-2" />
        Add a card
      </Button>
    </div>
  );
});

export default CardForm;
