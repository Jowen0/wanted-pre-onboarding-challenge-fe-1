import { FC } from "react";

// Type
import { TodoStatus, TodoType } from "type/todo";

// Component
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: TodoType[],
    status: TodoStatus,
};
const TodoList: FC<TodoListProps> = ({ todos, status }) => {

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
                    {todos.length > 0 && todos.map(todo => (<TodoItem key={todo.id} todo={todo} status={status} />))}
                    {todos.length === 0 && <tr><td>데이터가 없습니다.</td></tr>}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;