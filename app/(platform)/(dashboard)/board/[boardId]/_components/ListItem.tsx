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
    <ListHeader list={list} />
  </ListWrapper>
);

export default ListItem;
