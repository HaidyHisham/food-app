import axiosClient from "./axiosClient";

export const getAllTags = () => {
   return axiosClient.get("/tag/");
}
