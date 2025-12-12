import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
  return await axiosInstance.post("/users/register", data);
};

export const logoutUser = async () =>{
  return await axiosInstance.post("/users/logout");
}

