import { FC, useLayoutEffect } from "react";

// Type
import { TodoStatus } from "type/todo";

// Hook
import { useTodoInfo } from "hook/todo/useTodoInfo";

// API
import { useGetTodo } from "api/todo";

// Component
import Div from "component/atom/Div";
import ButtonList from "./ButtonList";
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

    // Todo Data Fetch
    const { data: resTodo } = useGetTodo(todoId);

    // After Todo Fetch
    useLayoutEffect(() => {
        if(resTodo) handleTodoInfo(resTodo);
    },[resTodo, handleTodoInfo]);

    return (
        resTodo ?
        <Div width="100%" borderLeft="1px solid #ccc" padding="5px 5px 5px 10px">
            <ButtonList status={status} todoInfo={todoInfo} handleTodoStatus={handleTodoStatus} />
            <TodoTitle title={title} status={status} handleTodoInfoProperty={handleTodoInfoProperty} />
            <TodoContent content={content} status={status} handleTodoInfoProperty={handleTodoInfoProperty} />
        </Div>
        : null

    );
}

export default TodoDetail;