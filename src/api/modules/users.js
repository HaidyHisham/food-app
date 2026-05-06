import axiosClient from "./axiosClient";

export const getUsers = (params) => {
    return axiosClient.get("/Users",{params});   
}
export const getUserById = (id) => {
    return axiosClient.get(`/Users/${id}`);   
}

export const createUser=(userData)=>{
  return axiosClient.post("/Users/register",userData);   
}

export const updateUser=(id,userData)=>{
  return axiosClient.put(`/Users/${id}`,userData);   
}
