import { FC } from "react";

// HOC
import WithAuth, { WithAuthType } from "pages/auth/component/withAuth";

// API
import { AUTH_API } from "api/auth";

const Header: FC<WithAuthType> = ({ handleToken }) => {

    const handleLogOut = () => {
        AUTH_API.logOut();
        handleToken('');
    };

    return (
        <>
            <div>Header</div>
            <button onClick={handleLogOut}>로그아웃</button>
        </>
    );
}

export default WithAuth(Header);