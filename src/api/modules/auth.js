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