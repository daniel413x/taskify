import { Separator } from '@/components/ui/common/shadcn/separator';
import { Suspense } from 'react';
import { Metadata } from 'next';
import ActivityList from './_components/ActivityList';
import Info from '../_components/Info';

export const metadata: Metadata = {
  title: 'Activity',
};

const ActivityPage = () => (
  <div className="w-full">
    <Info />
    <Separator className="my-2" />
    <Suspense fallback={<ActivityList.Skeleton />}>
      <ActivityList />
    </Suspense>
  </div>
);

export default ActivityPage;
