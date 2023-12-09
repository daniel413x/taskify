'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CardWithList } from '@/lib/types';
import { fetcher } from '@/lib/utils';
import { CARDS_ROUTE } from '@/lib/data/routes';
import { Dialog, DialogContent } from '../../common/shadcn/dialog';
import useCardModal from './useCardModal';
import Header from './Header';

const CardModal: FC = () => {
  const {
    isOpen,
    onClose,
    id,
  } = useCardModal();
  const { data: card } = useQuery<CardWithList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/${CARDS_ROUTE}/${id}`),
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!card ? <Header.Skeleton /> : <Header card={card} />}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
