import { NextApiRequest, NextApiResponse } from 'next';

type ApiRouteHandlerReturn = Promise<{ body?: any, init?: ResponseInit }>;

export interface ApiHandlerProps<T> {
  (
    req: NextApiRequest,
    res: NextApiResponse & { params: any }
  ): T;
}

export type ApiRouteHandler = ApiHandlerProps<ApiRouteHandlerReturn>;
