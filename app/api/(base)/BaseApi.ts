/**
 * wrap all API requests in a base function to help facilitate
 * error reporting and cut down on repeat code. allows for
 * throwing exceptions like:
 * throw new ApiException('Banner key is required', 400);
 */

import { NextResponse } from 'next/server';
import { ApiHandlerProps, ApiRouteHandler } from '../(types)';

type BaseApiHandler = ApiHandlerProps<Promise<NextResponse>>;

export default (handler: ApiRouteHandler): BaseApiHandler => async (
  req,
  res,
) => {
  try {
    const data = await handler(req, res);
    return NextResponse.json(data.body || {}, data.init || {});
  } catch (error: any) {
    if (error?.isApiException) {
      return new NextResponse(error.message, { status: error.statusCode });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
