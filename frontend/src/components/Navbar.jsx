import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logoutUser } from "../api/userapi";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = localStorage.getItem("user");
    if (getName) {
      const parsed = JSON.parse(getName);
      setName(parsed?.user?.name || parsed?.name || "");
    }
  }, []);

  const handleLogout = async () => {
    try {
         const res = await logoutUser();
         console.log(res);
         toast.success(res.data.msg || "User logged out")
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 shadow-md h-[70px] flex items-center justify-between px-8">
   
      <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
        🚗 <span className="text-white">VehicleZone</span>
      </h2>

      {/* Navigation NavLinks */}
      <nav className="flex gap-8 text-gray-200 font-medium">
        <NavLink
          to="/"
        className={({ isActive }) =>
          `px-3 text-center py-3 rounded-lg font-medium transition-all duration-200
          ${isActive
            ? "bg-yellow-200 shadow-md "
            : ""}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
          ` px-3 text-center py-3 rounded-lg font-medium transition-all duration-200
          ${isActive
            ? "bg-yellow-200  shadow-md "
            : ""}`}
        >
          Vehicles
        </NavLink>
        <NavLink
          to="/add-vehicle"
          className={({ isActive }) =>
          `px-3 text-center py-3 rounded-lg font-medium transition-all duration-200
          ${isActive
            ? "bg-yellow-200 shadow-md"
            : ""}`}
        >
          Add Vehicle
        </NavLink>
      </nav>

      <div className="flex items-center gap-5">
        <h3 className="text-white text-lg font-semibold">
          Welcome, <span className="text-indigo-400">{name}</span>
        </h3>
        <button
          onClick={handleLogout}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
