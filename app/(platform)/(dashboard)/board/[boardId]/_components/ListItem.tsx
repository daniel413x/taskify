import { ListWithCards } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import ListWrapper from './ListWrapper';
import ListHeader from './ListHeader';
import useInlineEditing from './useInlineEditing';
import CardForm from './CardForm';
import CardItem from './CardItem';

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

const ListItem = ({
  list,
  index,
}: ListItemProps) => {
  const {
    textareaRef,
    isEditing,
    enableEditing,
    disableEditing,
  } = useInlineEditing();
  return (
    <Draggable draggableId={list.id} index={index}>
      {((providedDraggable) => (
        <ListWrapper
          provided={providedDraggable}
          ref={providedDraggable.innerRef}
        >
          <ListHeader list={list} onAddCard={enableEditing} />
          <Droppable
            droppableId={list.id}
            type="card"
          >
            {(providedDroppable) => (
              <ol
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                className={cn('mx-1 px-1 py-0.5 flex flex-col gap-y-2', list.cards.length > 0 ? 'mt-2' : 'mt-0')}
              >
                {list.cards.map((c, i) => (
                  <CardItem
                    key={c.id}
                    card={c}
                    index={i}
                  />
                ))}
                {providedDroppable.placeholder}
              </ol>
            )}
          </Droppable>
          <CardForm
            listId={list.id}
            ref={textareaRef}
            isEditing={isEditing}
            enableEditing={enableEditing}
            disableEditing={disableEditing}
          />
        </ListWrapper>
      ))}
    </Draggable>
  );
};

export default ListItem;
