import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});
const axiosConfig = {
    headers: {
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json",
    },
};

const get = async (url: string, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axiosInstance.get(url, config);
    return JSON.parse(res.data);
};

const post = async <T extends {}>(url: string, params: T, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axiosInstance.post(url, JSON.stringify(params), config);
    return JSON.parse(res.data);
};

const put = async <T extends {}>(url: string, params: T, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axiosInstance.put(url, JSON.stringify(params), config);
    return JSON.parse(res.data);
};

const del = async (url: string, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axiosInstance.delete(url, config);
    return JSON.parse(res.data);
};

export const useAxios = {
    get,
    post,
    put,
    del,
};