import { FC } from 'react';
import { Button } from '@/components/ui/common/shadcn/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Medal } from 'lucide-react';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
});

const textFont = Poppins({
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '700',
    '900',
  ],
});

const MarketingPageContent: FC = () => (
  <div className="flex flex-col items-center justify-center">
    <div className={cn('flex flex-col items-center justify-center', headingFont.className)}>
      <div className="flex items-center border shadow-sm p-4 mb-4 bg-amber-100 text-amber-700 rounded-full uppercase">
        <Medal className="mr-2" width={28} height={28} />
        No. 1 task management
      </div>
      <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
        Taskify helps teams move
      </h1>
      <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 pt-2 pb-1 rounded-md w-fit">
        work forward.
      </div>
    </div>
    <div className={cn('text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto', textFont.className)}>
      Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique — accomplish it all with Taskify.
    </div>
    <Button
      size="lg"
      className="mt-6"
      asChild
    >
      <Link href="/">
        Get Taskify for free
      </Link>
    </Button>
  </div>
);

export default MarketingPageContent;
