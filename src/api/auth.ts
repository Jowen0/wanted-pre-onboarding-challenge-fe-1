// Util
import { axiosInstance } from "util/axios";

// Type
import { AuthInfo, AuthResult } from "type/auth";

const signUp = async (params: AuthInfo): Promise<AuthResult> => {

    const res = await axiosInstance.post(AUTH_URL.SING_UP, params);
    return res.data;
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

const AUTH_URL = {
    SING_UP: '/users/create',
    LOGIN: '/users/login',
};