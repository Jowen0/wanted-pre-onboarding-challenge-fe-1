import { useCallback } from "react";
import { AUTH_API } from "api/auth";

export const useTryCatch = () => {

    const checkFn = AUTH_API.useCheckToken();

    const apiFn = useCallback(async <R extends {}>(fn: () => Promise<R>, errMsg?: string) => {
        try {
            if(checkFn()) {
                return await fn();
            };
        }
        catch (error) {
            if (errMsg) alert(errMsg);
            console.log(error);
        }
    }, [checkFn]);

    return { apiFn };
};