import { ComponentType, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { PAGE_URL } from "type/common";

// Hook
import { useToken } from "hook/common/useToken";

export interface WithAuthType {
    handleHasToken?: (hasToken: boolean) => void,
};
const WithAuth = <P extends WithAuthType>(Component: ComponentType<P>): FC<any & Omit<P, keyof WithAuthType>> => {

    const Wrapper = (prop: any) => {

        const { hasToken, handleHasToken, getTokenFromLocalStorage } = useToken(true);

        // 로그인 토큰 체크
        const navigation = useNavigate();
        useEffect(() => {
            if (!hasToken && !getTokenFromLocalStorage()) {
                alert('로그인 세션이 만료되었습니다');
                navigation(PAGE_URL.LOGIN);
            };
        }, [hasToken, navigation, getTokenFromLocalStorage]);

        return <Component handleHasToken={handleHasToken} {...prop} />
    };

    return (
        Wrapper
    );
}

export default WithAuth;