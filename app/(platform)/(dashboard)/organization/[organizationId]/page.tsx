import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import { checkSubscription } from '@/lib/utils';
import OrganizationIdPageContent from './_components/OrganizationIdPageContent';

export const generateMetadata = async () => {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || 'organization'),
  };
};

const OrganizationIdPage = async () => {
  const isPro = await checkSubscription();
  return (
    <OrganizationIdPageContent isPro={isPro} />
  );
};

export default OrganizationIdPage;
