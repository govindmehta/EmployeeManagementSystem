import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUser(null);
        setLoading(false);
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.user);
        if (!response.data.user) {
          localStorage.removeItem("authToken");
          setUser(null);
          navigate("/login");
        } else {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("User verification failed:", error);
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
