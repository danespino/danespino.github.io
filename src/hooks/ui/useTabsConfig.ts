import { useEffect, useState, useMemo } from "react";
import { fetchData } from "../../services/data/fetchData";
import { navDataPath } from "../../services/data/navDataPath";
import type { AppModes, AppData } from "../../services/data/fetchTypes";

export type HydrateTab = AppData['tabs'][number] & {
    data?: unknown;
}

export function useTabsConfig(url: string) {
    const [appData, setAppData] = useState<AppData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [appMode, setAppMode] = useState<AppModes | undefined>(undefined);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setIsLoading(true);

            const call = await fetchData<AppData>(url, { timeoutMs: 12_000 });

            if (cancelled) return;

            if (call.result == 'success') {
                setAppData(call.data);
                setErrorCode(null);
            } else {
                setAppData(null);
                setAppMode(call.appMode);
                setErrorCode(call.errorCode);
            }

            setIsLoading(false);
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [url]);

    const tabs: HydrateTab[] | null = useMemo(() => {
        if (!appData?.tabs) return null;

        return appData.tabs.map(tab => {
            const data = navDataPath(appData, tab.dataPath);

            // Apply limit if tab includes props.limit
            if (Array.isArray(data) && tab.props && typeof tab.props['limit'] === 'number') {
                const limit = tab.props['limit'] as number;
                return { ...tab, data: data.slice(0, limit) };
            }

            return { ...tab, data };
        });
    }, [appData]);

    const appStatus = appData?.appStatus;
    const profile = appData?.profile ?? null;
    const posts = appData?.posts ?? null;

    return { appData, tabs, appStatus, profile, posts, isLoading, errorCode, appMode };
}