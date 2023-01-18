import axios, { AxiosError } from "axios";

// Token Key
import { TOKEN_KEY } from "hook/common/useToken";

// Type
import { AUTH_URL } from "api/auth";
import { PAGE_URL } from "type/common";

export const axiosInstance = axios.create({
    headers: {
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem(TOKEN_KEY);
        if (!(config.url?.includes(AUTH_URL.LOGIN) || config.url?.includes(AUTH_URL.SING_UP)) && !token) {
            window.location.pathname = PAGE_URL.LOGIN;
            throw Error('로그인 세션이 만료되었습니다.');
        };

        //@ts-expect-error
        config.headers.Authorization = token;

        return config;
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error instanceof Error && error.name !== 'AxiosError') alert(error.message)
        else if (error instanceof AxiosError && error.response?.data?.details) alert(error.response?.data?.details);
        return Promise.reject(error);
    }
);