import { ListWithCards } from '@/lib/types';
import { cn } from '@/lib/utils';
import ListWrapper from './ListWrapper';
import ListHeader from './ListHeader';
import useInlineEditing from './useInlineEditing';
import CardForm from './CardForm';
import CardItem from './CardItem';

interface ListItemProps {
  list: ListWithCards;
}

const ListItem = ({
  list,
}: ListItemProps) => {
  const {
    textareaRef,
    isEditing,
    enableEditing,
    disableEditing,
  } = useInlineEditing();
  return (
    <ListWrapper>
      <ListHeader list={list} onAddCard={enableEditing} />
      <ol
        className={cn('mx-1 px-1 py-0.5 flex flex-col gap-y-2', list.cards.length > 0 ? 'mt-2' : 'mt-0')}
      >
        {list.cards.map((c) => (
          <CardItem
            key={c.id}
            card={c}
          />
        ))}
      </ol>
      <CardForm
        listId={list.id}
        ref={textareaRef}
        isEditing={isEditing}
        enableEditing={enableEditing}
        disableEditing={disableEditing}
      />
    </ListWrapper>
  );
};

export default ListItem;
