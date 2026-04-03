import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    if (!user?.token || user?.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, []);

  const api = (path, opts = {}) => axios({ url: `http://localhost:5000/api/admin${path}`, headers: { Authorization: `Bearer ${user.token}` }, ...opts });

  const fetchAllData = async () => {
    try {
      const [statsRes, usersRes, resumesRes] = await Promise.all([
        api('/stats'),
        api('/users'),
        api('/resumes'),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setResumes(resumesRes.data);
    } catch (err) {
      console.error('Admin fetch failed', err);
      if (err.response?.status === 403) navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, updates) => {
    try {
      await api(`/users/${userId}`, { method: 'PUT', data: updates });
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user and ALL their resumes? This cannot be undone.')) return;
    try {
      await api(`/users/${userId}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleApproveUpgrade = async (userId) => {
    try {
      await api(`/approve-upgrade/${userId}`, { method: 'POST' });
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Approval failed');
    }
  };

  const handleRejectUpgrade = async (userId) => {
    try {
      await api(`/reject-upgrade/${userId}`, { method: 'POST' });
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Rejection failed');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Delete this resume permanently?')) return;
    try {
      await api(`/resumes/${resumeId}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Admin Panel...</div>;

  const planBadge = (plan) => {
    const cls = plan === 'enterprise' ? 'badge-success' : plan === 'premium' ? 'badge-purple' : 'badge-primary';
    return <span className={`badge ${cls}`}>{plan}</span>;
  };

  const roleBadge = (role) => {
    return <span className={`badge ${role === 'admin' ? 'badge-danger' : 'badge-primary'}`}>{role}</span>;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
      <div className="navbar">
        <div>
          <h1 className="text-gradient">Admin Dashboard</h1>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Manage users, resumes, and subscriptions</span>
        </div>
        <div className="nav-links">
          <ThemeToggle />
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>User App</button>
          <button className="btn btn-danger" onClick={() => { localStorage.removeItem('resumify_admin'); navigate('/admin/login'); }}>Logout Admin</button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalResumes}</div>
            <div className="stat-label">Total Resumes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.planDistribution?.free || 0}</div>
            <div className="stat-label">Free Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.planDistribution?.premium || 0}</div>
            <div className="stat-label">Premium Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.planDistribution?.enterprise || 0}</div>
            <div className="stat-label">Enterprise Users</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('overview')}>Users</button>
        <button className={`btn ${activeTab === 'resumes' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('resumes')}>Resumes</button>
      </div>

      {/* Users Table */}
      {activeTab === 'overview' && (
        <div className="card" style={{ overflow: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Role</th>
                <th>Downloads</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: '500' }}>{u.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                  <td>
                    <select
                      value={u.plan}
                      style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--surface-border)', borderRadius: '4px', padding: '0.2rem 0.4rem', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}
                      onChange={(e) => handleUpdateUser(u.id, { plan: e.target.value })}
                    >
                      <option value="free" style={{ background: '#1e293b', color: '#f1f5f9' }}>Free</option>
                      <option value="premium" style={{ background: '#1e293b', color: '#f1f5f9' }}>Premium</option>
                      <option value="enterprise" style={{ background: '#1e293b', color: '#f1f5f9' }}>Enterprise</option>
                    </select>
                  </td>
                  <td>{roleBadge(u.role)}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {u.plan === 'free' ? '0' : u.download_count}
                      {u.requested_plan && (
                        <div className="badge badge-purple" style={{ fontSize: '0.65rem', animation: 'pulse 2s infinite' }}>
                          Wants {u.requested_plan}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {u.requested_plan && (
                        <>
                          <button className="btn btn-success" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleApproveUpgrade(u.id)}>Approve</button>
                          <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleRejectUpgrade(u.id)}>Reject</button>
                        </>
                      )}
                      {u.role !== 'admin' && <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDeleteUser(u.id)}>Delete</button>}
                      {!u.requested_plan && u.role === 'user' && <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleUpdateUser(u.id, { role: 'admin' })}>Make Admin</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resumes Table */}
      {activeTab === 'resumes' && (
        <div className="card" style={{ overflow: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Template</th>
                <th>User ID</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: '500' }}>{r.title || 'Untitled'}</td>
                  <td><span className="badge badge-primary">{r.template}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{r.user_id?.slice(0, 8)}...</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(r.updated_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleDeleteResume(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

const pulseAnimation = `
@keyframes pulse {
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = pulseAnimation;
  document.head.appendChild(style);
}
