'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import useAction from '@/lib/hooks/useAction';
import redirect from '@/actions/stripe';
import { toast } from 'sonner';
import useProModal from '@/components/ui/modals/ProModal/useProModal';

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({
  isPro,
}: SubscriptionButtonProps) => {
  const proModal = useProModal();
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
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button variant="primary" onClick={onClick} disabled={isLoading}>
      {isPro ? 'Manage subscription' : 'Upgrade to pro'}
    </Button>
  );
};

export default SubscriptionButton;
