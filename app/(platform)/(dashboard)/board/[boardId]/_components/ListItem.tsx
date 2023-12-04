import { ListWithCards } from '@/lib/types';
import ListWrapper from './ListWrapper';
import ListHeader from './ListHeader';

interface ListItemProps {
  list: ListWithCards;
}

const ListItem = ({
  list,
}: ListItemProps) => (
  <ListWrapper>
    <div className="w-full rounded-md bg-[#f1f2f4] shadow-md">
      <ListHeader list={list} />
    </div>
  </ListWrapper>
);

export default ListItem;
