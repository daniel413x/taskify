'use client';

import useMobileSidebar from '@/lib/hooks/useMobileSidebar';
import { usePathname } from 'next/navigation';
import useHasMounted from '@/lib/hooks/useHasMounted';
import { useEffect } from 'react';
import { Button } from '@/components/ui/common/shadcn/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/common/shadcn/sheet';
import Sidebar from './Sidebar';

const MobileSidebar = () => {
  const pathname = usePathname();
  const {
    onOpen,
    onClose,
    isOpen,
  } = useMobileSidebar();
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);
  if (!useHasMounted()) return null;
  return (
    <>
      <Button
        variant="ghost"
        className="block md:hidden mr-2"
        onClick={onOpen}
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <Sidebar
            storageKey="t-sidebar-mobile-state"
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
