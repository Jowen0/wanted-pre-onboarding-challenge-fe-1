import { useCallback, useState } from "react";

export const useToken = (defaultHasToken?: boolean) => {

    const [hasToken, setHasToken] = useState(defaultHasToken || false);

    const handleHasToken = useCallback((hasToken: boolean) => {
        setHasToken(hasToken);
    }, [setHasToken]);

    const getTokenFromLocalStorage = useCallback(() => {
        return localStorage.getItem(TOKEN_KEY);
    }, []);

    const setTokenInLocalStorage = useCallback((token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    }, []);

    const removeTokenInLocalSotrage = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
    }, []);

    return {
        hasToken,
        handleHasToken,
        getTokenFromLocalStorage,
        setTokenInLocalStorage,
        removeTokenInLocalSotrage,
    };
};

export const TOKEN_KEY = 'token' as const;