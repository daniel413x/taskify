import { checkSubscription } from '@/lib/utils';
import { Metadata } from 'next';
import BillingPageContent from './_components/BillingPageContent';

export const metadata: Metadata = {
  title: 'Billing',
};

const OrganizationBillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <BillingPageContent isPro={isPro} />
  );
};

export default OrganizationBillingPage;
