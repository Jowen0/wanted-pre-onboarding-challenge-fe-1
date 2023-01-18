import { useMutation } from "@tanstack/react-query";

// Util
import { axiosInstance } from "util/axios";

// Hook
import { useToken } from "hook/common/useToken";

// Type
import { AuthInfo, AuthResult } from "type/auth";

export const useSignUp = () => {

    const { setTokenInLocalStorage } = useToken();

    return useMutation({
        mutationFn: (params: AuthInfo) => signUp(params),
        onSuccess(data) {
            alert(data.message);
            setTokenInLocalStorage(data.token);
            return true;
        },
    });
};

const signUp = (params: AuthInfo): Promise<AuthResult> => {

    return axiosInstance.post(AUTH_URL.SING_UP, params).then(res => res.data);
};

export const useLogin = () => {

    const { setTokenInLocalStorage } = useToken();

    return useMutation({
        mutationFn: (params: AuthInfo) => login(params),
        onSuccess(data) {
            alert(data.message);
            setTokenInLocalStorage(data.token);
            return true;
        },
    });
};

const login = (params: AuthInfo): Promise<AuthResult> => {

    return axiosInstance.post(AUTH_URL.LOGIN, params).then(res => res.data);
};

export const AUTH_API = {
    signUp,
    login,
};

export const AUTH_URL = {
    SING_UP: '/users/create',
    LOGIN: '/users/login',
};