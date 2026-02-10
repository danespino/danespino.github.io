export function navDataPath<T = unknown>(obj: unknown, path?: string): T | undefined {
    if (!path) return obj as T;
    if (typeof obj !== 'object' || !obj) return undefined;

    const parts = path.split('.').filter(Boolean);
    let current: any = obj;

    for (const part of parts) {
        if (current === null) return undefined;
        current = current[part];
    }

    return current as T;
}