import { FC, Suspense, useCallback, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Type
import { PAGE_URL } from "type/common";

// Hook
import { useTodos } from "hook/todo/useTodos";
import { useTodoId } from "hook/todo/useTodoId";
import { useStatus } from "hook/todo/useStatus";
import { useModal } from "hook/common/useModal";

// HOC
import WithAuth from "hoc/WithAuth";

// Component
import TodoList from "./list";
import TodoDetail from "./detail";
import Div from "component/atom/Div";
import Loading from "component/Loading";
import CreateTodoModal from "./modal/CreateTodoModal";
import { usePopState } from "hook/common/usePopState";

const TodoContainer: FC = () => {

    const { todos, handleTodos } = useTodos();
    const { status, handleTodoStatus } = useStatus();
    const { todoId, handleTodoId } = useTodoId();
    const { isPop, handleIsPop } = useModal();

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

    // 뒤로가기 시 이전 Todo URL로 이동
    const moveToPrevTodoWithBack = useCallback(() => {
        
        const prevTodoId = todos?.reduce((todoId, currentTodo, index) => {
            if (index > 0 && currentTodo.id === id) todoId = todos[index - 1].id;
            return todoId;
        }, '');
        
        if(!prevTodoId) return;

        window.history.pushState(null, '', `${PAGE_URL.TODO}/${prevTodoId}`);
        window.history.pushState(null, '', `${PAGE_URL.TODO}/${id}`);

    }, [id, todos]);

    usePopState(moveToPrevTodoWithBack);

    return (
        <Div width="70%" display="flex" justifyContent="center" padding="5% 15% 5% 15%" alignItems="normal">
            <ErrorBoundary fallback={<div>Error</div>} onError={err => console.log('리스트 에러', err)}>
                <Suspense fallback={<Loading />}>
                    <TodoList todos={todos} handleTodos={handleTodos} todoId={todoId} status={status} handleTodoStatus={handleTodoStatus} handleIsPop={handleIsPop} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<div>Error</div>} onError={err => console.log(err)}>
                <Suspense fallback={<Loading />}>
                    <TodoDetail todoId={todoId} status={status} handleTodoStatus={handleTodoStatus} />
                </Suspense>
            </ErrorBoundary>
            {isPop && <CreateTodoModal handleIsPop={handleIsPop} />}
        </Div>
    );
}

export default WithAuth(TodoContainer);