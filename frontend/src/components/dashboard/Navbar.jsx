import React from 'react';
import { useAuth } from '../../context/authContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div>
        {user && <span className="text-lg">Welcome, {user.name}</span>}
      </div>
      <div>
        <button 
          onClick={logout}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
