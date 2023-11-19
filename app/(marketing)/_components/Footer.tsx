import { FC } from 'react';
import Logo from '@/components/ui/common/Logo';
import { Button } from '@/components/ui/common/shadcn/button';

const Footer: FC = () => (
  <footer className="flex items-center fixed bottom-0 w-full p-4 border-t bg-slate-100">
    <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
      <Logo />
      <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
        <Button size="sm" variant="ghost">
          Privacy Policy
        </Button>
        <Button size="sm" variant="ghost">
          Terms of Service
        </Button>
      </div>
    </div>
  </footer>
);

export default Footer;
