import axiosInstance from "./axiosInstance";

export const vehicleApi = async () => {
 
  return await axiosInstance.get("/vehicles/allVehicles", {
  });
};

export const addVehicle = async (vehicle) => { 
    return await axiosInstance.post("/vehicles/",vehicle
    );
};