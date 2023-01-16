import { useQuery, useMutation } from "@tanstack/react-query";

// Util
import { axiosInstance } from "util/axios";

// Type
import { AuthInfo, AuthResult } from "type/auth";

export const useSignUp = () => {
    return useMutation({
        mutationFn: (params: AuthInfo) => signUp(params),
    });
};

const signUp = async (params: AuthInfo): Promise<AuthResult> => {

    const res = await axiosInstance.post(AUTH_URL.SING_UP, params);
    return res.data;
};

export const useLogin = (params: AuthInfo) => {
    return useQuery({
        queryKey: AUTH_KEY.LOGIN,
        queryFn: () => login(params),
        enabled: false,
    });
};

const login = async (params: AuthInfo): Promise<AuthResult> => {

    const res = await axiosInstance.post(AUTH_URL.LOGIN, params);
    return res.data;
};

const logOut = () => {
    return true;
};

export const AUTH_API = {
    signUp,
    login,
    logOut,
};

export const AUTH_URL = {
    SING_UP: '/users/create',
    LOGIN: '/users/login',
};

const AUTH_KEY = {
    LOGIN: ['login'],
};