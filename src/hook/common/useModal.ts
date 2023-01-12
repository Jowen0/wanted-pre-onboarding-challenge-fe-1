import { useCallback, useState } from "react";

export const useModal = () => {

    const [isPop, setIsPop] = useState(false);

    const handleIsPop = useCallback((isPop: boolean) => {
        setIsPop(prev => isPop);
    },[setIsPop]);

    return {
        isPop,
        handleIsPop
    };
};