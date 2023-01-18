import { FC, useCallback } from "react";

// API
import { useSignUp } from "api/auth";

// Hook
import { useAuth } from "hook/auth/useAuth";
import useKeyboardEvent from "hook/common/useKeyboardEvent";

// Component
import Input from "component/atom/Input";
import Div from "component/atom/Div";
import Button from "component/atom/Button";
import Form from "component/atom/Form";
import Span from "component/atom/Span";


interface SignUpProps {
    handleIsLogin: (value: boolean) => void,
    handleHasToken: (idToken: boolean) => void,
};
const SignUp: FC<SignUpProps> = ({ handleIsLogin, handleHasToken }) => {

    // 회원가입 정보
    const { authInfo, handleAuthInfo, isEmail, isPassword } = useAuth();
    const isSignUpBtnEnable = isEmail && isPassword;

    // 회원가입
    const signUpMutation = useSignUp();
    const handleSignUp = useCallback(async () => {

        const authResult = await signUpMutation.mutateAsync(authInfo);
        if (authResult) handleHasToken(true);

    }, [signUpMutation, authInfo, handleHasToken]);

     // Enter Key 이벤트 등록
     useKeyboardEvent('Enter', () => {
        if (isSignUpBtnEnable) handleSignUp();
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
                        <Button text="이전" width="100px" backgroundColor="#fa8b8b" onClick={() => handleIsLogin(true)} />
                        <Button text="회원가입" width="100px" disabled={!isSignUpBtnEnable} backgroundColor="#b0d6ff" onClick={handleSignUp} />
                    </Div>
                </Form>
            </Div>
        </Div>
    );
}

export default SignUp;