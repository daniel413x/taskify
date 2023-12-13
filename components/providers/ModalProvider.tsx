'use client';

import useHasMounted from '@/lib/hooks/useHasMounted';
import CardModal from '../ui/modals/CardModal';
import ProModal from '../ui/modals/ProModal';

const ModalProvider = () => {
  if (!useHasMounted()) return null;
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;
