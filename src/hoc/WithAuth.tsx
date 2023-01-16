import { ComponentType, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { PAGE_URL } from "type/common";

// Hook
import { useToken } from "hook/common/useToken";

export interface WithAuthType {
    handleHasToken?: (hasToken: boolean) => void,
};
const WithAuth = <P extends WithAuthType>(Component: ComponentType<P>): FC<Omit<P, keyof WithAuthType>> => {

    const Wrapper = (prop: any) => {

        const { hasToken, handleHasToken, getTokenFromLocalStorage } = useToken(true);

        // 로그인 토큰 체크
        const navigation = useNavigate();
        const token = getTokenFromLocalStorage();
        useEffect(() => {
            if (!hasToken || !token) {
                alert('로그인 세션이 만료되었습니다');
                navigation(PAGE_URL.LOGIN);
            };
        }, [hasToken, navigation, token]);

        return token ? <Component handleHasToken={handleHasToken} {...prop} /> : null;
    };

    return (
        Wrapper
    );
}

export default WithAuth;