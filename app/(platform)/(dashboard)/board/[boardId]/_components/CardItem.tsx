'use client';

import { Card } from '@prisma/client';

interface CardItemProps {
  card: Card;
}

const CardItem = ({
  card,
}: CardItemProps) => (
  <div
    role="button"
    className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
  >
    {card.title}
  </div>
);

export default CardItem;
