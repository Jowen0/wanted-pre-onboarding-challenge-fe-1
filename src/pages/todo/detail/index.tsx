import { FC, useCallback, useLayoutEffect, useState } from "react";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";
import { WithAuthType } from "pages/auth/component/withAuth";

// Hook
import { useTryCatch } from "hook/useTryCatch";

// API
import { TODO_API } from "api/todo";

// Component
import Input from "pages/common/atom/Input";
import ButtonList from "../common/ButtonList";

interface TodoDetailProps extends WithAuthType {
    todoId?: string,
    status: TodoStatus,
    handleTodoId: (id: string) => void,
    handleTodoStatus: (status: TodoStatus) => void,
};
const TodoDetail: FC<TodoDetailProps> = ({ todoId = "", status, handleTodoId, handleTodoStatus }) => {

    const [todoInfo, setTodoInfo] = useState<TodoType>({
        title: "",
        content: "",
        id: "",
        createdAt: "",
        updatedAt: ""
    });

    // Todo 데이터 가져오기
    const { apiFn } = useTryCatch();
     const getTodo = useCallback(async (id: string) => {
         const outPut = await apiFn(() => TODO_API.getTodo(id), "상세 에러");
         if (outPut) setTodoInfo(prev => outPut);
    }, [setTodoInfo, apiFn]);

    useLayoutEffect(() => {
        if(todoId) {
            getTodo(todoId);
        };
    },[todoId, getTodo]);

    // Todo 데이터 입력
    const handleTodoInfo = (key: string, value: string) => {
        setTodoInfo(prev => ({ ...prev, [key]: value }));
    };

    const { title, content } = todoInfo;

    return (
        <div>
            <ButtonList status={status} todoInfo={todoInfo} handleTodoId={handleTodoId} handleTodoStatus={handleTodoStatus} /> 
            <Input name="title" value={title} disable={status === TODO_STATUS.READ} handleData={handleTodoInfo} />
            <Input name="content" value={content} disable={status === TODO_STATUS.READ} handleData={handleTodoInfo} />
        </div>

    );
}

export default TodoDetail;