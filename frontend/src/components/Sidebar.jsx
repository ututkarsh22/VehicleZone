import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  
 

  return (
    <div className="bg-gradient-to-r from-gray-700 to-white  w-[20%] relative flex flex-col items-center pt-[8%] p-2 space-y-8">
     
      <Link to={"/"} className="border rounded-xl bg-gradient-to-r from-slate-400 via-indigo-950 to-blue-200  border-black w-full py-4 text-2xl px-10 text-center">Dashboard</Link>
      <Link to={"/vehicles"} className="border bg-gradient-to-r from-slate-400 via-indigo-950 to-blue-200 rounded-xl border-black w-full py-4 text-2xl px-10 text-center">Vehicles</Link>
    <Link to={"/add-vehicle"} className="border bg-gradient-to-r from-slate-400 via-indigo-950 to-blue-200 rounded-xl border-black w-full py-4 text-2xl px-10 text-center">Add Vehicles</Link>
    </div>
  );
}
