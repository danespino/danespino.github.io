import { useEffect, useState } from "react";
import { fetchData } from "../../services/data/fetchData";
import type { AppModes } from "../../services/data/fetchTypes";

type AppStatus = {
    mode: AppModes;
    message?: string;
    isLoading?: boolean;
};

export function useAppStatus(url: string = "/data/app-data.json") {
    const [appStatus, setAppStatus] = useState<AppStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            const call = await fetchData<AppStatus>(url);
            if (cancelled) return;

            if (call.result !== 'success') {
                setAppStatus({
                    mode: 'under_construction',
                    message: call.errorMessage
                });
                // Later will integrate with N8N
            } else {
                setAppStatus(call.data);
            }

            setIsLoading(false);
        }

        load();
        return () => {
            cancelled = true;
        }
    }, [url]);

    return { appStatus, isLoading };
}
