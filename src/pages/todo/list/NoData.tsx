// Component
import Div from "component/atom/Div";
import Span from "component/atom/Span";

const NoData = () => {

    return ( 
        <Div display="flex" justifyContent="center">
            <Span 
                text="할 일 목록이 없네요. 얼른 등록해주세요!"
                fontSize="20px"
                textAlign="center"
            />
        </Div>
     );
}
 
export default NoData;