import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";
import { PAGE_URL } from "type/common";

// Component
import Div from "component/atom/Div";

const TodoItemWrapper = styled.div`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    width: 100%;
    padding: 5px;
    margin: 5px;
    margin-bottom: 15px;
    border: 1px solid #ffdcdc;
    border-radius: 15px;
    background-color: #ffdcdc;
`

interface TodoItemProps {
    todo: TodoType,
    handleTodoStatus: (status: TodoStatus) => void,
};
const TodoItem: FC<TodoItemProps> = ({ todo, handleTodoStatus }) => {

    const navigation = useNavigate();

    const changeDetail = useCallback(() => {
        handleTodoStatus(TODO_STATUS.READ);
        navigation(`${PAGE_URL.TODO}/${todo.id}`)
    },[navigation, todo, handleTodoStatus]);
    

    return (
        <TodoItemWrapper onClick={() => changeDetail()}>
            <Div>{todo.title}</Div>
            <Div width="95%" display="flex" justifyContent="end"><span style={{fontSize: 12}}>{todo.updatedAt.substring(0, 10)}</span></Div>
        </TodoItemWrapper>
    );
}

export default TodoItem;