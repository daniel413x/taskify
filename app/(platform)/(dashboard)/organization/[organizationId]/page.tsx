import { Separator } from '@/components/ui/common/shadcn/separator';
import Info from './_components/Info';
import BoardList from './_components/BoardList';

const OrganizationIdPage = async () => (
  <div className="w-full mb-20">
    <Info />
    <Separator className="my-4" />
    <div className="px-2 md:px-4">
      <BoardList />
    </div>
  </div>
);

export default OrganizationIdPage;
