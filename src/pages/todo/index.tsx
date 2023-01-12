import { FC, Suspense, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Type
import { PAGE_URL } from "type/common";

// Hook
import { useTodos } from "hook/todo/useTodos";
import { useTodoId } from "hook/todo/useTodoId";
import { useStatus } from "hook/todo/useStatus";

// HOC
import WithAuth from "hoc/WithAuth";

// Component
import TodoList from "./list";
import TodoDetail from "./detail";
import Div from "component/atom/Div";
import Loading from "component/Loading";

const TodoContainer: FC = () => {

    const { todos, handleTodos } = useTodos();
    const { status, handleTodoStatus } = useStatus();
    const { todoId, handleTodoId } = useTodoId();

    const { id } = useParams();

    // 첫 로딩 시 ID url 설정
    const navigation = useNavigate();
    useEffect(() => {
        if (!id && todos.length > 0) navigation(`${PAGE_URL.TODO}/${todos[0].id}`);
    }, [id, todos, navigation]);

    // ID params으로 todoId 설정
    useLayoutEffect(() => {
        if (id) handleTodoId(id);
    }, [id, handleTodoId]);

    return (
        <Div width="70%" display="flex" justifyContent="center" padding="5% 15% 5% 15%" alignItems="normal">
            <ErrorBoundary fallback={<div>Error</div>} onError={err => console.log('리스트 에러', err)}>
                <Suspense fallback={<Loading />}>
                    <TodoList todos={todos} handleTodos={handleTodos} todoId={todoId} status={status} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<div>Error</div>} onError={err => console.log(err)}>
                <Suspense fallback={<Loading />}>
                    <TodoDetail todoId={todoId} status={status} handleTodoStatus={handleTodoStatus} />
                </Suspense>
            </ErrorBoundary>
        </Div>
    );
}

export default WithAuth(TodoContainer);