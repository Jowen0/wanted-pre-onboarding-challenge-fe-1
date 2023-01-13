import { FC, useLayoutEffect } from "react";

// Type
import { TodoStatus, TodoType } from "type/todo";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/common/useTryCatch";

// Component
import TodoItem from "./TodoItem";
import Div from "component/atom/Div";
import Button from "component/atom/Button";

interface TodoListProps {
    todos: TodoType[],
    handleTodos: (todos: TodoType[]) => void,
    todoId: string,
    status: TodoStatus,
    handleTodoStatus: (status: TodoStatus) => void,
    handleIsPop: (isPop: boolean) => void,
};
const TodoList: FC<TodoListProps> = ({ todos, handleTodos, todoId, status, handleTodoStatus, handleIsPop }) => {

    // TodoList 데이터 가져오기
    const { apiFn } = useTryCatch();
    useLayoutEffect(() => {

        const getTodos = async () => {
            const resTodos = await apiFn(() => TODO_API.getTodoList(), "리스트 에러");
            if (resTodos) handleTodos(resTodos);
        };

        getTodos();

    }, [apiFn, todoId, status, handleTodos]);

    return (
        <Div width="100%" minHeight="278px" padding="5px 30px 5px 5px" borderRight="1px solid #ccc">
            <Div display="flex" justifyContent="end">
                <Div width="80%" display="flex" justifyContent="center">할 일 목록</Div>
                <Button backgroundColor="#b0d6ff" onClick={() => handleIsPop(true)} text="등록" />
            </Div>
            {todos.length > 0 && todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} handleTodoStatus={handleTodoStatus} />
            ))}
        </Div>
    );
}

export default TodoList;