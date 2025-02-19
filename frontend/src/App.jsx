import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBaseRoutes from "./utils/RoleBaseRoutes.jsx";
import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import EmployeeList from "./components/employee/EmployeeList.jsx";
import AddEmployee from "./components/employee/AddEmployee.jsx";
import EmployeeDetails from "./components/employee/EmployeeDetails.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole = {["admin"]} >
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          
          <Route index element={<AdminSummary/>}></Route>
          <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
          <Route path="/admin-dashboard/employees" element={<EmployeeList/>}></Route>
          <Route path="/admin-dashboard/add-employee" element={<AddEmployee/>}></Route>
          <Route path="/admin-dashboard/employee-details/:id" element={<EmployeeDetails/>}></Route>

          
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </>
  );
}

export default App;
