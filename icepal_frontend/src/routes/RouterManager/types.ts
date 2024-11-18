import { AdminRoutesEnum } from '@/utils';
import { router } from '..';
import { RouteParamsArgs } from './RouteParams';

export type TRouter = typeof router;

type _PathParam<Path extends string> = Path extends `${infer L}/${infer R}`
  ? _PathParam<L> | _PathParam<R>
  : Path extends `:${infer Param}`
  ? Param extends `${infer Optional}?`
    ? Optional
    : Param
  : never;

export type PathParam<Path extends string> = Path extends '*' | '/*'
  ? '*'
  : Path extends `${infer Rest}/*`
  ? '*' | _PathParam<Rest>
  : _PathParam<Path>;

export type RouteKey = AdminRoutesEnum;

export type RouteParams =
  | { name?: RouteKey; params?: PathParam<RouteKey> }
  | RouteParamsArgs;

export type RouteArgs = {
  path?: string;
  extra?: string;
  searchParams?: object;
  state?: object;
  replace?: boolean;
} & RouteParams;

export type TRoutePath = Record<RouteKey, string>;
