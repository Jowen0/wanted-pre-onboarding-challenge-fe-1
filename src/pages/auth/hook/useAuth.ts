import { useCallback, useEffect, useState } from "react";

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
    const validateAuthInfo = useCallback(() => {

        let res = false;
        const reg = /[0-9a-zA-Z]@[a-z].[a-z]{2,3}/;

        if (email === "" || !reg.test(email)) res = true;
        else if (password === "" || password.length < 8) res = true;

        return res;
    }, [email, password]);

    const [isValidated, setIsValidated] = useState(false);
    useEffect(() => {
        if(!validateAuthInfo()) {
            setIsValidated(true);
        }
    },[validateAuthInfo])

    return {
        authInfo,
        handleAuthInfo,
        isValidated,
    };
};