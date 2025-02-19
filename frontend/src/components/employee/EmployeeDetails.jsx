import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader.jsx";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError("Employee not found.");
        }
      } catch (err) {
        console.error("Error fetching employee details:", err.message);
        setError("Error fetching employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

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

  if (!employee) return null;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-6">
          <img
            src={employee.profilePic || "/images/default_profile_pic.jpg"}
            alt={employee.emp_name}
            className="w-20 h-20 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {employee.emp_name}
            </h2>
            <p className="text-gray-600">{employee.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <strong className="text-gray-700">Phone:</strong>{" "}
          <span>{employee.phone || "N/A"}</span>
        </div>
        <div className="mb-4">
          <strong className="text-gray-700">Address:</strong>{" "}
          <span>{employee.address || "N/A"}</span>
        </div>
        <div className="mb-4">
          <strong className="text-gray-700">Department:</strong>{" "}
          <span>{employee.department?.dep_name || "N/A"}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/admin-dashboard/edit-employee/${employee.id}`)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
