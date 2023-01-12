import { FC, useLayoutEffect } from "react";

// Type
import { TodoStatus, TodoType } from "type/todo";

// Component
import TodoItem from "./TodoItem";
import Div from "component/atom/Div";
import { useTryCatch } from "hook/common/useTryCatch";
import { TODO_API } from "api/todo";
import Button from "component/atom/Button";

interface TodoListProps {
    todos: TodoType[],
    handleTodos: (todos: TodoType[]) => void,
    todoId: string,
    status: TodoStatus,
};
const TodoList: FC<TodoListProps> = ({ todos, handleTodos, todoId, status }) => {

    // TodoList 데이터 가져오기
    const { apiFn } = useTryCatch();
    useLayoutEffect(() => {

        const getTodos = async () => {
            const resTodos = await apiFn(() => TODO_API.getTodoList(), "리스트 에러");
            if (resTodos) handleTodos(resTodos);
        };

        getTodos();

    }, [apiFn, todoId, handleTodos]);

    return (
        <Div width="100%" minHeight="278px" padding="5px 30px 5px 5px" borderRight="1px solid #ccc">
            <Div display="flex" justifyContent="end">
                <Div width="80%" display="flex" justifyContent="center">TODO LIST</Div>
                <Button onClick={() => console.log('등록')} text="등록" />
            </Div>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                    </tr>
                </thead>
                <colgroup>
                    <col width={"*"} />
                </colgroup>
                <tbody>
                    {todos.length > 0 && todos.map(todo => (<TodoItem key={todo.id} todo={todo} status={status} />))}
                    {todos.length === 0 && <tr><td>데이터가 없습니다.</td></tr>}
                </tbody>
            </table>
        </Div>
    );
}

export default TodoList;