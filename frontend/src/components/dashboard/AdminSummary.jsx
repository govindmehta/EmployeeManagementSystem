import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard.jsx";
import { FaBuilding, FaUsers, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import Loader from "../Loader.jsx";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.data.success) {
        setSummary(response.data.data);
      } else {
        setError("Failed to fetch summary data.");
      }
    } catch (err) {
      console.error("Error fetching summary data:", err.message);
      setError("Error fetching summary data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <SummaryCard 
          icon={<FaUsers />} 
          text="Total Employees" 
          number={summary.totalEmployees}
          color="text-red-500"
        />
        <SummaryCard 
          icon={<FaBuilding />} 
          text="Total Departments" 
          number={summary.totalDepartments} 
          color="text-blue-500"
        />
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-800 mb-4">Leave Details</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SummaryCard 
            icon={<FaCheckCircle />} 
            text="Leave Approved" 
            number={summary.leaveApproved} 
            color="text-green-500"
          />
          <SummaryCard 
            icon={<FaHourglassHalf />} 
            text="Leave Pending" 
            number={summary.leavePending} 
            color="text-indigo-500"
          />
          <SummaryCard 
            icon={<FaTimesCircle />} 
            text="Leave Rejected" 
            number={summary.leaveRejected} 
            color="text-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
