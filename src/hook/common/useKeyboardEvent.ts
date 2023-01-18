import { useEffect } from "react";

type UseKeyboardEventProps = (
    key: string,
    handleEvent: () => void,
) => void;
const useKeyboardEvent:UseKeyboardEventProps = (key, handleEvent) => {

    useEffect(() => {

        const callbackFn = (e: KeyboardEvent) => {
            if (e.key === key) {
                handleEvent();
            };
        };

        document.addEventListener("keydown", callbackFn);

        return () => document.removeEventListener("keydown", callbackFn);

    }, [key, handleEvent]);

};

export default useKeyboardEvent;