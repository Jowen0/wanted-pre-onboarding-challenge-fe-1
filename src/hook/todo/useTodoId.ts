import { useCallback, useState } from "react";

export const useTodoId = () => {

    const [todoId, setTodoId] = useState("");

    const handleTodoId = useCallback((id: string) => {
        setTodoId(prev => id);
    }, [setTodoId]);

    return {
        todoId,
        handleTodoId,
    };
};