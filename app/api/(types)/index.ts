import { NextRequest, NextResponse } from 'next/server';

type ApiRouteHandlerReturn = Promise<{ body?: any, init?: ResponseInit }>;

export interface ApiHandlerProps<T> {
  (
    req: NextRequest,
    res: NextResponse & { params: any }
  ): T;
}

export type ApiRouteHandler = ApiHandlerProps<ApiRouteHandlerReturn>;
