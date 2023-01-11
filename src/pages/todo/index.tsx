import { FC, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

// Type
import { TODO_STATUS } from "type/todo";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/useTryCatch";
import { useTodos } from "./hook/useTodos";
import { useStatus } from "./hook/useStatus";
import { useTodoId } from "./hook/useTodoId";

// HOC
import WithAuth from "hoc/withAuth";

// Component
import TodoList from "./component/list";
import TodoDetail from "./component/detail";

const TodoContainer: FC = () => {

    const { todos, handleTodos } = useTodos();
    const { status, handleTodoStatus } = useStatus();
    const { todoId, handleTodoId } = useTodoId();

    // TodoList 데이터 가져오기
    const { apiFn } = useTryCatch();
    useLayoutEffect(() => {

        const getTodos = async () => {
            const resTodos = await apiFn(() => TODO_API.getTodoList(), "리스트 에러");
            if(resTodos) handleTodos(resTodos);
        };

        getTodos();
        
    }, [apiFn, status, handleTodos]);

    // TodoId 세팅
    const { id } = useParams();
    useLayoutEffect(() => {

        const reg = /\d/g;

        if (todos.length > 0 && id && reg.test(id)) {
            handleTodoId(id);
        };
        
    }, [id, todos, handleTodoId]);

    // 상태 설정
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