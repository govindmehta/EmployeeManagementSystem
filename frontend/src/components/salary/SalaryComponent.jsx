import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader.jsx";
import { Link } from "react-router-dom";

const SalaryComponent = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/salary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.data.success) {
        setSalaries(response.data.salaries);
      } else {
        setError("Failed to fetch salary records.");
      }
    } catch (err) {
      console.error("Error fetching salaries:", err.message);
      setError("Error fetching salary records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const calculatePending = (total, paid) => total - paid;

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
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Salary Information
        </h1>
        <Link
          to="/admin-dashboard/add-salary"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Add Salary
        </Link>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border">S.No</th>
            <th className="py-2 px-4 border">Employee Name</th>
            <th className="py-2 px-4 border">Total Salary</th>
            <th className="py-2 px-4 border">Paid Salary</th>
            <th className="py-2 px-4 border">Pending Salary</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary, index) => (
            <tr key={salary.id} className="text-center">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{salary.employee.emp_name}</td>
              <td className="py-2 px-4 border">₹{salary.totalSalary.toFixed(2)}</td>
              <td className="py-2 px-4 border">₹{salary.paidSalary.toFixed(2)}</td>
              <td className="py-2 px-4 border">
                ${calculatePending(salary.totalSalary, salary.paidSalary).toFixed(2)}
              </td>
              <td className="py-2 px-4 border">
                <Link
                  to={`/admin-dashboard/edit-salary/${salary.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Update Salary
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryComponent;
