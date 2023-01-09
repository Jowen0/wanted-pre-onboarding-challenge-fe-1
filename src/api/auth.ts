import { useAxios } from "hook/useAxios";

// Type
import { AuthInfo } from "type/auth";

const signUp = (params: AuthInfo) => {

    const jsonParams = JSON.stringify(params);
    return useAxios.post(AUTH_URL.SING_UP, jsonParams);
};

const login = (params: AuthInfo) => {

    const jsonParams = JSON.stringify(params);
    return useAxios.post(AUTH_URL.LOGIN, jsonParams);
};

const logOut = () => {
    localStorage.removeItem('token');
};

export const AUTH_API = {
    signUp,
    login,
    logOut,
};

const AUTH_URL = {
    SING_UP: '/users/create',
    LOGIN: '/users/login',
};