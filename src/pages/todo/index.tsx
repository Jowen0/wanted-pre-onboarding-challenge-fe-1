import { FC, useCallback, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";
import { WithAuthType } from "pages/auth/component/withAuth";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/useTryCatch";

// Component
import WithAuth from "pages/auth/component/withAuth";
import TodoList from "./list";
import TodoDetail from "./detail";

const TodoContainer: FC<WithAuthType> = () => {

    const [todos, setTodos] = useState<TodoType[]>([]);
    const [todoId, setTodoId] = useState("");
    const [status, setStatus] = useState<TodoStatus>(TODO_STATUS.LIST);

    // TodoList 데이터 가져오기
    const { apiFn } = useTryCatch();
    useLayoutEffect(() => {

        const getTodos = async () => {
            const outPut = await apiFn(() => TODO_API.getTodoList(), "리스트 에러");
            if(outPut) setTodos(prev => outPut);
        };
        getTodos();
        
    }, [apiFn, status]);

    // TodoId 세팅
    const { id } = useParams();
    const handleTodoId = useCallback((id: string) => {
        setTodoId(prev => id);
    }, [setTodoId]);
    useLayoutEffect(() => {

        const reg = /\d/g;
        if (todos.length > 0 && id && reg.test(id)) {
            handleTodoId(id);
        };
    }, [id, todos, handleTodoId]);

    // 상태 설정
    const handleTodoStatus = useCallback((status: TodoStatus) => {
        setStatus(prev => status);
    }, [setStatus]);

    useLayoutEffect(() => {
        if (todos.length > 0 && id && status === TODO_STATUS.LIST) {
            handleTodoStatus(TODO_STATUS.READ);
        };
    }, [id, todos, status, handleTodoStatus]);

    return (
        <>
            <div>
                {status === TODO_STATUS.LIST && <button onClick={() => handleTodoStatus(TODO_STATUS.CREATE)}>등록</button>}
            </div>
            <TodoList todos={todos} status={status} />
            {status !== TODO_STATUS.LIST && <TodoDetail todoId={todoId} status={status} handleTodoId={handleTodoId} handleTodoStatus={handleTodoStatus} />}
        </>
    );
}

export default WithAuth(TodoContainer);