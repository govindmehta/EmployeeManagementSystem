import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [depName, setDepName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchDepartment = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });

          const { dep_name, description } = response.data.department;

          setDepName(dep_name);
          setDescription(description);
        } catch (err) {
          console.error("Error fetching department:", err.message);
          setError("Failed to fetch department details.");
        } finally {
          setLoading(false);
        }
      };

      fetchDepartment();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/${id}`,
        {
          dep_name: depName,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (err) {
      console.error("Error updating department:", err.message);
      setError("Failed to update department.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Department</h1>
      
      {/* Display current department details */}
      <div className="mb-8 bg-gray-100 p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Current Department Details
        </h2>
        <p className="text-gray-600">
          <strong>Name:</strong> {depName}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>Description:</strong> {description}
        </p>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-4">
          <label htmlFor="dep_name" className="block text-gray-700 mb-2">
            Department Name
          </label>
          <input
            type="text"
            id="dep_name"
            name="dep_name"
            value={depName}
            onChange={(e) => setDepName(e.target.value)}
            placeholder="Enter Department Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          Update Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
