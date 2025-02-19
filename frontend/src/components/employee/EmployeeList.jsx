import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper.jsx";
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
      minWidth: "200px", 
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

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.log("Error deleting employee:", error.message);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((employee) => ({
            id: employee.id,
            sno: sno++,
            name: employee.emp_name, 
            profilePic: employee.profilePic, 
            action: <EmployeeButtons id={employee.id} onDelete={handleDelete} />,
          }));
          setEmployees(data);
        }
      } catch (error) {
        console.log("Error in EmployeeList.jsx:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Manage Employees</h3>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search By Employee Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            to="/admin-dashboard/add-employee"
            className="inline-flex items-center justify-center w-full md:w-1/3 h-12 bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700 transition-colors md:ml-6"
          >
            Add New Employee
          </Link>
        </div>
      </div>
      <div className="w-full" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        {loading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={filteredEmployees}
            customStyles={customStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="400px"
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
