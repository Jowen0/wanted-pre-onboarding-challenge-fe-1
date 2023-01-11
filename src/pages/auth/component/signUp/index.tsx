import { FC, useCallback } from "react";

// API
import { AUTH_API } from "api/auth";

// Hook
import { useAuth } from "pages/auth/hook/useAuth";
import { useToken } from "hook/useToken";
import { useTryCatch } from "hook/useTryCatch";

// Component
import Input from "component/atom/Input";

interface SignUpProps {
    handleIsLogin: (value: boolean) => void,
    handleHasToken: (idToken: boolean) => void,
};
const SignUp: FC<SignUpProps> = ({ handleIsLogin, handleHasToken }) => {

    // 회원가입 정보
    const { authInfo, handleAuthInfo, isValidated } = useAuth();
    const { email, password } = authInfo;

    const { setTokenInLocalStorage } = useToken();

    // 회원가입
    const { apiFn } = useTryCatch();
    const handleSignUp = useCallback(async () => {

        const authResult = await apiFn(() => AUTH_API.signUp(authInfo), '회원가입 에러!');
        if (authResult) {
            alert(authResult.message);
            setTokenInLocalStorage(authResult.token);
            handleHasToken(true);
        };
    }, [apiFn, authInfo, handleHasToken, setTokenInLocalStorage]);

    return (
        <div>
            <form>
                <Input name={"email"} value={email} placeholder={"이메일을 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
                <Input type={"password"} name={"password"} value={password} placeholder={"8자리 이상 패스워드를 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
            </form>
            <div>
                <button onClick={() => handleIsLogin(true)}>이전</button>
                <button disabled={!isValidated} onClick={handleSignUp}>회원가입</button>
            </div>
        </div>
    );
}

export default SignUp;