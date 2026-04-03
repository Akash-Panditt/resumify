import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';
import StatusModal from '../../components/StatusModal';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['3 PDF downloads', '5 free templates', 'Basic resume builder', 'Unlimited saves'],
    featured: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9',
    period: '/month',
    features: ['50 PDF downloads', 'All 4 templates', 'Priority support', 'Advanced formatting', 'Custom sections'],
    featured: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$29',
    period: '/month',
    features: ['Unlimited downloads', 'All templates + future ones', 'AI resume rewriting (coming soon)', 'Team management', 'Dedicated support'],
    featured: false
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const currentPlan = user?.plan || 'free';
  const requestedPlan = user?.requested_plan || null;

  const handleUpgrade = async (planId) => {
    if (planId === currentPlan || planId === requestedPlan) return;
    if (!user?.token) return navigate('/login');

    setLoading(planId);
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/request-upgrade`, { plan: planId }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      // Update local storage with the pending request
      const updatedUser = { ...user, requested_plan: planId };
      localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
      
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Request Sent!',
        message: res.data.message
      });
    } catch (err) {
      console.error('Upgrade request failed', err);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Upgrade Failed',
        message: err.response?.data?.message || 'Failed to send upgrade request. Please ensure your database has the requested_plan column.'
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto', minHeight: '100vh' }}>
      <header className="navbar">
        <div className="nav-container">
          <h1 className="text-gradient" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Select Plan</h1>
          <div className="nav-links">
            <ThemeToggle />
            <span className="badge badge-primary">{currentPlan} plan</span>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Dashboard</button>
          </div>
        </div>
      </header>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Choose the plan that fits your career goals. Upgrade anytime.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
        {PLANS.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured && (
              <div style={{ position: 'absolute', top: '-1px', right: '1.5rem', background: 'var(--primary)', color: '#fff', padding: '0.25rem 1rem', borderRadius: '0 0 0.5rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                Most Popular
              </div>
            )}
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{plan.name}</h3>
            <div className="price">
              {plan.price}<span> {plan.period}</span>
            </div>
            <ul className="feature-list">
              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            {currentPlan === plan.id ? (
              <button className="btn btn-secondary" style={{ width: '100%', cursor: 'default' }} disabled>Current Plan</button>
            ) : requestedPlan === plan.id ? (
              <button className="btn btn-secondary" style={{ width: '100%', cursor: 'default', color: 'var(--primary)' }} disabled>Request Pending...</button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading === plan.id || (requestedPlan && requestedPlan !== plan.id)}
              >
                {loading === plan.id ? 'Processing...' : `Upgrade to ${plan.name}`}
              </button>
            )}
          </div>
        ))}
      </div>

      <StatusModal 
        {...modal} 
        onClose={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.type === 'success') window.location.reload();
        }} 
      />
    </div>
  );
};

export default Pricing;
