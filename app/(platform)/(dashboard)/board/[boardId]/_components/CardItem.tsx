'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import useCardModal from '@/components/ui/modals/CardModal/useCardModal';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';

interface CardItemProps {
  card: Card;
  index: number;
}

const CardItem = ({
  card,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable
      draggableId={card.id}
      index={index}
    >
      {(provided) => (
        <Button
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          variant="ghost"
          onClick={() => cardModal.onOpen(card.id)}
          className="truncate border-2 border-transparent hover:border-black hover:bg-white py-2 px-3 text-sm bg-white rounded-md shadow-sm text-neutral-700 justify-start"
        >
          {card.title}
        </Button>
      )}
    </Draggable>
  );
};

export default CardItem;
