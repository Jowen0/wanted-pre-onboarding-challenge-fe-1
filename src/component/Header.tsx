import { FC } from "react";
import { useNavigate } from "react-router-dom";

// Hook
import { useToken } from "hook/common/useToken";

// Type
import { PAGE_URL } from "type/common";

// Component
import Div from "./atom/Div";
import Button from "./atom/Button";

const Header: FC = () => {

    const { removeTokenInLocalSotrage } = useToken();
    const navigation = useNavigate();

    const handleLogOut = () => {
        removeTokenInLocalSotrage();
        alert('로그아웃 되었습니다.');
        navigation(PAGE_URL.LOGIN);
    };

    return (
        <Div width="85%" display="flex" justifyContent="end" padding="20px 0 0 0">
            <span>게으름뱅이님 안녕하세요</span>
            <Button width="100px" color="#fff" backgroundColor="#003366" onClick={handleLogOut} text='로그아웃' />
        </Div>
    );
}

export default Header;