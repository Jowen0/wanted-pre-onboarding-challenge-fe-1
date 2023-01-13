import { FC, useCallback } from "react";

// API
import { AUTH_API } from "api/auth";

// Hook
import { useAuth } from "hook/auth/useAuth";
import { useToken } from "hook/common/useToken";
import { useTryCatch } from "hook/common/useTryCatch";

// Component
import Input from "component/atom/Input";
import Div from "component/atom/Div";
import Button from "component/atom/Button";
import Form from "component/atom/Form";

interface LoginProps {
    handleIsLogin: (value: boolean) => void,
    handleHasToken: (isToken: boolean) => void,
};
const Login: FC<LoginProps> = ({ handleIsLogin, handleHasToken }) => {

    // 로그인 정보
    const { authInfo, handleAuthInfo, isValidated } = useAuth();
    const { email, password } = authInfo;

    const { setTokenInLocalStorage } = useToken();

    // 로그인
    const { apiFn } = useTryCatch();
    const handleLogin = useCallback(async () => {

        const authResult = await apiFn(() => AUTH_API.login(authInfo), '로그인 에러!');
        if (authResult) {
            alert(authResult.message);
            setTokenInLocalStorage(authResult.token);
            handleHasToken(true);
        };
    }, [apiFn, authInfo, handleHasToken, setTokenInLocalStorage]);

    // 회원가입 컴포넌트로 변경
    const changeToSignUp = () => {
        handleIsLogin(false);
    };

    return (
        <Div width="70%" display="flex" justifyContent="center" padding="5% 15% 5% 15%" alignItems="normal">
            <Div margin="20% 0 0 0">
                <Form display="flex" justifyContent="center" flexDirection="column" onSubmit={() => console.log('')}>
                    <Div display="flex" justifyContent="center" flexDirection="column">
                        <Div width="20%">
                            <Input name={"email"} value={email} placeholder={"이메일을 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
                        </Div>
                        <Div width="20%">
                            <Input type={"password"} name={"password"} value={password} placeholder={"8자리 이상 패스워드를 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
                        </Div>
                    </Div>
                    <Div display="flex" justifyContent="center">
                        <Button text="로그인" width="100px" disabled={!isValidated} backgroundColor="#beffcc" onClick={handleLogin} />
                        <Button text="회원가입" width="100px" backgroundColor="#b0d6ff" onClick={changeToSignUp} />
                    </Div>
                </Form>
            </Div>
        </Div >
    );
}

export default Login;