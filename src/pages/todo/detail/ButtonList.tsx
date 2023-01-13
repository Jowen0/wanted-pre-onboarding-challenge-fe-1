import { FC } from "react";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/common/useTryCatch";
import { useModal } from "hook/common/useModal";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";

// Component
import Button from "component/atom/Button";
import Div from "component/atom/Div";
import DeleteTodoModal from "../modal/DeleteTodoModal";

interface ButtonListProps {
    status: TodoStatus,
    todoInfo: TodoType,
    handleTodoStatus: (status: TodoStatus) => void,
};
const ButtonList: FC<ButtonListProps> = ({ status, todoInfo, handleTodoStatus }) => {

    const {isPop, handleIsPop} = useModal();
    const { apiFn } = useTryCatch();

    // 수정
    const updateTodo = async () => {
        const resTodo = await apiFn(() => TODO_API.updateTodo(todoInfo), '수정 오류');
        if (resTodo) {
            alert('수정 완료');
            handleTodoStatus(TODO_STATUS.READ);
        };
    };

    // 삭제
    const popDeleteModal = () => {
        handleIsPop(true);
    };

    // 버튼 종류
    const ButtonComponent = () => {
        switch (status) {
            case TODO_STATUS.READ:
                return (
                    <div>
                        <Button onClick={() => handleTodoStatus(TODO_STATUS.UPDATE)} text='수정' />
                        <Button backgroundColor="#fa8b8b" onClick={() => popDeleteModal()} text='삭제'/>
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
            {isPop && <DeleteTodoModal todoId={todoInfo.id} handleIsPop={handleIsPop} />}
        </Div>
    );
}

export default ButtonList;