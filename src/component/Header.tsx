import { FC } from "react";

// HOC
import WithAuth from "hoc/WithAuth";

// Type
import { WithAuthType } from "hoc/WithAuth";

// API
import { AUTH_API } from "api/auth";

// Hook
import { useToken } from "hook/common/useToken";

// Component
import Div from "./atom/Div";
import Button from "./atom/Button";

const Header: FC<WithAuthType> = ({ handleHasToken }) => {

    const { removeTokenInLocalSotrage } = useToken();

    const handleLogOut = () => {
        if (handleHasToken && AUTH_API.logOut()) {
            removeTokenInLocalSotrage();
            handleHasToken(false);
        };
    };

    return (
        <Div width="85%" display="flex" justifyContent="end" padding="20px 0 0 0">
            <span>게으름뱅이님 안녕하세요</span>
            <Button color="#fff" backgroundColor="#003366" onClick={handleLogOut} text='로그아웃' />
        </Div>
    );
}

export default WithAuth(Header);