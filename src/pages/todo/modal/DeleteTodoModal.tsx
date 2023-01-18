import { FC } from "react";
import { useNavigate } from "react-router-dom";

// API
import { useDeleteTodo } from "api/todo";

// Type
import { PAGE_URL } from "type/common";

// Component
import Modal from "component/Modal";
import Div from "component/atom/Div";
import Button from "component/atom/Button";
import Span from "component/atom/Span";

interface DeleteTodoModalProps {
    todoId: string,
    handleIsPop: (isPop: boolean) => void,
};
const DeleteTodoModal:FC<DeleteTodoModalProps> = ({todoId, handleIsPop}) => {

    const deleteTodoMutation = useDeleteTodo();
    const navigation = useNavigate()

    const deleteTodo = async () => {

        const res = await deleteTodoMutation.mutateAsync(todoId);
        if (res === null) {
            alert('삭제 완료');
            handleIsPop(false);
            navigation(`${PAGE_URL.TODO}`);
        };
    };

    return (
        <Modal
            header={
                <Div display="flex" justifyContent="center" margin="5px 5px 5px 30px">
                    <Span
                        text="삭제 확인"
                        fontSize="20px"
                        fontWeight="bold"
                        textAlign="center"
                    />
                </Div>
            }
            content={
                <Div display="flex" justifyContent="center" padding="0 5px 0 15px" margin="-5px 5px -5px 5px">
                    <Span
                        text="삭제 하시겠습니까?"
                        fontSize="20px"
                        textAlign="center"
                    />
                </Div>
            }
            button={
                <Div display="flex" justifyContent="center" margin="0 5px 5px 15px" >
                    <Button text="삭제" onClick={deleteTodo} width='250px' backgroundColor='#f14e4e' color="#fff" borderColor="#333" />
                </Div>
            }
            handleIsPop={handleIsPop}
        />
    );
}

export default DeleteTodoModal;