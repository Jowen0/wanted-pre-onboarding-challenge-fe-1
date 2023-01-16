import { FC, useEffect } from "react";

// Type
import { TodoStatus } from "type/todo";

// API
import { useGetTodos } from "api/todo";

// Component
import TodoItem from "./TodoItem";
import Div from "component/atom/Div";
import Button from "component/atom/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "type/common";

interface TodoListProps {
    todoId: string,
    handleTodoStatus: (status: TodoStatus) => void,
    handleIsPop: (isPop: boolean) => void,
};
const TodoList: FC<TodoListProps> = ({ todoId, handleTodoStatus, handleIsPop }) => {

    // TodoList 데이터 가져오기
    const {data: resTodos } = useGetTodos();

    // 첫 로딩 시 url ID 설정
    const navigation = useNavigate();
    useEffect(() => {
        if(!todoId && resTodos && resTodos.length > 0) {
            navigation(`${PAGE_URL.TODO}/${resTodos[0].id}`);
        };
    },[navigation, resTodos, todoId]);

    return (
        <Div width="100%" minHeight="278px" padding="5px 30px 5px 5px" borderRight="1px solid #ccc">
            <Div display="flex" justifyContent="end">
                <Div width="80%" display="flex" justifyContent="center">할 일 목록</Div>
                <Button backgroundColor="#b0d6ff" onClick={() => handleIsPop(true)} text="등록" />
            </Div>
            {resTodos?.map((todo, index) => (
                <TodoItem key={index} todo={todo} handleTodoStatus={handleTodoStatus} />
            ))}
        </Div>
    );
}

export default TodoList;