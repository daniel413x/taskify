'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CardWithList } from '@/lib/types';
import { fetcher } from '@/lib/utils';
import { CARDS_ROUTE } from '@/lib/data/routes';
import { Dialog, DialogContent } from '../../common/shadcn/dialog';
import useCardModal from './useCardModal';
import Header from './Header';
import Description from './Description';
import Actions from './Actions';

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
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!card ? <Description.Skeleton /> : <Description card={card} />}
            </div>
          </div>
          {!card ? (
            <Actions.Skeleton />
          ) : (
            <Actions
              card={card}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
