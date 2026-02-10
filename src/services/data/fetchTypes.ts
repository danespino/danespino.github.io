import type { ReactNode } from 'react'

export type AppModes = 'production' | 'testing' | 'maintenance' | 'under_construction';

export type FetchErrorCode = 'NETWORK_ERROR' | 'TIMEOUT' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'FORBIDDEN'
    | 'SERVER_ERROR' | 'BAD_REQUEST' | 'UNEXPECTED_ERROR' | 'CANCELLED' | 'DECODE_ERROR' | 'PARSING_ERROR'
    | 'MAINTENANCE_MODE' | 'UNDER_CONSTRUCTION' | 'UNKNOWN_ERROR';

export type FetchResult<T> = | {
    result: 'success';
    status: number;
    data: T;
    appMode?: AppModes;
}
    |
{
    result: 'error';
    status?: number;
    errorCode: FetchErrorCode;
    errorMessage: string
    appMode?: AppModes;
    rawError?: unknown;
};

export type TabComponentsType = 'ProfileComponent' | 'ProjectsGrid' | 'PostsGrid' | 'ReelsTab';

export type TabConfig = {
    id: string;
    label: string;
    icon?: ReactNode | string;
    component?: TabComponentsType | ReactNode | string;
    dataPath?: string;
    props?: Record<string, unknown>;
}

export type AppData = {
    meta: {
        schemaVersion: number;
        generatedAt: string;
        cacheTtlSeconds?: number;
    };
    appStatus: {
        mode: AppModes;
        message?: string;
    };
    profile: {
        displayName?: string;
        headline?: string;
        location?: string;
        summary?: string;
        social?: Array<{ key: string; value: string, url: string }>;
        general?: Array<{ key: string; value: string }>;
        certifications?: any[];
        skills?: any[];
    };
    posts: {
        preloadedLimit: number;
        items: Array<{
            id: string;
            createdAt: string;
            type: string;
            title?: string;
            caption?: string;
            tags?: string[];
            media?: Array<{ kind: 'image' | 'video'; src: string; alt?: string }>;
            links?: Array<{ label: string; url: string }>;
        }>;
    };
    tabs: TabConfig[];
};