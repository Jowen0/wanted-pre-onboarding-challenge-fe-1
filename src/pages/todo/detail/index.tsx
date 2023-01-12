import { FC, useCallback, useLayoutEffect } from "react";

// Type
import { TodoStatus, TODO_STATUS } from "type/todo";

// Hook
import { useTryCatch } from "hook/common/useTryCatch";
import { useTodoInfo } from "hook/todo/useTodoInfo";

// API
import { TODO_API } from "api/todo";

// Component
import Input from "component/atom/Input";
import ButtonList from "./ButtonList";
import Textarea from "component/atom/Textarea";
import Labal from "component/atom/Label";
import Div from "component/atom/Div";

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
            <Div display="flex">
                <Labal text="제목" />
                <Input name="title" value={title} disable={status === TODO_STATUS.READ} handleData={handleTodoInfoProperty} />
            </Div>
            <Div display="flex" margin="20px 5px 5px 5px">
                <Labal text="내용" />
                <Textarea name="content" value={content} disable={status === TODO_STATUS.READ} handleData={handleTodoInfoProperty} />
            </Div>
        </Div>

    );
}

export default TodoDetail;