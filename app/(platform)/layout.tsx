import ModalProvider from '@/components/providers/ModalProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import { Children } from '@/lib/types';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

interface PlatformLayoutProps {
  children: Children;
}

const PlatformLayout = ({
  children,
}: PlatformLayoutProps) => (
  <ClerkProvider>
    <QueryProvider>
      <Toaster />
      <ModalProvider />
      {children}
    </QueryProvider>
  </ClerkProvider>
);

export default PlatformLayout;
