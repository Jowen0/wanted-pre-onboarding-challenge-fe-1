import { FC } from "react";

// API
import { AUTH_API } from "api/auth";

// Hook
import { useAuth } from "pages/auth/hook/useAuth";

// Type
import { AuthResult } from "type/auth";

// Component
import Input from "pages/common/atom/Input";

interface LoginProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
    handleToken: (token: string) => void,
};
const Login: FC<LoginProps> = ({ setIsLogin, handleToken }) => {

    // 로그인 정보
    const { authInfo, handleAuthInfo, isValidated } = useAuth();
    const { email, password } = authInfo;

    // 로그인
    const handleLogin = async () => {

        try {
            const outPut: AuthResult = await AUTH_API.login(authInfo);
            alert(outPut.message);
            localStorage.setItem('token', outPut.token);
            handleToken(outPut.token);
        }
        catch (error) {
            alert('로그인 에러!')   ;
            console.log(error);
        };
    };

    // 회원가입 컴포넌트로 변경
    const changeToSignUp = () => {
        setIsLogin(prev => false);
    };

    return (
        <div>
            <form>
                <Input name={"email"} value={email} placeholder={"이메일을 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
                <Input type={"password"} name={"password"} value={password} placeholder={"8자리 이상 패스워드를 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
            </form>
            <div>
                <button disabled={!isValidated} onClick={handleLogin}>로그인</button>
                <button onClick={changeToSignUp}>회원가입</button>
            </div>
        </div>
    );
}

export default Login;