import { FC } from "react";
import { useNavigate } from "react-router-dom";

// API
import { useCreateTodo } from "api/todo";

// Type
import { PAGE_URL } from "type/common";

// Hook
import { useTodoInfo } from "hook/todo/useTodoInfo";

// Component
import Button from "component/atom/Button";
import Div from "component/atom/Div";
import Modal from "component/Modal";
import TodoContent from "../detail/TodoContent";
import TodoTitle from "../detail/TodoTitle";
import Span from "component/atom/Span";

interface CreateTodoModalProps {
    handleIsPop: (isPop: boolean) => void,
};
const CreateTodoModal:FC<CreateTodoModalProps> = ({handleIsPop}) => {

    const {todoInfo, handleTodoInfoProperty} = useTodoInfo();
    const { title, content } = todoInfo;

    const createTodoMutation = useCreateTodo();

    const navigation = useNavigate();
    
    const createTodo = async () => {
        const resTodo = await createTodoMutation.mutateAsync(todoInfo);
        handleIsPop(false);
        navigation(`${PAGE_URL.TODO}/${resTodo.id}`);
    };

    return ( 
        <Modal
            backgroundColor="#d3e8ff"
            header={
                <Div display="flex" justifyContent="center" margin="0 0 -35px 0">
                    <Span
                        text="등 록"
                        fontSize="20px"
                        fontWeight="bold"
                        textAlign="center"
                    />
                </Div>
            }
            content={
                <>
                    <TodoTitle title={title} handleTodoInfoProperty={handleTodoInfoProperty} />
                    <TodoContent content={content} handleTodoInfoProperty={handleTodoInfoProperty} />
                    <Div margin="20px 5px -35px 5px" display="flex" justifyContent="center">
                        <Button text="추가" onClick={createTodo} width='250px' backgroundColor='#333' color="#fff" borderColor="#333" />
                    </Div>
                </>
            }
            handleIsPop={handleIsPop}
        />
     );
}
 
export default CreateTodoModal;