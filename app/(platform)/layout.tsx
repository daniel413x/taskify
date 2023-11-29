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
    <Toaster />
    {children}
  </ClerkProvider>
);

export default PlatformLayout;
