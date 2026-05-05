import axiosClient from "./axiosClient";

export const getRecipes = (params) => {
    return axiosClient.get("/Recipe", { params });   
}
export const getRecipeById = (id) => {
    return axiosClient.get(`/Recipe/${id}`);   
}
export const createRecipe = (body) => {
    return axiosClient.post("/Recipe", body);   
}
export const deleteRecipe = (id) => {
    return axiosClient.delete(`/Recipe/${id}`);   
}
export const updateRecipe = (body, id) => {
    return axiosClient.put(`/Recipe/${id}`, body);   
}