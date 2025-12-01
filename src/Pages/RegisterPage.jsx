import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthContext';
import { Mail, Lock, User, Loader2, X } from 'lucide-react';
import '../App.css'; 

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(formData);
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
          <div className="auth-icon-circle" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
            <User size={28} />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us and start your journey today.</p>
        </div>

        {error && (
          <div className="error-alert">
            <X size={18} /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
             <User className="input-icon" size={20} />
             <input type="text" className="form-input" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className="input-group">
             <Mail className="input-icon" size={20} />
             <input type="email" className="form-input" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>

          <div className="input-group">
             <Lock className="input-icon" size={20} />
             <input type="password" className="form-input" placeholder="Create Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary" style={{ background: 'linear-gradient(to right, #7c3aed, #4f46e5)' }}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up Free'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/" className="link-text" style={{ color: '#7c3aed' }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
