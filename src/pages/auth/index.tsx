import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { PAGE_URL } from "type/common";

// Component
import Login from "./login";
import SignUp from "./signUp";
import { useToken } from "../../hook/common/useToken";

const AuthContainer = () => {

    // 로그인 페이지 여부 확인
    const [isLogin, setIsLogin] = useState(true);
    const handleIsLogin = useCallback((value: boolean) => {
        setIsLogin(prev => value);
    }, [setIsLogin]);

    // 토큰
    const { hasToken, handleHasToken, getTokenFromLocalStorage } = useToken();
    
    // 토큰 존재할 시 리다이렉트
    const navigation = useNavigate();
    useEffect(() => {
        if (hasToken || getTokenFromLocalStorage()) navigation(PAGE_URL.TODO);
    }, [navigation, hasToken, getTokenFromLocalStorage]);

    return (
        isLogin ? <Login handleIsLogin={handleIsLogin} handleHasToken={handleHasToken} /> : <SignUp handleIsLogin={handleIsLogin} handleHasToken={handleHasToken} />
    );
}

export default AuthContainer;