import { Children } from '@/lib/types';
import OrgControl from './_components/OrgControl';

interface OrganizationIdLayoutProps {
  children: Children;
}

const OrganizationIdLayout = ({
  children,
}: OrganizationIdLayoutProps) => (
  <>
    <OrgControl />
    {children}
  </>
);

export default OrganizationIdLayout;
