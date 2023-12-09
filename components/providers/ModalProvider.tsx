'use client';

import useHasMounted from '@/lib/hooks/useHasMounted';
import CardModal from '../ui/modals/CardModal';

const ModalProvider = () => {
  if (!useHasMounted()) return null;
  return (
    <CardModal />
  );
};

export default ModalProvider;
