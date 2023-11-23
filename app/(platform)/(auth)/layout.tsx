import { FC } from 'react';
import { Metadata } from 'next';
import { Children } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Authentication',
};

interface AuthLayoutProps {
  children: Children;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
}: AuthLayoutProps) => (
  <div className="flex items-center justify-center h-full">
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  </div>
);

export default AuthLayout;
