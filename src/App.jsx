import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Authentication/AuthContext';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import Profile from './Pages/ProfilePage';
import './App.css'; 

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;