import { useCallback } from "react";

export const useTryCatch = () => {

    const apiFn = useCallback(async <R extends {}>(fn: () => Promise<R>, errMsg?: string) => {
        try {
            return await fn();
        }
        catch (error: any) {
            console.log(error);
            if (errMsg) alert(errMsg);
        };
    }, []);

    return { apiFn };
};