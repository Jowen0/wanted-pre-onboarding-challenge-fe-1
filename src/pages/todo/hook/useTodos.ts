import { useCallback, useState } from "react";

// Type
import { TodoType } from "type/todo";

export const useTodos = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    const handleTodos = useCallback((todos: TodoType[]) => {
        setTodos(prev => todos);
    }, [setTodos]);

    return {
        todos,
        handleTodos,
    };
};