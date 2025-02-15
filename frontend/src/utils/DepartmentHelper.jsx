import { Link } from "react-router-dom";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  }
];


export const DepartmentButtons = ({ id, onDelete }) => {
    return (
      <div className="flex space-x-2">
        <Link
          to={`/admin-dashboard/department/${id}`}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    );
  };