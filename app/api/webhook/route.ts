import Stripe from 'stripe';
import { headers } from 'next/headers';
import prismadb from '@/lib/db';
import stripe from '@/lib/stripe';
import BaseApi from '@/app/api/(base)/BaseApi';
import { NextRequest } from 'next/server';
import ApiException from '../(exception)/ApiException';

export const POST = BaseApi(async (req: NextRequest) => {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (e) {
    throw new ApiException('Webhook error', 500);
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );
    if (!session?.metadata?.orgId) {
      throw new ApiException('Org Id is required', 500);
    }
    await prismadb.orgSubscription.create({
      data: {
        orgId: session.metadata.orgId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }
  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );
    await prismadb.orgSubscription?.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }
  return { body: null, init: { status: 200 } };
});
