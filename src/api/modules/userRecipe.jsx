import axiosClient from "./axiosClient";

export const getFavList = () => {
    return axiosClient.get("/UserRecipe/");   
}

export const addFav = (id) => {
    return axiosClient.post("/UserRecipe/", {"recipeId":id});   
}
export const deleteFav = (id) => {
    return axiosClient.delete(`/UserRecipe/${id}`);   
}
