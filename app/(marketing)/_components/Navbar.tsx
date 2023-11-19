import { FC } from 'react';
import Logo from '@/components/ui/common/Logo';
import { Button } from '@/components/ui/common/shadcn/button';
import Link from 'next/link';

const Navbar: FC = () => (
  <div className="flex items-center fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white">
    <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
      <Logo />
      <nav className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
        <Button className="" variant="outline" asChild>
          <Link href="/sign-in">
            Login
          </Link>
        </Button>
        <Button className="" size="sm" asChild>
          <Link href="/sign-up">
            Get Taskify for free
          </Link>
        </Button>
      </nav>
    </div>
  </div>
);

export default Navbar;
