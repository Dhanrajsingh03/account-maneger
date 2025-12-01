import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';
import { Mail, Lock, LogIn, ArrowRight, Loader2, X } from 'lucide-react';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-circle">
            <LogIn size={28} />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Please enter your details to sign in.</p>
        </div>

        {error && (
          <div className="error-alert">
             <X size={18}/>
             <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              className="form-input"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="link-text">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
