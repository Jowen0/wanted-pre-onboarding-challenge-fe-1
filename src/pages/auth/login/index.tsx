import { FC, useCallback } from "react";

// API
import { useLogin } from "api/auth";

// Hook
import { useAuth } from "hook/auth/useAuth";
import useKeyboardEvent from "hook/common/useKeyboardEvent";

// Component
import Input from "component/atom/Input";
import Div from "component/atom/Div";
import Button from "component/atom/Button";
import Form from "component/atom/Form";
import Span from "component/atom/Span";

interface LoginProps {
    handleIsLogin: (value: boolean) => void,
    handleHasToken: (isToken: boolean) => void,
};
const Login: FC<LoginProps> = ({ handleIsLogin, handleHasToken }) => {

    // 로그인 정보
    const { authInfo, handleAuthInfo, isEmail, isPassword } = useAuth();
    const isLoginBtnEnable = isEmail && isPassword;

    // 로그인
    const loginMutation = useLogin();
    const handleLogin = useCallback(async () => {

        const resAuth = await loginMutation.mutateAsync(authInfo);
        if (resAuth) handleHasToken(true);

    }, [loginMutation, authInfo, handleHasToken]);
    
    // 회원가입 컴포넌트로 변경
    const changeToSignUp = () => {
        handleIsLogin(false);
    };

    // Enter Key 이벤트 등록
    useKeyboardEvent('Enter', () => {
        if (isLoginBtnEnable) handleLogin();
    });

    return (
        <Div width="70%" display="flex" justifyContent="center" padding="5% 15% 5% 15%" alignItems="normal">
            <Div margin="20% 0 0 0">
                <Form display="flex" justifyContent="center" flexDirection="column" method="post" onSubmit={e => e.preventDefault()} >
                    <Div display="flex" justifyContent="center" flexDirection="column">
                        <Div width="20%">
                            <Input
                                name={"email"}
                                value={authInfo.email}
                                placeholder={"이메일을 입력하세요"}
                                autoComplete={"off"}
                                handleData={handleAuthInfo}
                            />
                            {!isEmail && <Span text="이메일 형식을 입력해주세요" color="red" fontSize="11px" padding="0 0 0 10px" />}
                        </Div>
                        <Div width="20%">
                            <Input
                                type={"password"}
                                name={"password"}
                                value={authInfo.password}
                                placeholder={"패스워드를 입력하세요"}
                                autoComplete={"off"}
                                handleData={handleAuthInfo}
                            />
                            {!isPassword && <Span text="8자리 이상 패스워드를 입력하세요" color="red" fontSize="11px" padding="0 0 0 10px" />}
                        </Div>
                    </Div>
                    <Div display="flex" justifyContent="center">
                        <Button text="로그인" width="100px" disabled={!isLoginBtnEnable} backgroundColor="#beffcc" onClick={handleLogin} />
                        <Button text="회원가입" width="100px" backgroundColor="#b0d6ff" onClick={changeToSignUp} />
                    </Div>
                </Form>
            </Div>
        </Div >
    );
}

export default Login;