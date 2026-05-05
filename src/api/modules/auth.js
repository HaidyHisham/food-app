import axiosClient from "./axiosClient";

export const changePassword = (body) => {
    return axiosClient.put(`/Users/ChangePassword`, body);   
}