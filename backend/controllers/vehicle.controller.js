import Vehicle from "../models/Vehicle.js"

export const createVehicle = async (req, res) => {
  try {
    
    console.log(req.body)
    const userId = req.user?.id;

    if(!userId)
      res.send({
        status : false,
        message : "Invalid user",
  
      })

    const vehicle = await new Vehicle({
      ...req.body,
      user_id : userId
    })

    await vehicle.save();
    console.log(req.body);

    const populateVehicle = await vehicle.populate("user_id", "name email");
    res.status(201).json(
    {
      message : "Vehicle added successfully",
      vehicle : populateVehicle    
    }
    );
  } catch (err) {
     console.error("Error creating vehicle:", err);
    res.status(500).json({
      status: false,
      message: "Server error while creating vehicle",
      error: err.message
  })
}
}

export const getAllVehicle = async (req, res) => {
  try {

    const userId = req.user?.id;   

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const vehicles = await Vehicle.find({ user_id: userId })
      .populate("user_id", "name email");

    console.log("Vehicles found:", vehicles);
    res.json(vehicles);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVehichleById =  async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("user_id", "name email");
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updateVehicle =  async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const deleteVehicle =  async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ msg: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}