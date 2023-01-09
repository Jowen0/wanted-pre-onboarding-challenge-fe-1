import { useState } from "react";

// Type
import { AuthInfo } from "type/auth";

export const useAuth = () => {

    // 이메일/비밀번호
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        email: '',
        password: '',
    });
    const { email, password } = authInfo;

    // 이메일/비밀번호 입력
    const handleAuthInfo = (key: string, value: string) => {
        setAuthInfo(prev => ({ ...prev, [key]: value }));
    };

    // 이메일/비밀번호 유효성검사
    const validateAuthInfo = (isSignUp: boolean) => {

        let res = true;
        const reg = /@|,/g;
        if (email === "") alert("이메일을 입력해주세요");
        else if (password === "" || password.length < 8) alert("비밀번호를 8자리 이상 입력해주세요");
        else if (isSignUp && !reg.test(password)) alert("비밀번호에 '@', '.'을 포함해주세요");
        else res = false;
        return res;
    };

    return {
        authInfo,
        handleAuthInfo,
        validateAuthInfo,
    };
};