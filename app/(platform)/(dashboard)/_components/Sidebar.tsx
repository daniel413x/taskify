'use client';

import { Skeleton } from '@/components/ui/common/shadcn/skeleton';
import { Accordion } from '@/components/ui/common/shadcn/accordion';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Button } from '@/components/ui/common/shadcn/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import NavItem, { Organization } from './NavItem';

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({
  storageKey = 't-sidebar-state',
}: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});
  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
  const {
    userMemberships,
    isLoaded: isLoadedOrgList,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  // Accordion expects string array of id's
  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      const returned = [...acc];
      if (expanded[key]) {
        returned.push(key);
      }
      return returned;
    }, []);
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };
  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center font-medium text-xs mb-1">
        <span className="pl-4">
          Workspaces
        </span>
        <Button
          className="ml-auto"
          asChild
          type="button"
          size="icon"
          variant="ghost"
        >
          <Link href={`/${SELECT_ORGANIZATION_ROUTE}`}>
            <Plus width={16} height={16} />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            organization={organization as Organization}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
