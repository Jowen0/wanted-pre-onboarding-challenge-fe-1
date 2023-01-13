import { FC } from "react";
import { useNavigate } from "react-router-dom";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/common/useTryCatch";

// Type
import { PAGE_URL } from "type/common";

// Component
import Modal from "component/Modal";
import Div from "component/atom/Div";
import Button from "component/atom/Button";

interface DeleteTodoModalProps {
    todoId: string,
    handleIsPop: (isPop: boolean) => void,
};
const DeleteTodoModal:FC<DeleteTodoModalProps> = ({todoId, handleIsPop}) => {

    const { apiFn } = useTryCatch();

    const navigation = useNavigate()
    const deleteTodo = async () => {
        const res = await apiFn(() => TODO_API.deleteTodo(todoId), '삭제 오류');
        if (res === null) {
            alert('삭제 완료');
            handleIsPop(false);
            navigation(`${PAGE_URL.TODO}`);
        };
    };

    return (
        <Modal
            header={<Div display="flex" justifyContent="center">삭제 확인</Div>}
            content={
                <Div margin="0 0 -15px 0" padding="0">
                    <Div display="flex" justifyContent="center">삭제 하시겠습니까?</Div>
                </Div>
            }
            button={
                <Div margin="20px 5px 5px 5px" display="flex" justifyContent="center">
                    <Button text="삭제" onClick={deleteTodo} width='250px' backgroundColor='#333' color="#fff" borderColor="#333" />
                </Div>
            }
            handleIsPop={handleIsPop}
        />
    );
}

export default DeleteTodoModal;