import { lazy } from "react";
import type { TabComponentsType } from "../../../../services/data/fetchTypes";

export const tabRegistry: Record<TabComponentsType, React.LazyExoticComponent<React.ComponentType<any>>> = {
    ProfileComponent: lazy(() => import('./ProfileInfo')),
    ProjectsGrid: lazy(() => import('./ProjectsGrid')),
    PostsGrid: lazy(() => import('./PostsGrid')),
    ReelsTab: lazy(() => import('./ReelsGrid')),
};
