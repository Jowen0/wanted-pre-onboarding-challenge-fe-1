import { FC } from "react";
import { useNavigate } from "react-router-dom";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/common/useTryCatch";

// Type
import { PAGE_URL } from "type/common";
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";
import Button from "component/atom/Button";

// Component
import Div from "component/atom/Div";

interface ButtonListProps {
    status: TodoStatus,
    todoInfo: TodoType,
    handleTodoStatus: (status: TodoStatus) => void,
};
const ButtonList: FC<ButtonListProps> = ({ status, todoInfo, handleTodoStatus }) => {

    const { apiFn } = useTryCatch();
    const navigation = useNavigate();

    // 등록
    const createTodo = async () => {
        const outPut = await apiFn(() => TODO_API.createTodo(todoInfo), '등록 오류');
        if (outPut) {
            alert('등록 완료');
            handleTodoStatus(TODO_STATUS.READ);
            navigation(`${PAGE_URL.TODO}/${outPut.id}`);
        };
    };

    // 수정
    const updateTodo = async () => {
        const outPut = await apiFn(() => TODO_API.updateTodo(todoInfo), '수정 오류');
        if (outPut) {
            alert('수정 완료');
            handleTodoStatus(TODO_STATUS.READ);
        };
    };

    // 삭제 - 모달 추가예정
    const deleteTodo = async () => {
        const outPut = await apiFn(() => TODO_API.deleteTodo(todoInfo.id), '삭제 오류');
        if (outPut === null) {
            alert('삭제 완료');
            navigation(`${PAGE_URL.TODO}`);
        };
    };

    // 버튼 종류
    const ButtonComponent = () => {
        switch (status) {
            case TODO_STATUS.READ:
                return (
                    <div>
                        <Button onClick={() => handleTodoStatus(TODO_STATUS.UPDATE)} text='수정' />
                        <Button backgroundColor="#fa8b8b" onClick={() => deleteTodo()} text='삭제'/>
                    </div>
                );
            case TODO_STATUS.UPDATE:
                return (
                    <div>
                        <Button onClick={() => handleTodoStatus(TODO_STATUS.READ)} text='취소'/>
                        <Button backgroundColor="#beffcc" onClick={() => updateTodo()} text='수정'/>
                    </div>
                );
        };
    };

    return (
        <Div justifyContent="end" display="flex">
            {ButtonComponent()}
        </Div>
    );
}

export default ButtonList;