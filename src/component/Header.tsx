import { FC } from "react";

// HOC
import WithAuth from "hoc/withAuth";

// Type
import { WithAuthType } from "hoc/withAuth";

// API
import { AUTH_API } from "api/auth";

// Hook
import { useToken } from "hook/useToken";

const Header: FC<WithAuthType> = ({ handleHasToken }) => {

    const { removeTokenInLocalSotrage } = useToken();

    const handleLogOut = () => {
        if (handleHasToken && AUTH_API.logOut()) {
            removeTokenInLocalSotrage();
            handleHasToken(false);
        };
    };

    return (
        <>
            <div>Header</div>
            <button onClick={handleLogOut}>로그아웃</button>
        </>
    );
}

export default WithAuth(Header);