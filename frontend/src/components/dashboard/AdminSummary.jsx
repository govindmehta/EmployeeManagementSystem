import React from "react";
import SummaryCard from "./SummaryCard.jsx";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <SummaryCard 
          icon={<FaUsers />} 
          text="Total Employees" 
          number={15}
          color="text-red-500"
        />
        <SummaryCard 
          icon={<FaBuilding />} 
          text="Total Departments" 
          number={5} 
          color="text-blue-500"
        />
        <SummaryCard 
          icon={<FaMoneyBillWave />} 
          text="Monthly Salary" 
          number={15000} 
          color="text-green-500"
        />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-800 mb-4">Leave Details</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard 
            icon={<FaFileAlt />} 
            text="Leave Applied" 
            number={5} 
            color="text-yellow-500"
          />
          <SummaryCard 
            icon={<FaCheckCircle />} 
            text="Leave Approved" 
            number={2} 
            color="text-green-500"
          />
          <SummaryCard 
            icon={<FaHourglassHalf />} 
            text="Leave Pending" 
            number={4} 
            color="text-indigo-500"
          />
          <SummaryCard 
            icon={<FaTimesCircle />} 
            text="Leave Rejected" 
            number={1} 
            color="text-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
