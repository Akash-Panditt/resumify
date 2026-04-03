import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('resumify_user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchResumes(parsedUser.token);
      fetchProfile(parsedUser);
    }
  }, [navigate]);

  const fetchProfile = async (currentUser) => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      // the profile endpoint doesn't return the token, so we keep the existing one
      const updatedUser = { ...res.data, token: currentUser.token, _id: res.data.id || currentUser._id };
      setUser(updatedUser);
      localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Failed to sync profile', err);
    }
  };

  const fetchResumes = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/resumes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(res.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Delete this resume permanently?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${resumeId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResumes(resumes.filter(r => r._id !== resumeId));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const planBadgeClass = user?.plan === 'premium' ? 'badge-purple' : user?.plan === 'enterprise' ? 'badge-success' : 'badge-primary';

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="navbar">
        <div className="nav-container">
          <h1 className="text-gradient" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Resumify</h1>
          <div className="nav-links">
            <ThemeToggle />
            <span className={`badge ${planBadgeClass}`}>{user?.plan || 'free'}</span>
            {user?.role === 'admin' && (
              <button className="btn btn-secondary" onClick={() => navigate('/admin/login')}>
                🛡️ Admin
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => navigate('/pricing')}>Pricing</button>
            <button className="btn btn-secondary" onClick={() => navigate('/settings')}>Settings</button>
            <button className="btn btn-secondary" onClick={() => {
              localStorage.removeItem('resumify_user');
              navigate('/login');
            }}>Logout</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Welcome back, {user?.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Downloads used: <strong>{user?.download_count || 0}</strong> • 
            Plan: <strong style={{ textTransform: 'capitalize' }}>{user?.plan || 'free'}</strong>
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/templates')}>+ Create New Resume</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        <div onClick={() => navigate('/templates')} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px', cursor: 'pointer', border: '1px dashed var(--text-muted)', background: 'transparent' }}>
          <span style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>+</span>
          <h3 style={{ color: 'var(--text-muted)' }}>Choose Template</h3>
        </div>
        
        {resumes.map(resume => (
          <div key={resume._id} className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{ marginBottom: 0 }}>{resume.title || 'Untitled Resume'}</h3>
              <span className="badge badge-primary">{resume.template}</span>
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</span>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }} onClick={() => navigate(`/builder/${resume._id}`)}>Edit</button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }} onClick={() => navigate(`/preview/${resume._id}`)}>Preview</button>
              <button className="btn btn-danger" style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }} onClick={() => handleDeleteResume(resume._id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
