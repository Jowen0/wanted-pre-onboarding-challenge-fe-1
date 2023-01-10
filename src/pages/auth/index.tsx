import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { PAGE_URL } from "type/common";

// Component
import Login from "./component/login";
import SignUp from "./component/signUp";

const Auth = () => {

    // 로그인 페이지 여부 확인
    const [isLogin, setIsLogin] = useState(true);
    const handleIsLogin = useCallback((value: boolean) => {
        setIsLogin(prev => value);
    }, [setIsLogin]);

    // 토큰 존재할 시 리다이렉트
    const [token, setToken] = useState('');
    const handleToken = (token: string) => {
        setToken(token);
    };

    const navigation = useNavigate();
    useEffect(() => {
        if (token || localStorage.getItem('token')) navigation(PAGE_URL.TODO);
    }, [navigation, token]);

    return (
        isLogin ? <Login handleIsLogin={handleIsLogin} handleToken={handleToken} /> : <SignUp handleIsLogin={handleIsLogin} handleToken={handleToken} />
    );
}

export default Auth;