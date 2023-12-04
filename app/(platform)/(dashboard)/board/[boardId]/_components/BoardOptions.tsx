'use client';

import deleteBoard from '@/actions/boards/delete';
import { Button } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import { toast } from 'sonner';
import { MoreHorizontal, X } from 'lucide-react';
import {
  Popover, PopoverClose, PopoverContent, PopoverTrigger,
} from '@/components/ui/common/shadcn/popover';

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({
  id,
}: BoardOptionsProps) => {
  const {
    execute,
    isLoading,
  } = useAction(deleteBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" deleted!`);
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2"
          variant="transparent"
        >
          <MoreHorizontal width={16} height={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-8 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X width={16} height={16} />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          disabled={isLoading}
        >
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
