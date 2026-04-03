import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const PLAN_LIMITS = { free: 1, premium: 50, enterprise: Infinity };

const Settings = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('resumify_user');
    if (!storedUser) navigate('/login');
    else setUser(JSON.parse(storedUser));
  }, [navigate]);

  const maxDownloads = PLAN_LIMITS[user?.plan] || 1;
  const currentDownloads = user?.download_count || 0;
  const usagePercent = maxDownloads === Infinity ? 5 : Math.min(100, (currentDownloads / maxDownloads) * 100);
  const isNearLimit = maxDownloads !== Infinity && usagePercent >= 80;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="navbar" style={{ padding: 0 }}>
        <h1 className="text-gradient">Settings</h1>
        <div className="nav-links">
          <ThemeToggle />
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </div>

      {/* Profile */}
      <div className="card">
        <h2>Profile Details</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Your personal account information.</p>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="form-input" disabled value={user?.name || ''} />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" disabled value={user?.email || ''} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Role</label>
          <div>{user?.role === 'admin' ? <span className="badge badge-danger">Admin</span> : <span className="badge badge-primary">User</span>}</div>
        </div>
      </div>

      {/* Subscription & Usage */}
      <div className="card" style={{ border: '1px solid var(--primary)', backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>
              Current Plan: <span style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{user?.plan || 'Free'}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upgrade to unlock more templates and downloads.</p>
          </div>
          {user?.plan !== 'enterprise' && (
            <button className="btn btn-primary" onClick={() => navigate('/pricing')}>Upgrade Plan</button>
          )}
        </div>

        {/* Download Usage */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>PDF Downloads Used</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: isNearLimit ? 'var(--error)' : 'var(--text-main)' }}>
              {currentDownloads} / {maxDownloads === Infinity ? '∞' : maxDownloads}
            </span>
          </div>
          <div className="progress-container">
            <div className={`progress-bar ${isNearLimit ? 'danger' : ''}`} style={{ width: `${usagePercent}%` }}></div>
          </div>
        </div>

        {isNearLimit && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.875rem', color: '#f87171' }}>
            ⚠️ You're running low on downloads. Consider upgrading your plan for more.
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
