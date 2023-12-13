import { Separator } from '@/components/ui/common/shadcn/separator';
import { Suspense } from 'react';
import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import { checkSubscription } from '@/lib/utils';
import Info from './_components/Info';
import BoardList from './_components/BoardList';

export const generateMetadata = async () => {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || 'organization'),
  };
};

const OrganizationIdPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
