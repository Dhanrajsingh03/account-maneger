import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../Authentication/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data);
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    // Auto login after register
    setUser(data);
    localStorage.setItem('currentUser', JSON.stringify(data));
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (data) => {
    const updatedUser = await authService.updateProfile(data);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};