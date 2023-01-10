import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { TodoType } from "type/todo";
import { PAGE_URL } from "type/common";

interface TodoItemProps {
    todo: TodoType,
};
const TodoItem: FC<TodoItemProps> = ({ todo }) => {

    const navigation = useNavigate();
    const handleClick = useCallback(() => {
        navigation(`${PAGE_URL.TODO}/${todo.id}`)
    },[navigation, todo]);

    return (
        todo ?
        <tr>
            <td style={{ textAlign: 'left' }} onClick={() => handleClick()}>{todo.title}</td>
        </tr>
        : null
    );
}

export default TodoItem;