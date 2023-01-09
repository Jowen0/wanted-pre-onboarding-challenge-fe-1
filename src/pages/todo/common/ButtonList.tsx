import { TODO_API } from "api/todo";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "type/common";

// Type
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";

interface ButtonListProps {
    status: TodoStatus,
    todoInfo: TodoType,
    handleTodoStatus: (status: TodoStatus) => void,
};
const ButtonList: FC<ButtonListProps> = ({ status, todoInfo, handleTodoStatus }) => {

    const navigation = useNavigate();
    // 등록
    const handleCreate = async () => {
        try {
            const outPut:TodoType = await TODO_API.createTodo(todoInfo);
            alert('등록 완료');
            navigation(`${PAGE_URL.TODO}/${outPut.id}`);
        }
        catch (error) {
            alert('등록 오류');
            console.log(error);
        };
    };

    // 수정
    const handleUpdate = async () => {
        try {
            await TODO_API.updateTodo(todoInfo);
            alert('수정 완료');
            handleTodoStatus(TODO_STATUS.READ);
        }
        catch (error) {
            alert('수정 오류');
            console.log(error);
        };
    };

    // 삭제
    const handleDelete = async () => {
        try {
            await TODO_API.deleteTodo(todoInfo.id);
            alert('삭제 완료');
            navigation(`${PAGE_URL.TODO}`);
        }
        catch (error) {
            alert('삭제 오류');
            console.log(error);
        };
    };

    // 버튼 종류
    const ButtonComponent = () => {
        switch (status) {
            case TODO_STATUS.READ:
                return (
                    <div>
                        <button onClick={() => handleTodoStatus(TODO_STATUS.LIST)}>목록</button>
                        <button onClick={() => handleTodoStatus(TODO_STATUS.UPDATE)}>수정</button>
                        <button onClick={() => handleDelete()}>삭제</button>
                    </div>
                );
            case TODO_STATUS.CREATE:
                return (
                    <div>
                        <button onClick={() => handleTodoStatus(TODO_STATUS.LIST)}>목록</button>
                        <button onClick={() => handleCreate()}>등록</button>
                    </div>
                );
            case TODO_STATUS.UPDATE:
                return (
                    <div>
                        <button onClick={() => handleTodoStatus(TODO_STATUS.READ)}>취소</button>
                        <button onClick={() => handleUpdate()}>수정</button>
                    </div>
                );
        };
    }

    return (
        <>
            {ButtonComponent()}
        </>
    );
}

export default ButtonList;