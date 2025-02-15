import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import { useAuth } from "../context/authContext.jsx";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
 
  return (
    <div className="flex min-h-screen bg-gray-200">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

