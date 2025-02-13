import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="h-full min-h-screen w-72 bg-gray-900 text-white flex flex-col">
      <div className="px-8 py-6 border-b border-gray-700">
        <h1 className="text-4xl font-extrabold tracking-wide">Employee MS</h1>
      </div>

      <nav className="flex flex-col mt-8 space-y-4 px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaTachometerAlt className="mr-4 text-xl" />
          <span className="text-lg font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaUsers className="mr-4 text-xl" />
          <span className="text-lg font-medium">Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaBuilding className="mr-4 text-xl" />
          <span className="text-lg font-medium">Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leave"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaCalendarAlt className="mr-4 text-xl" />
          <span className="text-lg font-medium">Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaMoneyBillWave className="mr-4 text-xl" />
          <span className="text-lg font-medium">Salary</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          <FaCogs className="mr-4 text-xl" />
          <span className="text-lg font-medium">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
