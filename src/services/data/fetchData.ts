import type { FetchResult, FetchErrorCode, AppModes } from './fetchTypes';

const DEFAULT_TIMEOUT_MS = 10_000;

function mapStatusToErrorCode(status: number): FetchErrorCode {
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 404) return 'NOT_FOUND';
  if (status === 503) return 'MAINTENANCE_MODE';
  if (status >= 500) return 'SERVER_ERROR';
  return 'UNKNOWN_ERROR';
}

function extractAppModesFromResponse(
  body: any
): AppModes | undefined {
  if (body && typeof body === 'object' && 'mode' in body) {
    const m = (body as any).mode;
    if (m === 'preview' || m === 'maintenance' || m === 'under_construction' || m === 'normal') {
      return m;
    }
  }

  return undefined;
}

export async function fetchData<T>(
  url: string,
  options?: RequestInit & { timeoutMs?: number }
): Promise<FetchResult<T>> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options || {};

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(fetchOptions.headers || {}),
      },
    });

    clearTimeout(id);

    let parsedBody: any = null;

    try {
      // If no content, skip JSON parse
      if (response.status !== 204) {
        parsedBody = await response.json();
      }
    } catch (parseError) {
      // Parsing failed; maybe HTML error page, etc.
      const AppModeResponse = extractAppModesFromResponse(null);
      return {
        result: "error",
        status: response.status,
        errorCode: 'PARSING_ERROR',
        errorMessage: 'Failed to parse server response',
        appMode: AppModeResponse,
        rawError: parseError,
      };
    }

    const AppModeResponse = extractAppModesFromResponse(parsedBody);

    if (!response.ok) {
      const errorCode = mapStatusToErrorCode(response.status);

      // This is where will later plug in n8n / telemetry:
      // reportFetchError({ url, status: response.status, errorCode, appModes });

      return {
        result: "error",
        status: response.status,
        errorCode,
        errorMessage:
          (parsedBody && parsedBody.message) ||
          `Request failed with status ${response.status}`,
        appMode: AppModeResponse,
      };
    }

    return {
      result: "success",
      status: response.status,
      data: parsedBody as T,
      appMode: AppModeResponse,
    };
  } catch (error: any) {
    clearTimeout(id);

    const errorCode: FetchErrorCode =
      error?.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR';

    // Later: reportFetchError({ url, errorCode, raw: error });

    return {
      result: "error",
      errorCode,
      errorMessage:
        errorCode === 'TIMEOUT'
          ? 'Request timed out'
          : 'Network error, please check your connection',
      rawError: error,
    };
  }
}
