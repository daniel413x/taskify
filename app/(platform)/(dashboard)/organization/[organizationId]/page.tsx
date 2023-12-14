import { checkSubscription } from '@/lib/utils';
import { Metadata } from 'next';
import OrganizationIdPageContent from './_components/OrganizationIdPageContent';

export const metadata: Metadata = {
  title: 'Boards',
};

const OrganizationIdPage = async () => {
  const isPro = await checkSubscription();
  return (
    <OrganizationIdPageContent isPro={isPro} />
  );
};

export default OrganizationIdPage;
