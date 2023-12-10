'use client';

import { CardWithList } from '@/lib/types';
import { Copy, Delete } from 'lucide-react';
import { useParams } from 'next/navigation';
import useAction from '@/lib/hooks/useAction';
import { toast } from 'sonner';
import copyCard from '@/actions/cards/copy';
import deleteCard from '@/actions/cards/delete';
import { Skeleton } from '../../common/shadcn/skeleton';
import { Button } from '../../common/shadcn/button';
import useCardModal from './useCardModal';

interface ActionsProps {
  card: CardWithList;
}

const Actions = ({
  card,
}: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  const {
    execute: executeCopyCard,
    isLoading: isLoadingCopyCard,
  } = useAction(copyCard, {
    onSuccess: () => {
      toast.success(`${card.title} copied successfully!`);
      cardModal.onClose();
    },
    onError: () => {
      toast.error('Could not copy');
    },
  });
  const {
    execute: executeDeleteCard,
    isLoading: isLoadingDeleteCard,
  } = useAction(deleteCard, {
    onSuccess: () => {
      toast.success('Card deleted successfully');
      cardModal.onClose();
    },
    onError: () => {
      toast.error('Could not copy');
    },
  });
  const block = isLoadingCopyCard || isLoadingDeleteCard;
  const boardId = params.boardId as string;
  const submitOnCopy = () => {
    executeCopyCard({
      id: card.id,
      boardId,
    });
  };
  const submitOnDelete = () => {
    executeDeleteCard({
      id: card.id,
      boardId,
    });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Actions
      </p>
      <Button
        variant="gray"
        size="inline"
        className="w-full justify-start"
        onClick={submitOnCopy}
        disabled={block}
      >
        <Copy
          width={16}
          height={16}
          className="mr-2"
        />
        Copy
      </Button>
      <Button
        variant="gray"
        size="inline"
        className="w-full justify-start"
        onClick={submitOnDelete}
        disabled={block}
      >
        <Delete
          width={16}
          height={16}
          className="mr-2"
        />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = () => (
  <div className="space-y-2 mt-2">
    <Skeleton className="w-20 h-4 bg-neutral-200" />
    <Skeleton className="w-full h-8 bg-neutral-200" />
    <Skeleton className="w-full h-8 bg-neutral-200" />
  </div>
);

export default Actions;
