import { Children } from '@/lib/types';
import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import siteConfig from '@/lib/config';
import Sidebar from '../_components/Sidebar';

export const generateMetadata = async () => {
  const { orgSlug } = auth();
  return {
    title: {
      default: `${startCase(orgSlug || 'organization')}`,
      template: `%s / ${startCase(orgSlug || 'organization')} / ${siteConfig.title}`,
    },
  };
};

interface OrganizationLayoutProps {
  children: Children;
}

const OrganizationLayout = ({
  children,
}: OrganizationLayoutProps) => (
  <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
    <div className="flex gap-x-7">
      <div className="w-64 shrink-0 hidden md:block">
        <Sidebar />
      </div>
      {children}
    </div>
  </main>
);

export default OrganizationLayout;
