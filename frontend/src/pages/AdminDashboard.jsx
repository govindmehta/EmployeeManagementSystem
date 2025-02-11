import { useAuth } from "../context/authContext.jsx";

const AdminDashboard = () => {
  const { user,loading } = useAuth();
 
  return <div>AdminDashboard {user && user.name}</div>;
};

export default AdminDashboard;
