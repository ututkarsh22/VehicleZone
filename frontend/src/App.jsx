import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import VehicleList from "./pages/Auth/VehicleList.jsx";
import AddVehicle from "./pages/Auth/AddVehicles.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import Register from "./pages/Auth/Register.jsx";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="h-screen w-screen">
    <AuthProvider>
          <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName={() =>
            "relative flex p-4 min-h-15 rounded-lg justify-between overflow-hidden cursor-pointer shadow-lg bg-gray-800 text-white"
          }
          bodyClassName={() => "text-sm font-medium flex items-center"}
        />
        <Routes>
          {/* Public Routes */}
               
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          

          {/* Protected Routes */}
          <Route
            path="/"
            element={
             
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>

              
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <VehicleList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-vehicle"
            element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            }
          />

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
          </Routes>
     
    </AuthProvider>
   </div>
  );
}

export default App;