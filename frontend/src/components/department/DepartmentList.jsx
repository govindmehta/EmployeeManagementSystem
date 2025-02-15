import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
import axios from "axios";
import Loader from "../Loader.jsx";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#1F2937", // Tailwind gray-800
      color: "#F9FAFB", // Tailwind gray-50
      fontWeight: "bold",
      fontSize: "18px", 
      padding: "14px",   
    },
  },
  cells: {
    style: {
      padding: "14px",
      fontSize: "16px", 
    },
  },
  rows: {
    style: {
      minHeight: "50px",
      "&:nth-of-type(even)": {
        backgroundColor: "#F3F4F6", // Tailwind gray-100
      },
    },
  },
};

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    } catch (error) {
      console.log("Error deleting department:", error.message);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log(response.data);
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((department) => ({
            id: department.id,
            sno: sno++,
            dep_name: department.dep_name,
            action: (
              <DepartmentButtons id={department.id} onDelete={handleDelete} />
            ),
          }));
          setDepartments(data);
        }
      } catch (error) {
        console.log("Error in DepartmentList.jsx: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Departments
        </h3>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search By Department Name"
            className="w-full md:w-2/3 h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            to="/admin-dashboard/add-department"
            className="inline-flex items-center justify-center w-full md:w-1/3 h-12 bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700 transition-colors md:ml-6"
          >
            Add New Department
          </Link>
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={departments}
            customStyles={customStyles}
            pagination
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentList;
