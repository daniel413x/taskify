import { Separator } from '@/components/ui/common/shadcn/separator';
import Info from '../../_components/Info';
import SubscriptionButton from './SubscriptionButton';

interface BillingPageContentProps {
  isPro: boolean;
}

const BillingPageContent = async ({
  isPro,
}: BillingPageContentProps) => (
  <div className="w-full">
    <Info isPro={isPro} />
    <Separator className="my-2" />
    <SubscriptionButton isPro={isPro} />
  </div>
);

export default BillingPageContent;
