/**
 * wrap all API requests in a base function to help facilitate
 * error reporting and cut down on repeat code. allows for
 * throwing exceptions like:
 * throw new ApiException('Banner key is required', 400);
 */

import { NextResponse } from 'next/server';
import { ApiRouteHandler } from '../(types)';

export default (handler: ApiRouteHandler): ApiRouteHandler => async (
  req,
  res,
) => {
  try {
    return await handler(req, res);
  } catch (error: any) {
    if (error?.isApiException) {
      return new NextResponse(error.message, { status: error.statusCode });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
