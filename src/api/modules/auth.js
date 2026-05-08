import axiosClient from "./axiosClient";


export const registerApi = (body) => {
    return axiosClient.post(`/Users/register`, body);   
}

export const verify = (body) => {
    return axiosClient.put(`/Users/verify`, body);   
}

export const login = (body) => {
    return axiosClient.post(`/Users/login`, body);   
}

export const changePassword = (body) => {
    return axiosClient.put(`/Users/ChangePassword`, body);   
}
export const requestReset = (body) => {
    return axiosClient.post(`/Users/Reset/Request`, body);   
}
export const reset = (body) => {
    return axiosClient.put(`/Users/Reset`, body);   
}