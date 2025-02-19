import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    emp_name: "",
    email: "",
    phone: "",
    address: "",
    departmentName: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log(employee);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/add",
        employee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      console.error("Error adding employee:", err.message);
      setError("Failed to add employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-8 overflow-auto">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Add Employee
        </h1>
        {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
        <div>
          <div className="mb-6">
            <label htmlFor="emp_name" className="block text-gray-700 mb-2">
              Employee Name
            </label>
            <input
              type="text"
              id="emp_name"
              name="emp_name"
              value={employee.emp_name}
              onChange={handleChange}
              placeholder="Enter employee name"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter employee email"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={employee.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="departmentId" className="block text-gray-700 mb-2">
              Department Name
            </label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={employee.departmentName}
              onChange={handleChange}
              placeholder="Enter department name"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="profilePic" className="block text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
