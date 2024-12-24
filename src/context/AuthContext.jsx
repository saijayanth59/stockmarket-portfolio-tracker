"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
    localStorage.setItem("token", data.token); // Store token in localStorage
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("logging out");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
