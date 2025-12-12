import mongoose from "mongoose";


const vehicleSchema = new mongoose.Schema({
  user_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  registrationNo: { type: String, required: true, unique: true },
  brand: String,
  model: { type: String, required: true },
  fuelType: { type: String, required: true },
  mileage: { type: Number, required: true },
  yearOfManufacture: Number,
  lastServiceDate: Date,
  nextServiceDate: Date,
  insuranceExpiry: Date,
  status: {
    type: String,
    enum: ["active", "under_maintenance", "retired"],
    default: "active",
  },
  ownerNotes: String,
  serviceHistory: [
    {
      date: Date,
      description: String,
      cost: Number,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
