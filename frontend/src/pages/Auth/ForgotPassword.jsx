import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Send reset password email via Supabase Auth
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setStatus('success');
      setMessage('Password reset link sent! Check your email inbox to continue.');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.message || 'An error occurred while sending the reset link.');
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Resumify</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Reset Password</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Enter your email address and we'll send you a link to reset your password.</p>
        
        {status === 'error' && (
          <div style={{ color: 'var(--error)', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            ⚠️ {message}
          </div>
        )}

        {status === 'success' && (
          <div style={{ color: 'var(--success)', padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            ✅ {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={status === 'loading'}
              required 
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              type="submit" 
              className={`btn ${status === 'loading' ? 'btn-secondary' : 'btn-primary'}`} 
              style={{ width: '100%' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending Link...' : 'Send Reset Link'}
            </button>
            <Link to="/login" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
