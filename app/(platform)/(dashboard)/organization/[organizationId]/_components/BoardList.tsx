'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import { Skeleton } from '@/components/ui/common/shadcn/skeleton';
import { useOrganization } from '@clerk/nextjs';
import { CreditCard, HelpCircle, User2 } from 'lucide-react';
import Image from 'next/image';
import FormPopover from '@/components/ui/common/form/FormPopover';
import Hint from './Hint';

const BoardList = () => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return (
      <BoardList.Skeleton />
    );
  }
  return (
    <div className="space-y-4">
      <div className=" flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="mr-2" width={24} height={24} />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} side="right">
          <Button
            variant="ghost"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <span className="text-sm">
              Create new board
            </span>
            <span className="text-sm">
              5 remaining
            </span>
            <Hint
              side="bottom"
              sideOffset={40}
              desc={`
              Free Workspaces can have up to 5 open boards. For unlimited boards, upgrade this workspace.
            `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </Button>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = () => (
  <div className="flex items-center gap-x-4">
    <div className="w-[60px] h-[60px] relative">
      <Skeleton className="w-full h-full absolute" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-10 w-[200px]" />
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  </div>
);

export default BoardList;
