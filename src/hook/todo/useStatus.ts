import { useCallback, useState } from "react";

// Type
import { TodoStatus, TODO_STATUS } from "type/todo";

export const useStatus = () => {

    const [status, setStatus] = useState<TodoStatus>(TODO_STATUS.LIST);

    const handleTodoStatus = useCallback((status: TodoStatus) => {
        setStatus(prev => status);
    }, [setStatus]);

    return {
        status,
        handleTodoStatus,
    };
};