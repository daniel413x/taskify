import { Separator } from '@/components/ui/common/shadcn/separator';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { checkSubscription } from '@/lib/utils';
import ActivityList from './_components/ActivityList';
import Info from '../_components/Info';

export const metadata: Metadata = {
  title: 'Activity',
};

const ActivityPage = async () => {
  const isPro = await checkSubscription();
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

export default ActivityPage;
