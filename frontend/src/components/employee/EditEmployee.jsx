import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader.jsx";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    emp_name: "",
    email: "",
    phone: "",
    address: "",
    departmentName: "",
    profilePic: "", // will store a URL or a base64 string
  });
  const [currentProfilePic, setCurrentProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employee details on mount
  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee({
            emp_name: emp.emp_name,
            email: emp.email,
            phone: emp.phone || "",
            address: emp.address || "",
            departmentName: emp.department?.dep_name || "",
            profilePic: emp.profilePic || "", // initially use current URL
          });
          setCurrentProfilePic(emp.profilePic);
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

    fetchEmployee();
  }, [id]);

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change and convert file to base64 string
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee((prev) => ({
          ...prev,
          profilePic: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated data as JSON
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/${id}`,
        employee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      console.error("Error updating employee:", err.message);
      setError("Failed to update employee.");
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 overflow-auto">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Edit Employee
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
            <label htmlFor="departmentName" className="block text-gray-700 mb-2">
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
            {currentProfilePic && (
              <img
                src={currentProfilePic}
                alt="Current Profile"
                className="w-16 h-16 rounded-full mb-2"
              />
            )}
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
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
