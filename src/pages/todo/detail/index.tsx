import { FC, useCallback, useLayoutEffect, useState } from "react";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";

// Component
import Input from "pages/common/atom/Input";
import { TODO_API } from "api/todo";
import ButtonList from "../common/ButtonList";

interface TodoDetailProps {
    todoId?: string,
    status: TodoStatus,
    handleTodoStatus: (status: TodoStatus) => void,
};
const TodoDetail: FC<TodoDetailProps> = ({ todoId = "", status, handleTodoStatus }) => {

    const [todoInfo, setTodoInfo] = useState({
        title: "",
        content: "",
        id: "",
        createdAt: "",
        updatedAt: ""
    });

     // Todo 데이터 가져오기
     const getTodo = useCallback(async (id: string) => {
        const outPut: TodoType = await TODO_API.getTodo(id);
        setTodoInfo(prev => outPut);
    }, [setTodoInfo]);

    useLayoutEffect(() => {
        if(todoId) {
            getTodo(todoId);
        };
    },[todoId, getTodo]);

    // Todo 데이터 입력
    const handleTodoInfo = (key: string, value: string) => {
        setTodoInfo(prev => ({ ...prev, [key]: value }));
    };

    const { title, content } = todoInfo;

    return (
        <div>
            <ButtonList status={status} todoInfo={todoInfo} handleTodoStatus={handleTodoStatus} /> 
            <Input name="title" value={title} disable={status === TODO_STATUS.READ} handleData={handleTodoInfo} />
            <Input name="content" value={content} disable={status === TODO_STATUS.READ} handleData={handleTodoInfo} />
        </div>

    );
}

export default TodoDetail;