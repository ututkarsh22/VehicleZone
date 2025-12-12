import React, { useState } from "react";
import { registerUser } from "../../api/userapi.js";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "driver", // default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      toast.success(res.data.msg || "User registered successfully!")
      setFormData({ name: "", email: "", password: "", role: "driver" });
      navigate("/")
      
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed")
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center text-center ">
    <div className="h-[75%] max-w-lg mx-auto p-6 flex flex-col justify-between shadow-lg rounded-xl gap-3 bg-gray-700 ">
      <h2 className="text-4xl font-bold text-orange-100">Register User</h2>
       <form onSubmit={handleSubmit} className="space-y-4 mt-3 h-[85%] bg-gray-500 p-6 rounded-2xl">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full h-[15%] p-2 border border-black rounded-lg focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-[15%] p-2 border border-black rounded-lg focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-[15%] p-2 border border-black rounded-lg focus:outline-none"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full h-[15%] p-2 border border-black rounded-lg focus:outline-none"
        >
          <option value="driver">Driver</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full h-[15%] bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600"
        >
          Register
        </button>
         <p className="text-black  font-semibold ">Already have an account? <NavLink to = "/login" className= "font-semibold text-blue-900">Click to login</NavLink></p>
      </form>
       <h6 className="text-md mt-1 text-black font-light">Get your Vehicle detail from <span className="text-yellow-400">VehicleZone</span></h6>
    </div>
    </div>
  );
};

export default Register;
