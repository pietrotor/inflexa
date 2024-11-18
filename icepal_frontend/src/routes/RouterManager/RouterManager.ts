import _isEmpty from "lodash/isEmpty";
import { generatePath } from "react-router";
import { RouteObject, createSearchParams } from "react-router-dom";

import { RouteArgs, RouteKey, TRoutePath, TRouter } from "./types";

export class RouterManager {
  private routes: TRoutePath;

  constructor(private router: TRouter) {
    this.routes = this._getRoutes(router.routes, "");
  }

  private _getRoutes(routes: RouteObject[] = [], concactPath: string) {
    return routes.reduce((allRoutes, currentRoute) => {
      const hasSlash =
        /\/$/.test(concactPath) || /^\//.test(currentRoute.path!);
      const isValidRoute = !/[0-9]/.test(currentRoute.id!);
      const currentPath = `${concactPath}${hasSlash ? "" : "/"}${
        currentRoute.path ?? ""
      }`;

      Object.assign(allRoutes, {
        ...(isValidRoute && { [currentRoute.id!]: currentPath }),
        ...this._getRoutes(currentRoute.children, currentPath),
      });

      return allRoutes;
    }, {} as TRoutePath);
  }

  private getPath({ name, params, extra = "", path, searchParams }: RouteArgs) {
    if (path) return path;
    if (!name) throw new Error("name or path is required");

    const pattern = this.routes[name] + extra;
    const reversedPath = generatePath(pattern, params);

    if (!_isEmpty(searchParams)) {
      return reversedPath + this.serializeQuery(searchParams);
    }

    return reversedPath;
  }

  private serializeQuery(searchParams?: object): string {
    if (!searchParams) return "";

    const entries = Object.entries(searchParams);

    if (!entries.length) return "";

    return "?" + createSearchParams(entries).toString();
  }

  public to(args: RouteArgs | RouteKey) {
    if (typeof args === "string") {
      return this.router.navigate(this.routes[args]);
    }

    const { state, replace, ...params } = args;
    const pathname = this.getPath(params);
    return this.router.navigate(pathname, { state, replace });
  }

  public openNewTab(args: RouteArgs) {
    const pathname = this.getPath(args);
    return this.router.window?.open(pathname, "_blank");
  }

  public getUrl(args: RouteArgs | RouteKey) {
    if (typeof args === "string") {
      return this.routes[args];
    }
    const path = this.getPath(args);
    return generatePath(path);
  }

  public goBack() {
    return this.router.navigate(-1);
  }
}
