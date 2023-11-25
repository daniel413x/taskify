'use client';

import {
  AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/common/shadcn/accordion';
import { Button } from '@/components/ui/common/shadcn/button';
import {
  Activity, CreditCard, Layout, Settings,
} from 'lucide-react';
import {
  ACTIVITY_ROUTE, BILLING_ROUTE, ORGANIZATION_ROUTE, SETTINGS_ROUTE,
} from '@/lib/data/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/common/shadcn/skeleton';

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className="mr-2" width={16} height={16} />,
      href: `/${ORGANIZATION_ROUTE}/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="mr-2" width={16} height={16} />,
      href: `/${ORGANIZATION_ROUTE}/${organization.id}/${ACTIVITY_ROUTE}`,
    },
    {
      label: 'Settings',
      icon: <Settings className="mr-2" width={16} height={16} />,
      href: `/${ORGANIZATION_ROUTE}/${organization.id}/${SETTINGS_ROUTE}`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className="mr-2" width={16} height={16} />,
      href: `/${ORGANIZATION_ROUTE}/${organization.id}/${BILLING_ROUTE}`,
    },
  ];
  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem
      value={organization.id}
      className="border-none"
    >
      <AccordionTrigger
        className={cn('flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline', {
          'bg-sky-500/10 text-sky-700': isActive && !isExpanded,
        })}
        onClick={() => onExpand(organization.id)}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              src={organization.imageUrl}
              fill
              alt="Organization"
              className="rounded-sm object-cover"

            />
          </div>
          <span className="font-medium text-sm">
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((r) => (
          <Button
            size="sm"
            onClick={() => onClick(r.href)}
            className={cn('w-full font-normal justify-start pl-10 mb-1', {
              'bg-sky-500/10 text-sky-700': pathname === r.href,
            })}
            key={r.href}
            variant="ghost"
          >
            {r.icon}
            {r.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

const SkeletonNavItem = () => (
  <div className="flex items-center gap-x-2">
    <div className="w-10 h-10 relative shrink-0">
      <Skeleton className="h-full w-full absolute" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
);

NavItem.Skeleton = SkeletonNavItem;

export default NavItem;
