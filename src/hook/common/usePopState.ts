import { useEffect } from "react";

type UsePopState = (popStateFn: () => void) => void
export const usePopState: UsePopState = (popStateFn) => {

    useEffect(() => {

        popStateFn();

        window.addEventListener("popstate", popStateFn);

        return () => {
            window.removeEventListener("popstate", popStateFn)
        };

    }, [popStateFn]);
};