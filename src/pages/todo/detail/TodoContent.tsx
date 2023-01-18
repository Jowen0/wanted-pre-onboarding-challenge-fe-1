import { FC } from "react";

// Type
import { TodoStatus, TODO_STATUS } from "type/todo";

// Component
import Div from "component/atom/Div";
import Textarea from "component/atom/Textarea";

interface TodoContentProps {
    content: string,
    status?: TodoStatus,
    handleTodoInfoProperty: (key: string, value: string) => void,
};
const TodoContent:FC<TodoContentProps> = ({content, status, handleTodoInfoProperty}) => {

    return ( 
        <Div display="flex" margin="20px 5px 5px 5px">
            <Textarea name="content" value={content} placeholder={'내용을 입력하세요'}  disabled={status === TODO_STATUS.READ} handleData={handleTodoInfoProperty} />
        </Div>
     );
}
 
export default TodoContent;