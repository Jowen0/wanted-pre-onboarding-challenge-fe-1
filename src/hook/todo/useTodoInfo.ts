import { useCallback, useState } from "react";

// Type
import { TodoType } from "type/todo";

export const useTodoInfo = () => {

    const [todoInfo, setTodoInfo] = useState<TodoType>({
        title: "",
        content: "",
        id: "",
        createdAt: "",
        updatedAt: ""
    });

    // Todo 입력
    const handleTodoInfo = useCallback((todo: TodoType) => {
        setTodoInfo(prev => todo)
    }, []);

    // Todo 프로퍼티 입력
    const handleTodoInfoProperty = useCallback((key: string, value: string) => {
        setTodoInfo(prev => ({ ...prev, [key]: value }));
    }, []);

    return {
        todoInfo,
        handleTodoInfo,
        handleTodoInfoProperty,
    };
};