import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Check if user is admin
      if (res.data.role !== 'admin') {
        setError('Access denied. This login is for administrators only.');
        setLoading(false);
        return;
      }

      localStorage.setItem('resumify_admin', JSON.stringify(res.data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Resumify</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span className="badge badge-danger">Admin Panel</span>
        </div>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🛡️</span>
          <h2 style={{ marginBottom: 0 }}>Admin Login</h2>
        </div>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Restricted access. Administrators only.</p>
        
        {error && (
          <div style={{ color: 'var(--error)', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input type="email" className="form-input" placeholder="admin@resumify.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Access Admin Panel'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>← Back to User Login</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
