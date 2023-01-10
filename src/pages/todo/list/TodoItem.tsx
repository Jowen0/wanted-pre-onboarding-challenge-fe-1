import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";
import { PAGE_URL } from "type/common";

interface TodoItemProps {
    todo: TodoType,
    status: TodoStatus,
};
const TodoItem: FC<TodoItemProps> = ({ todo, status }) => {

    const navigation = useNavigate();
    const handleClick = useCallback(() => {
        if(status !== TODO_STATUS.CREATE) navigation(`${PAGE_URL.TODO}/${todo.id}`);
    },[navigation, todo, status]);

    return (
        todo ?
        <tr>
            <td style={{ textAlign: 'left' }} onClick={() => handleClick()}>{todo.title}</td>
        </tr>
        : null
    );
}

export default TodoItem;