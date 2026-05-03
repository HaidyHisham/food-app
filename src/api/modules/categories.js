import axiosClient from "./axiosClient";

export const getCategories = (params) => {
    return axiosClient.get("/Category", { params });   
}
export const getCategoryById = (id) => {
    return axiosClient.get(`/Category/${id}`);   
}
export const postCategory = (body) => {
    return axiosClient.post("/Category", body);   
}
export const deleteCategory = (id) => {
    return axiosClient.delete(`/Category/${id}`);   
}
export const editCategory = (body, id) => {
    return axiosClient.put(`/Category/${id}`, body);   
}