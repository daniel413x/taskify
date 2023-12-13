import { Button } from '@/components/ui/common/shadcn/button';
import { auth } from '@clerk/nextjs';
import { HelpCircle, User2 } from 'lucide-react';
import FormPopover from '@/components/ui/common/form/FormPopover';
import { redirect } from 'next/navigation';
import { BOARD_ROUTE, SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import prismadb from '@/lib/db';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/common/shadcn/skeleton';
import { checkSubscription, getBoardsCreatedCount } from '@/lib/utils';
import { MAX_FREE_BOARDS } from '@/lib/data/consts';
import Hint from './Hint';

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect(`/${SELECT_ORGANIZATION_ROUTE}`);
  }
  const boards = await prismadb.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const boardsCreated = await getBoardsCreatedCount();
  const isPro = await checkSubscription();
  return (
    <div className="space-y-4">
      <div className=" flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="mr-2" width={24} height={24} />
        Your boards
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((b) => (
          <li key={b.id} className="flex">
            <Link
              href={`/${BOARD_ROUTE}/${b.id}`}
              style={{ backgroundImage: `url(${b.imageThumbUrl})` }}
              className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hiddem"
            >
              <div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"
              />
              <p className="relative font-semibold text-white">
                {b.title}
              </p>
            </Link>
          </li>
        ))}
        <li key="create">
          <FormPopover sideOffset={10} side="right">
            <Button
              variant="ghost"
              className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center    hover:bg-neutral-200 transition"
            >
              <span className="text-sm">
                Create new board
              </span>
              <span className="text-sm">
                {isPro ? 'Unlimited' : `${MAX_FREE_BOARDS - boardsCreated} remaining`}
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
        </li>
      </ul>
    </div>
  );
};

BoardList.Skeleton = () => (
  <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
    <Skeleton className="aspect-video h-full w-full p-2" />
  </div>
);

export default BoardList;
