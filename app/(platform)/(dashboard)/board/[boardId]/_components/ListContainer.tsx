'use client';

import { ListWithCards } from '@/lib/types';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import ListForm from './ListForm';
import ListItem from './ListItem';

// move either Lists or Cards
const reorder = <T extends {}>(
  // can be Lists or Cards
  items: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = [...items];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

const ListContainer = ({
  lists,
  boardId,
}: ListContainerProps) => {
  const [orderedLists, setOrderedLists] = useState<ListWithCards[]>([]);
  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);
  const onDragEnd = (result: any) => {
    const {
      destination,
      source,
      type,
    } = result;
    if (!destination) {
      return;
    }
    // user dropped in the same spot
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // user moves a list
    if (type === 'list') {
      const reorderedLists = reorder(
        orderedLists,
        source.index,
        destination.index,
      ).map((item, index) => ({ ...item, order: index }));
      setOrderedLists(reorderedLists);
      // TODO: server action
    }
    // user moves a card: either cross-lists or within the same list
    if (type === 'card') {
      const reorderedLists = [...orderedLists];
      const sourceList = reorderedLists.find((list) => list.id === source.droppableId);
      const destList = reorderedLists.find((list) => list.id === destination.droppableId);
      if (!sourceList || !destList) {
        return;
      }
      if (!destList.cards) {
        destList.cards = [];
      }
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // user moves a card within the same list
      if (source.droppableId === destination.droppableId) {
        let reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );
        // set the new order field for each card
        reorderedCards = reorderedCards.map((c, i) => ({
          ...c,
          order: i,
        }));
        sourceList.cards = reorderedCards;
        setOrderedLists(reorderedLists);
        // TODO: server action
        // user moves a card to another list
      } else {
        // create new source list from which to remove the card
        let newSourceCards = [...sourceList.cards];
        // remove card from the source list
        const [movedCard] = newSourceCards.splice(source.index, 1);
        // set cards' new order in the source list
        newSourceCards = newSourceCards.map((c, i) => ({
          ...c,
          order: i,
        }));
        // set moved card's new listId
        movedCard.listId = destination.droppableId;
        // create new destination list to which to move the cards
        let newDestCards = [...destList.cards];
        // move card to new destination list
        newDestCards.splice(destination.index, 0, movedCard);
        // set cards' new order in the destination list
        newDestCards = newDestCards.map((c, i) => ({
          ...c,
          order: i,
        }));
        setOrderedLists(reorderedLists.map((l) => {
          if (l.id === sourceList.id) {
            return {
              ...l,
              cards: newSourceCards,
            };
          }
          if (l.id === destList.id) {
            return {
              ...l,
              cards: newDestCards,
            };
          }
          return l;
        }));
      }
    }
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable
        droppableId="lists"
        type="list"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedLists.map((l, i) => (
              <ListItem
                index={i}
                key={l.id}
                list={l}
              />
            ))}
            {provided.placeholder}
            <ListForm key="create" boardId={boardId} />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
