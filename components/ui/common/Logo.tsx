import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
});

const Logo: FC = () => (
  <Link href="/">
    <div className="hover:opacity-75 transition items-center gap-x-1 hidden md:flex">
      <Image
        src="/logo.svg"
        alt="Brand logo"
        height={30}
        width={30}
      />
      <p className={cn('text-lg text-neutral-700 pt-[0.125rem]', headingFont.className)}>
        Taskify
      </p>
    </div>
  </Link>
);

export default Logo;
