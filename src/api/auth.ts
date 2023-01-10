import { useAxios } from "hook/useAxios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Type
import { AuthInfo } from "type/auth";
import { PAGE_URL } from "type/common";

const signUp = (params: AuthInfo) => {

    return useAxios.post(AUTH_URL.SING_UP, params);
};

const login = (params: AuthInfo) => {

    return useAxios.post(AUTH_URL.LOGIN, params);
};

const logOut = () => {
    localStorage.removeItem('token');
};

const useCheckToken = () => {

    const navigation = useNavigate();
    return useCallback(() => {
        const token = localStorage.getItem('token') || '';
        if (!token) {
            alert('로그인 토큰이 만료되었습니다.');
            navigation(PAGE_URL.LOGIN);
        };
        return token;
    },[navigation]);
};

export const AUTH_API = {
    signUp,
    login,
    logOut,
    useCheckToken,
};

const AUTH_URL = {
    SING_UP: '/users/create',
    LOGIN: '/users/login',
};