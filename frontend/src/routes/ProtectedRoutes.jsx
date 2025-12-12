
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const loggedInUser = localStorage.getItem("user");
  
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child component (Dashboard, Vehicles, etc.)
  return children;
};

export default ProtectedRoute;
