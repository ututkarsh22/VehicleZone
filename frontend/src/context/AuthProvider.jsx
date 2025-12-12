import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  // On app load, check if user is in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser ) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function: stores user & token
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // const countVehicle = (vehicle) =>{
  //     vehicle.reduce((acc,ind) =>{

  //     })
  // }

  // Logout function: clears user & token
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
