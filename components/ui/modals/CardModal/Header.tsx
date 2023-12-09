'use client';

import { Layout } from 'lucide-react';
import { ElementRef, useRef, useState } from 'react';
import { CardWithList } from '@/lib/types';
import FormInput from '../../common/form/FormInput';
import { Skeleton } from '../../common/shadcn/skeleton';

interface HeaderProps {
  card: CardWithList;
}

const Header = ({
  card,
}: HeaderProps) => {
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [title] = useState<string>(card.title);
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    // TODO
    console.log(formData.get('title'));
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
    <Skeleton className="h-6 w-6 mt-1 bg-neutral-200">
      <div>
        <Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
        <Skeleton className="h-4 w-12 bg-neutral-200" />
      </div>
    </Skeleton>
  </div>
);

export default Header;
