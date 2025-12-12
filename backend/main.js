import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import { connectDb } from "./database/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);

const port = process.env.PORT || 5000;

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server running successfully on port ${port}`);
    })

    app.on("error",(error)=>{
        console.log(`Error in running server`,error);
    })
})
.catch((error)=>{
    console.log("Error in connecting Mongodb database",error);
})
