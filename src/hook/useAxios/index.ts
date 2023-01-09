import axios from "axios";

const axiosConfig = {
    headers: {
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json",
    },
};

const get = async (url: string, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axios.get(url, config);
    return res.data;
};

const post = async <T extends {}>(url: string, params: T, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axios.post(url, JSON.stringify(params), config);
    return res.data;
};

const put = async <T extends {}>(url: string, params: T, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axios.put(url, JSON.stringify(params), config);
    return res.data;
};

const del = async (url: string, authorization?: string) => {

    const config = authorization ? { headers: { ...axiosConfig.headers, Authorization: authorization } } : axiosConfig;
    const res = await axios.delete(url, config);
    return res.data;
};

export const useAxios = {
    get,
    post,
    put,
    del,
};