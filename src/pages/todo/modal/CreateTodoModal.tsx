import { FC } from "react";
import { useNavigate } from "react-router-dom";

// API
import { TODO_API } from "api/todo";

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

interface CreateTodoModalProps {
    handleIsPop: (isPop: boolean) => void,
};
const CreateTodoModal:FC<CreateTodoModalProps> = ({handleIsPop}) => {

    const {todoInfo, handleTodoInfoProperty} = useTodoInfo();
    const { title, content } = todoInfo;

    const navigation = useNavigate();
    const createTodo = async () => {
        const resTodo = await TODO_API.createTodo(todoInfo);
        handleIsPop(false);
        navigation(`${PAGE_URL.TODO}/${resTodo.id}`);
    };

    return ( 
        <Modal 
            content={
                <>
                    <TodoTitle title={title} handleTodoInfoProperty={handleTodoInfoProperty} />
                    <TodoContent content={content} handleTodoInfoProperty={handleTodoInfoProperty} />
                    <Div margin="20px 5px 5px 5px" display="flex" justifyContent="center">
                        <Button text="추가" onClick={createTodo} width='250px' backgroundColor='#333' color="#fff" borderColor="#333" />
                    </Div>
                </>
            }
            handleIsPop={handleIsPop}
        />
     );
}
 
export default CreateTodoModal;