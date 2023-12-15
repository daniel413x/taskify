import { NextRequest, NextResponse } from 'next/server';

export type ApiRouteHandlerReturn = Promise<NextResponse>;

export interface ApiHandlerProps<T> {
  (
    req: NextRequest | Request,
    res: (NextResponse | Response) & { params: any }
  ): T;
}

export type ApiRouteHandler = ApiHandlerProps<ApiRouteHandlerReturn>;
