import React, { useState } from "react";
import { addVehicle } from "../../api/vehicleApi.js";
import Navbar from "../../components/Navbar.jsx";
import { toast } from "react-toastify";
// import { AuthContext } from "../../context/AuthContext"; // only if using context
// import { AuthProvider } from "../../context/AuthProvider.jsx";

const AddVehicle = () => {
  // const { user } = useContext(AuthProvider) || {}; // get logged-in user if available
  const userId = localStorage.getItem("user");
  const user = JSON.parse(userId);

  const [vehicle, setVehicle] = useState({
    registrationNo: "",
    brand: "",
    model: "",
    fuelType: "",
    mileage: "",
    yearOfManufacture: "",
    lastServiceDate: "",
    nextServiceDate: "",
    insuranceExpiry: "",
    status: "active",
    ownerNotes: "",
    serviceHistory: [],
  });

  const [serviceEntry, setServiceEntry] = useState({
    date: "",
    description: "",
    cost: "",
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setServiceEntry({ ...serviceEntry, [e.target.name]: e.target.value });
  };

  const handleAddService = () => {
    if (!serviceEntry.date || !serviceEntry.description) {
      toast.error("Please fill date and description for service record");
      return;
    }
    setVehicle({
      ...vehicle,
      serviceHistory: [...vehicle.serviceHistory, serviceEntry],
    });
    setServiceEntry({ date: "", description: "", cost: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.id) {
      toast.error("User not logged in!");
      return;
    }

    try {
      const vehicleData = { ...vehicle, user_id: userId };

      const res = await addVehicle(vehicleData);

      toast.success(res.data.message || "Vehicle added successfully!");

      // reset form
      setVehicle({
        registrationNo: "",
        brand: "",
        model: "",
        fuelType: "",
        mileage: "",
        yearOfManufacture: "",
        lastServiceDate: "",
        nextServiceDate: "",
        insuranceExpiry: "",
        status: "active",
        ownerNotes: "",
        serviceHistory: [],
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add vehicle");
    }
  };

  const labelClass = "block text-sm font-semibold text-white mb-1";
  const inputClass = "outline-border-none w-full rounded-lg border-gray-300 border p-2.5 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  return (
    <div className="min-h-screen  bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white">Add New Vehicle</h2>
          <p className="mt-2 text-sm text-white">Enter the details below to register a new vehicle to your fleet.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8 space-y-8">
            
            {/* Section 1: Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-white border-b pb-2 mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Registration Number</label>
                  <input
                    type="text"
                    name="registrationNo"
                    placeholder="e.g. KA-01-AB-1234"
                    value={vehicle.registrationNo}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="e.g. Toyota"
                    value={vehicle.brand}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Model</label>
                  <input
                    type="text"
                    name="model"
                    placeholder="e.g. Innova"
                    value={vehicle.model}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Fuel Type</label>
                  <input
                    type="text"
                    name="fuelType"
                    placeholder="e.g. Diesel"
                    value={vehicle.fuelType}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Mileage (km/l)</label>
                  <input
                    type="number"
                    name="mileage"
                    placeholder="e.g. 15"
                    value={vehicle.mileage}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Year of Manufacture</label>
                  <input
                    type="number"
                    name="yearOfManufacture"
                    placeholder="e.g. 2022"
                    value={vehicle.yearOfManufacture}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    name="status"
                    value={vehicle.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="active">Active</option>
                    <option value="under_maintenance">Under Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Important Dates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Key Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Last Service Date</label>
                  <input
                    type="date"
                    name="lastServiceDate"
                    value={vehicle.lastServiceDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Next Service Date</label>
                  <input
                    type="date"
                    name="nextServiceDate"
                    value={vehicle.nextServiceDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Insurance Expiry</label>
                  <input
                    type="date"
                    name="insuranceExpiry"
                    value={vehicle.insuranceExpiry}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Service History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Service History</h3>
              <div className="p-6 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                  <div className="sm:col-span-3">
                    <label className={labelClass}>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={serviceEntry.date}
                      onChange={handleServiceChange}
                      className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className={labelClass}>Description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="e.g. Oil Change"
                      value={serviceEntry.description}
                      onChange={handleServiceChange}
                      className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Cost (₹)</label>
                    <input
                      type="number"
                      name="cost"
                      placeholder="0"
                      value={serviceEntry.cost}
                      onChange={handleServiceChange}
                      className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900 text-sm font-medium transition"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {vehicle.serviceHistory.length > 0 && (
                  <div className="mt-4 space-y-2">
                     <p className="text-xs font-semibold text-gray-500 uppercase">Added Records</p>
                    {vehicle.serviceHistory.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm">
                          <span className="font-semibold text-gray-900">{s.date}</span>
                          <span className="text-gray-600">{s.description}</span>
                        </div>
                        <span className="font-bold text-green-600 text-sm">₹{s.cost}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Notes */}
            <div>
              <label className={labelClass}>Additional Notes</label>
              <textarea
                name="ownerNotes"
                placeholder="Any specific details about the vehicle..."
                value={vehicle.ownerNotes}
                onChange={handleChange}
                className={`${inputClass} min-h-[100px]`}
                rows="3"
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div className=" px-8 py-5 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-md"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;