import { FC, Suspense, useCallback, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Type
import { PAGE_URL } from "type/common";

// Hook
import { useTodos } from "hook/todo/useTodos";
import { useTodoId } from "hook/todo/useTodoId";
import { useStatus } from "hook/todo/useStatus";
import { useModal } from "hook/common/useModal";
import { usePopState } from "hook/common/usePopState";

// HOC
import WithAuth from "hoc/WithAuth";

// Component
import TodoList from "./list";
import TodoDetail from "./detail";
import Div from "component/atom/Div";
import Loading from "component/Loading";
import CreateTodoModal from "./modal/CreateTodoModal";

const TodoContainer: FC = () => {

    const { id } = useParams();
    const { getQueryTodos } = useTodos();
    const { todoId, handleTodoId } = useTodoId();
    const { status, handleTodoStatus } = useStatus();
    const { isPop: isCreateModalPop, handleIsPop: handleIsCreateModalPop } = useModal();

    // ID params으로 todoId 설정
    useLayoutEffect(() => {
        if (id) handleTodoId(id);
    }, [id, handleTodoId]);

    // 뒤로가기 시 이전 Todo URL로 이동
    const moveToPrevTodoWithBack = useCallback(() => {

        const todos = getQueryTodos();
        const prevTodoId = todos?.reduce((todoId, currentTodo, index) => {
            if (index > 0 && currentTodo.id === id) todoId = todos[index - 1].id;
            return todoId;
        }, '');

        if (!prevTodoId) return;

        window.history.pushState(null, '', `${PAGE_URL.TODO}/${prevTodoId}`);
        window.history.pushState(null, '', `${PAGE_URL.TODO}/${id}`);

    }, [id, getQueryTodos]);

    usePopState(moveToPrevTodoWithBack);

    return (
        <Div width="70%" display="flex" justifyContent="center" padding="5% 15% 5% 15%" alignItems="normal">
            <ErrorBoundary fallback={<div>Error</div>} onError={err => console.log('리스트 에러', err)}>
                <Suspense fallback={<Loading />}>
                    <TodoList todoId={todoId} handleTodoStatus={handleTodoStatus} handleIsPop={handleIsCreateModalPop} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<div>Error</div>} onError={err => console.log(err)}>
                <Suspense fallback={<Loading />}>
                    <TodoDetail todoId={todoId} status={status} handleTodoStatus={handleTodoStatus} />
                </Suspense>
            </ErrorBoundary>
            {isCreateModalPop && <CreateTodoModal handleIsPop={handleIsCreateModalPop} />}
        </Div>
    );
}

export default WithAuth(TodoContainer);