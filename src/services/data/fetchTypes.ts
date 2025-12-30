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
        displayName: string;
        headline?: string;
        location?: string;
        summary?: string;
        social?: Array<{ label: string; url: string }>;
        certifications?: Array<{
            name: string;
            issuer?: string;
            date?: string;
            credentialUrl?: string;
        }>;
        skills?: {
            primary?: string[];
            secondary?: string[];
        };
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
    tabs: Array<{
        id: string;
        label: string;
        icon?: string;
        component: 'ProfileComponent' | 'ProjectsGrid' | 'PostsGrid' | 'ReelsTab';
        dataPath?: string; // This will help to walk the array to pass info to components
        props?: Record<string, unknown>;
    }>;
};