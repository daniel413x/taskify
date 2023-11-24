import { Plus } from 'lucide-react';
import Logo from '@/components/ui/common/Logo';
import { Button } from '@/components/ui/common/shadcn/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { ORGANIZATION_ROUTE, SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';

const Navbar = () => (
  <div className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
    <div className="flex items-center md:gap-x-4">
      <Logo />
      <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
        Create
      </Button>
      <Button variant="primary" size="sm" className="rounded-sm md:hidden block">
        <Plus width={16} height={16} />
      </Button>
    </div>
    <div className="ml-auto flex items-center gap-x-2">
      <OrganizationSwitcher
        hidePersonal
        afterCreateOrganizationUrl={`/${ORGANIZATION_ROUTE}:id`}
        afterLeaveOrganizationUrl={`/${SELECT_ORGANIZATION_ROUTE}`}
        afterSelectOrganizationUrl={`/${ORGANIZATION_ROUTE}:id`}
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
        }}
      />
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: {
              height: 30, width: 30,
            },
          },
        }}
      />
    </div>
  </div>
);

export default Navbar;
