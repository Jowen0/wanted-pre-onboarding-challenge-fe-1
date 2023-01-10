import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// API
import { TODO_API } from "api/todo";

// Hook
import { useTryCatch } from "hook/useTryCatch";

// Type
import { PAGE_URL } from "type/common";
import { TodoStatus, TodoType, TODO_STATUS } from "type/todo";

interface ButtonListProps {
    status: TodoStatus,
    todoInfo: TodoType,
    handleTodoId: (id: string) => void,
    handleTodoStatus: (status: TodoStatus) => void,
};
const ButtonList: FC<ButtonListProps> = ({ status, todoInfo, handleTodoId, handleTodoStatus }) => {

    const { apiFn } = useTryCatch();
    const navigation = useNavigate();

    // 목록
    const handleList = useCallback(() => {
        handleTodoId("");
        handleTodoStatus(TODO_STATUS.LIST);
        navigation(`${PAGE_URL.TODO}`);
    }, [handleTodoId, handleTodoStatus, navigation]);

    // 등록
    const handleCreate = async () => {
        const outPut = await apiFn(() => TODO_API.createTodo(todoInfo), '등록 오류');
        if (outPut) {
            alert('등록 완료');
            handleTodoStatus(TODO_STATUS.READ);
            navigation(`${PAGE_URL.TODO}/${outPut.id}`);
        };
    };

    // 수정
    const handleUpdate = async () => {
        const outPut = await apiFn(() => TODO_API.updateTodo(todoInfo), '수정 오류');
        if (outPut) {
            alert('수정 완료');
            handleTodoStatus(TODO_STATUS.READ);
        };
    };

    // 삭제
    const handleDelete = async () => {
        const outPut = await apiFn(() => TODO_API.deleteTodo(todoInfo.id), '삭제 오류');
        if (outPut === null) {
            alert('삭제 완료');
            handleList();
        };
    };

    // 버튼 종류
    const ButtonComponent = () => {
        switch (status) {
            case TODO_STATUS.READ:
                return (
                    <div>
                        <button onClick={() => handleList()}>목록</button>
                        <button onClick={() => handleTodoStatus(TODO_STATUS.UPDATE)}>수정</button>
                        <button onClick={() => handleDelete()}>삭제</button>
                    </div>
                );
            case TODO_STATUS.CREATE:
                return (
                    <div>
                        <button onClick={() => handleList()}>목록</button>
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