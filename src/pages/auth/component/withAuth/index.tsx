import { ComponentType, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { Token } from "type/auth";
import { PAGE_URL } from "type/common";

export interface WithAuthType {
    token?: Token,
    handleToken?: (loginToken: string) => void,
};
const WithAuth = <P extends WithAuthType>(Component: ComponentType<P>): FC<any & Omit<P, keyof WithAuthType>> => {

    const Wrapper = (prop: any) => {

        const [token, setToken] = useState('');
        const handleToken = (loginToken: string) => {
            setToken(prev => loginToken);
        };

        const navigation = useNavigate();
        useEffect(() => {
            const storageToken = localStorage.getItem('token');
            if(token === "" && storageToken) handleToken(storageToken);
            else if(token === "" && !storageToken){
                alert('로그인 토큰이 만료되었습니다.');
                navigation(PAGE_URL.LOGIN);
            };
        },[token, navigation]);

        return <Component token={token} handleToken={handleToken} {...prop} />
    }

    return (
        Wrapper
    );
}

export default WithAuth;