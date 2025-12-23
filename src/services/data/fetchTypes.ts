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