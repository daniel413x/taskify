import { Children } from '@/lib/types';
import { ClerkProvider } from '@clerk/nextjs';

interface PlatformLayoutProps {
  children: Children;
}

const PlatformLayout = ({
  children,
}: PlatformLayoutProps) => (
  <ClerkProvider>
    {children}
  </ClerkProvider>
);

export default PlatformLayout;
