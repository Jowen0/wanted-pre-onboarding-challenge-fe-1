import { TODO_API } from "api/todo";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "type/common";

// Type
import { TodoType } from "type/todo";

interface TodoItemProps {
    todoId: string,
};
const TodoItem: FC<TodoItemProps> = ({ todoId }) => {

    const [todo, setTodo] = useState<TodoType>();

    const getTodo = useCallback(async () => {
        const data = await TODO_API.getTodo(todoId);
        setTodo(prev => data);
    },[setTodo, todoId]);

    useEffect(() => {
        getTodo();
    },[getTodo, todoId]);

    const navigation = useNavigate();
    const handleClick = useCallback(() => {
        navigation(`${PAGE_URL.TODO}/${todoId}`)
    },[navigation, todoId]);

    return (
        todo ?
        <tr>
            <td style={{ textAlign: 'center' }} onClick={() => handleClick()}>{todo.title}</td>
        </tr>
        : null
    );
}

export default TodoItem;