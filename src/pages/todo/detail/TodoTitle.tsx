import { FC } from "react";

// Type
import { TodoStatus, TODO_STATUS } from "type/todo";

// Component
import Div from "component/atom/Div";
import Input from "component/atom/Input";

interface TodoTitleProps {
    title: string,
    status?: TodoStatus,
    handleTodoInfoProperty: (key: string, value: string) => void,
};
const TodoTitle:FC<TodoTitleProps> = ({title, status, handleTodoInfoProperty }) => {

    return ( 
        <Div display="flex">
            {/* <Labal text="제목" /> */}
            <Input name="title" value={title} placeholder={'제목을 입력하세요'} disabled={status === TODO_STATUS.READ} handleData={handleTodoInfoProperty} />
        </Div>
     );
}
 
export default TodoTitle;