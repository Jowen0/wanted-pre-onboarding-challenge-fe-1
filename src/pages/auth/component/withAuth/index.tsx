import { ComponentType, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "type/auth";
import { PAGE_URL } from "type/common";

export interface WithAuthType {
    token: Auth,
    handleToken: (loginToken: string) => void,
};
const WithAuth = <P extends WithAuthType>(Component: ComponentType<P>): FC<any & Omit<P, keyof WithAuthType>> => {

    const Wrapper = (prop: any) => {

        const [token, setToken] = useState('');
        const handleToken = (loginToken: string) => {
            setToken(prev => loginToken);
        };

        const storageToken = localStorage.getItem('token');
        const navigation = useNavigate();
        useEffect(() => {
            if(!storageToken) navigation(PAGE_URL.LOGIN);
            else if(token === "" && storageToken) handleToken(storageToken);
        },[token, storageToken, navigation]);

        return <Component token={token} handleToken={handleToken} {...prop} />
    }

    return (
        Wrapper
    );
}

export default WithAuth;