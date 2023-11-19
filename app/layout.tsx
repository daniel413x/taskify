import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Children } from '@/lib/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taskify Task Management',
};

interface RootLayoutProps {
  children: Children;
}

const RootLayout = ({
  children,
}: RootLayoutProps) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
