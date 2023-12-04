'use client';

import { ListWithCards } from '@/lib/types';
import { useEffect, useState } from 'react';
import ListForm from './ListForm';
import ListItem from './ListItem';

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
  return (
    <ol className="flex gap-x-3 h-full">
      {orderedLists.map((l) => (
        <li key={l.id}>
          <ListItem
            list={l}
          />
        </li>
      ))}
      <ListForm key="create" boardId={boardId} />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
