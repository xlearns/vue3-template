import { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";
export interface toRouteType extends RouteLocationNormalized {
  meta: {
    keepAlive?: boolean;
    refreshRedirect: string;
    dynamicLevel?: string;
  };
}

export interface routesItems extends RouteRecordNormalized {
  meta: {
    isPublic?: boolean;
    title?: string;
    keepAlive?: boolean;
  };
}
