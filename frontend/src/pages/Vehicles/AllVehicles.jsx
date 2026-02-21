import React from 'react'
import { vehicleApi } from "../../api/vehicleApi";
import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const AllVehicles = () => {
    const[vehicles,setVehicles] = useState([]);

    useEffect(() =>{
        const fetch = async()=>{
            try {
                const res = await vehicleApi();
                setVehicles(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    })

    
    const formatDate =  (date) => {
      try {
        const Dates = new Date(date);
        const formated =  Dates.toLocaleDateString("en-GB");
        return formated;
        
      } catch (error) {
        console.log(error);
      }

    }
  return (
    <DashboardLayout>
    <div className='bg-gray-700 w-full'>
        <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-800 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Vehicle</th>
                    <th className="p-4 font-medium">Registration No.</th>
                    <th className="p-4 font-medium">Model</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Last Service Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {vehicles.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-700 hover:text-white transition text-black bg-gray-400">
                      <td className="p-4 text-sm font-medium hover:font-bold hover:text-white ">{item.brand}</td>
                      <td className="p-4 text-sm font-medium">{item.registrationNo}</td>
                      <td className="p-4 text-sm ">{item.model}</td>
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
                      <td className="p-4 text-sm ">{formatDate(item.lastServiceDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </div>
    </DashboardLayout>
  )
}

export default AllVehicles