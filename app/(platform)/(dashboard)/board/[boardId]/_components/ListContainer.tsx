import { ListWithCards } from '@/lib/types';
import ListForm from './ListForm';

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

const ListContainer = ({
  lists,
  boardId,
}: ListContainerProps) => (
  <ol>
    <ListForm key="create" boardId={boardId} />
    {lists.map((l) => (
      <li key={l.id}>
        {l.title}
      </li>
    ))}
    <div className="flex-shrink-0 w-1" />
  </ol>
);

export default ListContainer;
