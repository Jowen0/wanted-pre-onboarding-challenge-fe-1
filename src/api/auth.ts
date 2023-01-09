import { useAxios } from "hook/useAxios";

// Type
import { AuthInfo } from "type/auth";

const signUp = (params: AuthInfo) => {

    return useAxios.post(AUTH_URL.SING_UP, params);
};

const login = (params: AuthInfo) => {

    return useAxios.post(AUTH_URL.LOGIN, params);
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