import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState({
    emp_name: "",
    email: "",
    totalSalary: "",
    paidSalary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/salary/add",
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
      console.error("Error adding salary:", err.message);
      setError("Failed to add salary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 overflow-auto">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Add Salary
        </h1>
        {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
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
              placeholder="Enter employee name"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter employee email"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {loading ? "Adding..." : "Add Salary"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
