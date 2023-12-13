'use client';

import { FC } from 'react';
import Image from 'next/image';
import useAction from '@/lib/hooks/useAction';
import redirect from '@/actions/stripe';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '../../common/shadcn/dialog';
import useProModal from './useProModal';
import { Button } from '../../common/shadcn/button';

const ProModal: FC = () => {
  const {
    isOpen,
    onClose,
  } = useProModal();
  const {
    execute,
    isLoading,
  } = useAction(redirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onClick = () => {
    execute({});
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent
        className="max-w-md p-0 overflow-hidden"
      >
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/hero.svg"
            alt="Hero"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>
                Unlimited boards
              </li>
              <li>
                Advanced checklists
              </li>
              <li>
                Admin and security features
              </li>
              <li>
                And more!
              </li>
            </ul>
          </div>
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={onClick}
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
