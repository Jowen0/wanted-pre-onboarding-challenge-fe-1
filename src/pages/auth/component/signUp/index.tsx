import { FC } from "react";

// API
import { AUTH_API } from "api/auth";

// Hook
import { useAuth } from "pages/auth/hook/useAuth";

// Type
import { AuthResult } from "type/auth";

// Component
import Input from "pages/common/atom/Input";

interface SignUpProps {
    handleToken: (token: string) => void,
};
const SignUp: FC<SignUpProps> = ({ handleToken }) => {

    // 회원가입 정보
    const { authInfo, handleAuthInfo, validateAuthInfo } = useAuth();
    const { email, password } = authInfo;

    // 회원가입
    const handleSignUp = async () => {

        // 회원가입 정보 유효성검사
        if(validateAuthInfo(true)) return;

        try {
            const outPut: AuthResult = await AUTH_API.signUp(authInfo);
            alert(outPut.message);
            localStorage.setItem('token', outPut.token);
            handleToken(outPut.token);
        }
        catch (error) {
            alert('회원가입 에러!');
            console.log(error);
        };
    };

    return (
        <div>
            <form>
                <Input name={"email"} value={email} placeholder={"이메일을 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
                <Input type={"password"} name={"password"} value={password} placeholder={"패스워드를 입력하세요"} autoComplete={"off"} handleData={handleAuthInfo} />
            </form>
            <div>
                <button onClick={handleSignUp}>회원가입</button>
            </div>
        </div>
    );
}

export default SignUp;