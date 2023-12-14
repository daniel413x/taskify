import { Separator } from '@/components/ui/common/shadcn/separator';
import { Suspense } from 'react';
import Info from './Info';
import BoardList from './BoardList';

interface OrganizationIdPageContentProps {
  isPro: boolean;
}

const OrganizationIdPageContent = ({
  isPro,
}: OrganizationIdPageContentProps) => (
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

export default OrganizationIdPageContent;
