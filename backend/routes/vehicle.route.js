import express from "express";
import Vehicle from "../models/Vehicle.js";
import auth from "../middlewares/auth.js";
import { createVehicle, deleteVehicle, getAllVehicle, getVehichleById, updateVehicle } from "../controllers/vehicle.controller.js";

const router = express.Router();

// Create vehicle
router.post("/", auth, createVehicle);

// Get all vehicles
router.get("/allVehicles",auth, getAllVehicle);

// Get single vehicle
router.get("/:id", auth, getVehichleById);

// Update vehicle
router.put("/:id", auth, updateVehicle);

// Delete vehicle
router.delete("/:id", auth, deleteVehicle);

export default router;
