import { UIMatch } from 'react-router-dom';

export type HandleRoute = {
  breadcrumb: BreadcrumbFunction | string;
};
export type BreadcrumbFunction = (args: UIMatch) => string;

export enum MainRouteEnum {
  MAIN = 'Main',
}

export type AllRoutes = MainRouteEnum;
