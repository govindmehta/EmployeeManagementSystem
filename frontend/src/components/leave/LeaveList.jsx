import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader.jsx";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
      } else {
        setError("Failed to fetch leave requests.");
      }
    } catch (err) {
      console.error("Error fetching leave requests:", err.message);
      setError("Error fetching leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (leaveId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/leave/${leaveId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // Refresh the list
      fetchLeaves();
    } catch (err) {
      console.error("Error updating leave status:", err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Leave Requests</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border">S.No</th>
            <th className="py-2 px-4 border">Employee Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Reason</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={leave.id} className="text-center">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{leave.employee.emp_name}</td>
              <td className="py-2 px-4 border">{leave.employee.email}</td>
              <td className="py-2 px-4 border">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{leave.reason}</td>
              <td className="py-2 px-4 border">{leave.status}</td>
              <td className="py-2 px-4 border">
                {leave.status === "PENDING" && (
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => updateStatus(leave.id, "ACCEPTED")}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(leave.id, "REJECTED")}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
