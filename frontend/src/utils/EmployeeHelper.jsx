import React from "react";
import { Link } from "react-router-dom";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px",
  },
  {
    name: "Profile",
    cell: (row) => (
      <img
        src={row.profilePic || "/images/default_profile_pic.jpg"}
        alt={row.name}
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    grow: 2,
  },
  {
    name: "Action",
    cell: (row) => row.action,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "300px",
  },
];


export const EmployeeButtons = ({ id, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <Link
        to={`/admin-dashboard/employee-details/${id}`}
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
      >
        View Details
      </Link>
      <button
        onClick={() => onDelete(id)}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
      >
        Delete
      </button>
    </div>
  );
};

