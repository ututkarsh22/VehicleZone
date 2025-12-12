import Navbar from "../components/Navbar";


export default function DashboardLayout({ children }) {


  return (
    <div className="bg-green-500 h-[100%] overflow-y-hidden">
    <Navbar/>
        <div className="flex h-[100%] ">
        {children}
        </div> 

      
      
    </div>
  );
}
