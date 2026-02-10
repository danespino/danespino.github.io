import { useEffect, useMemo, useRef, useState } from 'react';

export type DynamicTitleAPI = {
    setTempTitle: (title: string) => void;
    resetTitle: () => void;
    currentTitle: string;
}

type RotatorMode = "append" | "replace" | "interleave";

export type DynamicTitleOptions = {
    baseTitle: string;
    rotate?: string[];
    rotateIntervalMs?: number;
    rotateMode?: RotatorMode;
    getContextTitle?: () => string | null;
    visibleFlashMs?: number;
    enableEmoji?: boolean;
    contextTrigger?: any; // Add trigger for context re-evaluation
}

export function useDynamicTitle(options: DynamicTitleOptions): DynamicTitleAPI {
    const
        {
            baseTitle,
            rotate = [],
            rotateIntervalMs = 3000,
            rotateMode = "replace",
            getContextTitle,
            contextTrigger,
        } = options;

    const [tempOverride, setTempOverride] = useState<string | null>(null);
    const [flashVisibleKick, setFlashVisibleKick] = useState<number>(0);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [rotIndex, setRotIndex] = useState<number>(0);

    const originalTitleRef = useRef<string | null>(null);
    const flashTimerRef = useRef<number | null>(null);
    const rotatorRef = useRef<number | null>(null);

    const rotatingTitle = useMemo(() => {
        if (!rotate.length) return null;
        const rot = rotate[rotIndex % rotate.length];
        switch (rotateMode) {
            case "append": return `${baseTitle} | ${rot}`;
            case "replace":
                return rot;
            case "interleave":
            default:
                return `${baseTitle} | ${rot}`;
        }
    }, [rotate, rotIndex, rotateMode, baseTitle]);

    const contextTitle = useMemo(() => {
        try {
            const t = getContextTitle?.();
            return (t && t.trim()) || null;
        } catch {
            return null;
        }
    }, [getContextTitle, contextTrigger]);

    const nextTitle = useMemo(() => {
        if (tempOverride) return tempOverride;

        if (contextTitle) return contextTitle;

        if (rotatingTitle) return rotatingTitle;

        return baseTitle;
    }, [
        tempOverride,
        baseTitle,
        contextTitle,
        rotatingTitle
    ])

    useEffect(() => {
        if (typeof document === 'undefined') return;

        if (originalTitleRef.current === null) {
            originalTitleRef.current = document.title || baseTitle;
        }
        document.title = nextTitle;
    }, [nextTitle, baseTitle]);

    useEffect(() => {
        if (typeof document === 'undefined') return;

        const onVis = () => {
            const hidden = document.hidden;
            setIsHidden(hidden);
            if (!hidden) {
                setFlashVisibleKick((n) => n + 1);
            }
            flashVisibleKick;
            isHidden;
        };
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, []);

    useEffect(() => {
        if (!rotate.length) return;

        if (rotatorRef.current) clearInterval(rotatorRef.current);
        rotatorRef.current = window.setInterval(() => {
            setRotIndex(n => n + 1);
        }, rotateIntervalMs);
        return () => {
            if (rotatorRef.current) {
                clearInterval(rotatorRef.current);
                rotatorRef.current = null;
            }
        }
    }, [rotate.length, rotateIntervalMs]);

    useEffect(() => {
        return () => {
            if (typeof document !== 'undefined' && originalTitleRef.current) {
                document.title = originalTitleRef.current;
            }
            if (rotatorRef.current) {
                window.clearInterval(rotatorRef.current);
                rotatorRef.current = null;
            }
            if (flashTimerRef.current) {
                window.clearTimeout(flashTimerRef.current);
                flashTimerRef.current = null;
            }
        }
    });

    return {
        setTempTitle: (title) => setTempOverride(title),
        resetTitle: () => setTempOverride(null),
        currentTitle: nextTitle
    }
}