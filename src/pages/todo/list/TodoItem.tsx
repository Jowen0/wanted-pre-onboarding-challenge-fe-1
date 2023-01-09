import { FC } from "react";

interface TodoItemProps {
    todoId: string,
    onClickFn: (value: string) => void,
};
const TodoItem: FC<TodoItemProps> = ({ todoId, onClickFn }) => {

    return (
        <tr>
            <td style={{ textAlign: 'center' }} onClick={() => onClickFn(todoId)}>TEST</td>
        </tr>
    );
}

export default TodoItem;