import { ListWithCards } from '@/lib/types';
import ListContainer from './ListContainer';

interface BoardPageContentProps {
  lists: ListWithCards[];
  params: { boardId: string; };
}

const BoardPageContent = async ({
  lists,
  params,
}: BoardPageContentProps) => (
  <div className="p-4 h-full overflow-x-auto">
    <ListContainer boardId={params.boardId} lists={lists} />
  </div>
);

export default BoardPageContent;
