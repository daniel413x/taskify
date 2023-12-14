import { Skeleton } from '@/components/ui/common/shadcn/skeleton';
import { SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { checkSubscription } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/common/shadcn/separator';
import { Suspense } from 'react';
import Info from '../../_components/Info';
import ActivityList from './ActivityList';

const ActivityPageContent = async () => {
  const isPro = await checkSubscription();
  const { orgId } = auth();
  if (!orgId) {
    redirect(`/${SELECT_ORGANIZATION_ROUTE}`);
  }
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

ActivityPageContent.Skeleton = () => (
  <ol className="space-y-4 mt-4">
    <Skeleton className="w-[80%] h-14" />
    <Skeleton className="w-[50%] h-14" />
    <Skeleton className="w-[70%] h-14" />
    <Skeleton className="w-[80%] h-14" />
    <Skeleton className="w-[75%] h-14" />
  </ol>
);

export default ActivityPageContent;
