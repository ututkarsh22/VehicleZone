import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { vehicleApi } from "../../api/vehicleApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Dashboard() {
 
  const [vehicles, setVehicles] = useState([]);
  let totalChange = vehicles.length;
  let totalActive = vehicles.filter(v => v.status === "active").length;
  
  useEffect(() => {
      const fetchVehicles = async () => {
        try {
          const res = await vehicleApi();
          console.log("Vehicles from API:", res.data);
          setVehicles(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      
    
      fetchVehicles();
    }, []);

  
    const formatDate =  (date) => {
      try {
        const Dates = new Date(date);
        const formated =  Dates.toLocaleDateString("en-GB");
        return formated;
        
      } catch (error) {
        console.log(error);
      }

    }
    
    const stats = [
        { label: "Total Vehicles", value: vehicles.length, icon: "🚗", change: totalChange, changeType: totalChange < 0 ? "negative" : "positive" },
        { label: "Active", value: vehicles.filter(v => v.status === "active").length, icon: "🟢", change: totalActive, changeType: totalActive < 0 ? "negative" : "positive" },
        { label: "Active", value: vehicles.filter(v => v.status === "under_maintenance").length, icon: "🟡", change: totalActive, changeType: totalActive < 0 ? "negative" : "positive" },
        { label: "Active", value: vehicles.filter(v => v.status === "retired").length, icon: "🔴", change: totalActive, changeType: totalActive < 0 ? "negative" : "positive" },
        
      ];
   
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen w-screen">
        
    
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">Welcome back to the Vehicle Management System.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
            Scheduled List
            </button>
            <Link to="/add-vehicle" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-black transition shadow-sm">
              + Add Vehicle
            </Link>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat,ind) => (            
            <div  key = {ind} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <span className="text-2xl bg-gray-50 p-2 rounded-lg">{stat.icon}</span>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span
                  className={`font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : 
                    stat.changeType === "negative"  ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-2">from last month</span>
              </div>
            </div>
            ))}

        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Vehicle</th>
                    <th className="p-4 font-medium">Registration No.</th>
                    <th className="p-4 font-medium">Model</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Last Service Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {vehicles.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition">
                      <td className="p-4 text-sm font-medium text-gray-900">{item.brand}</td>
                      <td className="p-4 text-sm font-medium text-gray-900">{item.registrationNo}</td>
                      <td className="p-4 text-sm text-gray-500">{item.model}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === "active" ? "bg-green-100 text-green-700" :
                            item.status === "under_maintenance" ? "bg-yellow-100 text-yellow-700" :
                            "bg-gray-100 text-red-600 border-red-700" 
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-400">{formatDate(item.lastServiceDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

      
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Maintenance Alerts</h2>
            <div className="space-y-4">
              {/* Alert Item 1 */}
              <div className="flex gap-4 items-start p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="text-red-500 mt-1">⚠️</div>
                <div>
                  <h4 className="text-sm font-bold text-red-800">Oil Change Overdue</h4>
                  <p className="text-xs text-red-600 mt-1">Vehicle: Ford F-150 (TRK-55)</p>
                  <button className="mt-2 text-xs font-medium text-red-700 underline">Schedule Now</button>
                </div>
              </div>
              
              <div className="flex gap-4 items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="text-yellow-600 mt-1">📋</div>
                <div>
                  <h4 className="text-sm font-bold text-yellow-800">Insurance Expiring</h4>
                  <p className="text-xs text-yellow-700 mt-1">Nissan Altima (XYZ-00)</p>
                  <p className="text-xs text-yellow-600">Expires in 3 days</p>
                </div>
              </div>

              {/* Quick Actions List */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg text-center border border-gray-200 transition">
                    Add Vehicle
                  </button>
                  <button className="p-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg text-center border border-gray-200 transition">
                    Add Driver
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}