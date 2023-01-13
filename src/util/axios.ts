import axios from "axios";

// Token Key
import { TOKEN_KEY } from "hook/common/useToken";

// Type
import { PAGE_URL } from "type/common";

export const axiosInstance = axios.create({
    headers: {
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json",
        // Authorization : `${localStorage.getItem(TOKEN_KEY)}`
    }
});

axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem(TOKEN_KEY);
        if (!(config.url?.includes('/login') || config.url?.includes('/create')) && !token) {
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
        if(error.message) alert(error.message)
        else return Promise.reject(error);
    }
);