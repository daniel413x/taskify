'use client';

import { Layout } from 'lucide-react';
import { ElementRef, useRef, useState } from 'react';
import { CardWithList } from '@/lib/types';
import useAction from '@/lib/hooks/useAction';
import updateCard from '@/actions/cards/update';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Skeleton } from '../../common/shadcn/skeleton';
import FormInput from '../../common/form/FormInput';

interface HeaderProps {
  card: CardWithList;
}

const Header = ({
  card,
}: HeaderProps) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>(card.title);
  const {
    execute,
  } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      });
      toast.success(`Renamed to ${data.title}!`);
      setTitle(data.title);
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const params = useParams();
  const inputRef = useRef<ElementRef<'input'>>(null);
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string;
    const boardId = params.boardId as string;
    if (newTitle === card.title) {
      return;
    }
    execute({
      title: newTitle,
      boardId,
      id: card.id,
    });
  };
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout width={20} height={20} className="mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list
          {' '}
          <span className="underline">{card.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = () => (
  <div className="flex items-start gap-x-3 mb-6">
    <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
    <div>
      <Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
      <Skeleton className="h-4 w-12 bg-neutral-200" />
    </div>
  </div>
);

export default Header;
