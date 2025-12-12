import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { email, password });
      login(res.data.user);
      toast.success(res.data.msg || "Login successfully");
      
      setTimeout(()=>{
        navigate("/");
      }, 2000)
      
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed")
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
    <div className="bg-gray-600 rounded-xl p-1 gap-4 h-[55%] w-[30%] flex flex-col items-center justify-center">
      <h2 className="text-[40px] font-semibold text-orange-100">Login</h2>
      <form onSubmit={handleSubmit} className="bg-gray-500 rounded-xl h-[60%] w-[80%] flex flex-col p-3 justify-evenly">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[25%] p-3 border border-black rounded-xl focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[25%] p-3 border border-black rounded-xl focus:outline-none"
        />
        <button type="submit" className="h-[20%] p-3 border border-black rounded-xl focus:outline-none ">Login</button>
        <p className="text-black ml-2 font-semibold ">Not have an account? <NavLink to = "/register" className= "font-semibold text-blue-900">Click to register</NavLink></p>
      </form>
      <h6 className="text-md text-black font-light">Get your Vehicle detail from <span className="text-yellow-400">VehicleZone</span></h6>
    </div>
    </div>
  );
}
