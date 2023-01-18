import { useState } from "react";

// Type
import { AuthInfo } from "type/auth";

// Util
import { validateEmail, validatePassword } from "util/validation";

export const useAuth = () => {

    // 이메일/비밀번호
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        email: '',
        password: '',
    });

    // 이메일/비밀번호 입력
    const handleAuthInfo = (key: string, value: string) => {
        setAuthInfo(prev => ({ ...prev, [key]: value }));
    };

    const isEmail = validateEmail(authInfo.email);
    const isPassword = validatePassword(authInfo.password);

    return {
        authInfo,
        handleAuthInfo,
        isEmail,
        isPassword,
    };
};