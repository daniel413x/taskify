import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ORGANIZATION_ROUTE, SELECT_ORGANIZATION_ROUTE } from './lib/data/routes';

export default authMiddleware({
  publicRoutes: [
    '/',
  ],
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = `/${SELECT_ORGANIZATION_ROUTE}`;
      if (auth.orgId) {
        path = `/${ORGANIZATION_ROUTE}/${auth.orgId}`;
      }
      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname === `/${SELECT_ORGANIZATION_ROUTE}`) {
      const orgSelection = new URL(`/${SELECT_ORGANIZATION_ROUTE}`, req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
