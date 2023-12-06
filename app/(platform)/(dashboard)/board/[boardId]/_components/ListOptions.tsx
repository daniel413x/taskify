import copyList from '@/actions/lists/copy';
import deleteList from '@/actions/lists/delete';
import CloseButton from '@/components/ui/common/CloseButton';
import FormSubmit from '@/components/ui/common/form/FormSubmit';
import { Button } from '@/components/ui/common/shadcn/button';
import {
  Popover, PopoverClose, PopoverContent, PopoverTrigger,
} from '@/components/ui/common/shadcn/popover';
import { Separator } from '@/components/ui/common/shadcn/separator';
import useAction from '@/lib/hooks/useAction';
import { List } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

interface ListOptionsProps {
  list: List;
  onAddCard: () => void;
}

const ListOptions = ({
  list,
  onAddCard,
}: ListOptionsProps) => {
  // sometimes the popover remains after a delete action; closeRef ensures popover always gets closed
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} deleted`);
      closeRef.current?.click();
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onDelete = (formData: FormData) => {
    closeRef.current?.click();
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    executeDelete({ id, boardId });
  };
  const { execute: executeCopyList } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} copied!`);
      closeRef.current?.click();
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onCopyList = (formData: FormData) => {
    closeRef.current?.click();
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    executeCopyList({ id, boardId });
  };
  const buttonStyle = 'rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm';
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-1"
          variant="ghost"
        >
          <MoreHorizontal width={16} height={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          {list.title}
        </div>
        <PopoverClose ref={closeRef} asChild>
          <CloseButton />
        </PopoverClose>
        <Button
          className={buttonStyle}
          onClick={onAddCard}
          variant="ghost"
        >
          Add card...
        </Button>
        <form
          action={onCopyList}
        >
          <input hidden readOnly id="id" name="id" value={list.id} />
          <input hidden readOnly id="boardId" name="boardId" value={list.boardId} />
          <FormSubmit
            variant="ghost"
            className={buttonStyle}
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form
          action={onDelete}
        >
          <input hidden readOnly id="id" name="id" value={list.id} />
          <input hidden readOnly id="boardId" name="boardId" value={list.boardId} />
          <FormSubmit
            variant="ghost"
            className={buttonStyle}
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
