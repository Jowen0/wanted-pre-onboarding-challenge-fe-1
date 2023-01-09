import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";
import { WithAuthType } from "pages/auth/component/withAuth";

// API
import { TODO_API } from "api/todo";

// Component
import WithAuth from "pages/auth/component/withAuth";
import TodoList from "./list";
import TodoDetail from "./detail";

const TodoContainer: FC<WithAuthType> = () => {

    const [todos, setTodos] = useState<TodoType[]>([]);
    const [status, setStatus] = useState<TodoStatus>(TODO_STATUS.LIST);
    const [todoId, setTodoId] = useState("");

    // TodoList 데이터 가져오기
    const getTodos = useCallback(async () => {
        const outPut: TodoType[] = await TODO_API.getTodoList();
        setTodos(prev => outPut);
    }, []);

    useLayoutEffect(() => {
        console.log('여기');
        getTodos();
    }, [getTodos, status]);

    // TodoId 세팅
    const { id } = useParams();
    const handleTodoId = useCallback((value: string) => {
        setTodoId(prev => value);
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
    }, [id, todos, handleTodoStatus]);

    console.log(todoId, status);
    
    return (
        <>
            <div>
                <button onClick={() => handleTodoStatus(TODO_STATUS.CREATE)}>등록</button>
            </div>
            <TodoList todos={todos} />
            {status !== TODO_STATUS.LIST && <TodoDetail todoId={todoId} status={status} handleTodoStatus={handleTodoStatus} />}
        </>
    );
}

export default WithAuth(TodoContainer);