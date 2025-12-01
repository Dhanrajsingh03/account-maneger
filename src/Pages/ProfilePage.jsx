import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { Mail, User, LogOut, Edit2, Save, Loader2, CheckCircle, Shield, Calendar } from 'lucide-react';
import '../App.css';

const Profile = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email });
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateUser(formData);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert('Failed to update');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Loader2 className="animate-spin" size={40} color="#4f46e5" /></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-cover"></div>
          
          <div className="avatar-container">
            <div className="avatar-large">
              {formData.name.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>

          <div className="sidebar-menu">
            <button onClick={logout} className="btn-logout">
              <LogOut size={18} /> 
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="profile-content">
          <div className="profile-header">
            <div className="header-title">
              <h2>Account Settings</h2>
              <p>Manage your personal information</p>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn-edit">
                <Edit2 size={16} /> Edit
              </button>
            )}
          </div>

          {showSuccess && (
            <div className="success-alert">
              <CheckCircle size={20} /> Profile updated successfully!
            </div>
          )}

          <div className="form-section">
            <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Full Name</label>
                <div className="input-group">
                  <User className="input-icon" size={20} />
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
            </div>

            <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Email Address</label>
                <div className="input-group">
                  <Mail className="input-icon" size={20} />
                  <input 
                    type="email" 
                    className="form-input"
                    value={formData.email}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
            </div>

            <div className="widget-grid">
                 <div className="widget-card">
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px'}}>
                      <Shield size={18} color="#6b7280"/>
                      <span className="widget-label">Account ID</span>
                    </div>
                    <span className="widget-value">#{user.id || '849302'}</span>
                 </div>
                 <div className="widget-card">
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px'}}>
                      <Calendar size={18} color="#6b7280"/>
                      <span className="widget-label">Joined</span>
                    </div>
                    <span className="widget-value">December 2024</span>
                 </div>
            </div>

            {isEditing && (
              <div className="btn-group">
                <button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="btn-primary"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Save Changes</>}
                </button>
                <button 
                  onClick={() => { setIsEditing(false); setFormData(user); }} 
                  disabled={isLoading}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
