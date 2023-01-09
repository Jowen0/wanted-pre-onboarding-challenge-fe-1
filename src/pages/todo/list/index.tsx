import { FC } from "react";

// Type
import { TodoType } from "type/todo";

// Component
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: TodoType[],
    handleTodoId: (value: string) => void,
};
const TodoList: FC<TodoListProps> = ({ todos, handleTodoId }) => {

    return (
        <div>
            <div>Todo List</div>
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
                    {todos.length > 0 && todos.map(todo => (<TodoItem key={todo.id} todoId={todo.id} onClickFn={handleTodoId} />))}
                    {todos.length === 0 && <tr onClick={() => handleTodoId("1")}><td>데이터가 없습니다.</td></tr>}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;