'use server';

import prismadb from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth, currentUser } from '@clerk/nextjs';
import { ORGANIZATION_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { absoluteUrl } from '@/lib/utils';
import stripe from '@/lib/stripe';
import RedirectSchema from './schema';
import { RedirectReturnType } from './types';

const handler = async (): Promise<RedirectReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    };
  }
  const settingsUrl = absoluteUrl(`/${ORGANIZATION_ROUTE}/${orgId}`);
  let url = '';
  try {
    const orgSubscription = await prismadb.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user?.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'Taskify Pro',
                description: 'Unlimited boards for your organization',
              },
              unit_amount: 2000,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });
      url = stripeSession.url || '';
    }
  } catch (e) {
    return {
      error: 'Something went wrong',
    };
  }
  revalidatePath(`/${ORGANIZATION_ROUTE}/${orgId}`);
  return { data: url };
};

const redirect = createValidatedAction(RedirectSchema, handler);

export default redirect;
