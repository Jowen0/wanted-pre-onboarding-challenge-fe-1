import { useCallback, useState } from "react";

export const useTodoId = () => {

    const [todoId, setTodoId] = useState<string | undefined>(undefined);

    const handleTodoId = useCallback((id: string |undefined) => {
        setTodoId(prev => id);
    }, [setTodoId]);

    return {
        todoId,
        handleTodoId,
    };
};