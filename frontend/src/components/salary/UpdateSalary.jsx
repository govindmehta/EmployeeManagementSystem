import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader.jsx";

const UpdateSalary = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState({
    emp_name: "",
    email: "",
    totalSalary: "",
    paidSalary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSalary = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.data.success) {
          const data = response.data.salary;
          setSalaryData({
            emp_name: data.employee.emp_name,
            email: data.employee.email,
            totalSalary: data.totalSalary,
            paidSalary: data.paidSalary,
          });
        } else {
          setError("Salary record not found.");
        }
      } catch (err) {
        console.error("Error fetching salary:", err.message);
        setError("Error fetching salary record.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalary();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/salary/${id}`,
        salaryData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/salary");
      }
    } catch (err) {
      console.error("Error updating salary:", err.message);
      setError("Failed to update salary.");
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 overflow-auto">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Update Salary
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="emp_name" className="block text-gray-700 mb-2">
              Employee Name
            </label>
            <input
              type="text"
              id="emp_name"
              name="emp_name"
              value={salaryData.emp_name}
              onChange={handleChange}
              placeholder="Employee Name"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Employee Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={salaryData.email}
              onChange={handleChange}
              placeholder="Employee Email"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <div className="mb-6">
            <label htmlFor="totalSalary" className="block text-gray-700 mb-2">
              Total Salary
            </label>
            <input
              type="number"
              id="totalSalary"
              name="totalSalary"
              value={salaryData.totalSalary}
              onChange={handleChange}
              placeholder="Enter total salary"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="paidSalary" className="block text-gray-700 mb-2">
              Paid Salary
            </label>
            <input
              type="number"
              id="paidSalary"
              name="paidSalary"
              value={salaryData.paidSalary}
              onChange={handleChange}
              placeholder="Enter paid salary"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            {loading ? "Updating..." : "Update Salary"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSalary;
