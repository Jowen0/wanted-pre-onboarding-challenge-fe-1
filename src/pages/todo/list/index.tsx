import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { TodoStatus } from "type/todo";
import { PAGE_URL } from "type/common";

// API
import { useGetTodos } from "api/todo";

// Component
import Div from "component/atom/Div";
import Span from "component/atom/Span";
import TodoItem from "./TodoItem";
import Button from "component/atom/Button";
import NoData from "./NoData";

interface TodoListProps {
    todoId: string | undefined,
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
        <Div width="100%" minHeight="278px" padding="5px 30px 5px 5px">
            <Div display="flex" justifyContent="end">
                <Div width="80%" display="flex" justifyContent="center">
                    <Span
                        text="할 일 목록"
                        textAlign="center"
                        fontSize="20px"
                        fontWeight="bold"
                    />
                </Div>
                <Button backgroundColor="#b0d6ff" onClick={() => handleIsPop(true)} text="등록" />
            </Div>
            {resTodos?.map((todo, index) => (
                <TodoItem key={index} todo={todo} handleTodoStatus={handleTodoStatus} />
            ))}
            {resTodos?.length === 0 && <NoData />}
        </Div>
    );
}

export default TodoList;