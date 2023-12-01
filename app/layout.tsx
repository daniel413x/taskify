import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Children } from '@/lib/types';
import siteConfig from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s / ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
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
