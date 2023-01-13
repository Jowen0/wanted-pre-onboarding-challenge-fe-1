import { FC, useCallback, useLayoutEffect } from "react";

// Type
import { TodoStatus } from "type/todo";

// Hook
import { useTryCatch } from "hook/common/useTryCatch";
import { useTodoInfo } from "hook/todo/useTodoInfo";

// API
import { TODO_API } from "api/todo";

// Component
import ButtonList from "./ButtonList";
import Div from "component/atom/Div";
import TodoTitle from "./TodoTitle";
import TodoContent from "./TodoContent";

interface TodoDetailProps {
    todoId?: string,
    status: TodoStatus,
    handleTodoStatus: (status: TodoStatus) => void,
};
const TodoDetail: FC<TodoDetailProps> = ({ todoId = "", status, handleTodoStatus }) => {

    // TodoInfo
    const { todoInfo, handleTodoInfo, handleTodoInfoProperty } = useTodoInfo();
    const { title, content } = todoInfo;

    // Todo 데이터 가져오기
    const { apiFn } = useTryCatch();
    const getTodo = useCallback(async (id: string) => {
         const todoResult = await apiFn(() => TODO_API.getTodo(id), "상세 에러");
         if (todoResult) handleTodoInfo(todoResult);
    }, [handleTodoInfo, apiFn]);

    useLayoutEffect(() => {
        if(todoId) getTodo(todoId);
    },[todoId, getTodo]);

    return (
        <Div width="100%">
            <ButtonList status={status} todoInfo={todoInfo} handleTodoStatus={handleTodoStatus} />
            <TodoTitle title={title} status={status} handleTodoInfoProperty={handleTodoInfoProperty} />
            <TodoContent content={content} status={status} handleTodoInfoProperty={handleTodoInfoProperty} />
        </Div>

    );
}

export default TodoDetail;