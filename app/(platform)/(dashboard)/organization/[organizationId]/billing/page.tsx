import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import { checkSubscription } from '@/lib/utils';
import BillingPageContent from './_components/BillingPageContent';

export const generateMetadata = async () => {
  const { orgSlug } = auth();
  return {
    title: `Settings / ${startCase(orgSlug || 'organization')}`,
  };
};

const OrganizationBillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <BillingPageContent isPro={isPro} />
  );
};

export default OrganizationBillingPage;
