import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import AdminSummary from "../components/dashboard/AdminSummary.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import { useAuth } from "../context/authContext.jsx";

const AdminDashboard = () => {
  const { user,loading } = useAuth();
 
  return (
    <div className="flex h-screen bg-gray-200">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <AdminSummary />
      </div>
    </div>
  )
};

export default AdminDashboard;
