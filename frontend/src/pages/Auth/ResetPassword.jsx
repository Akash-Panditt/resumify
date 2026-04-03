import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // On mount, verify that user has an active session from the password recovery email link
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !window.location.hash.includes('type=recovery')) {
        // If there's no session and no recovery hash, they shouldn't be here directly.
        setStatus('error');
        setMessage('Invalid or expired password reset link. Please request a new one.');
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters long.');
      return;
    }
    
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Update the user's password using the active recovery session
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setStatus('success');
      setMessage('Password successfully updated! Redirecting to login...');
      
      // Bonus: Redirect to login page after short delay
      setTimeout(() => {
        // Sign out just to enforce a clean login state with new credentials
        supabase.auth.signOut();
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.message || 'An error occurred while resetting the password.');
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Resumify</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Set New Password</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Security first. Pick a strong password!</p>
        
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
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={status === 'loading' || status === 'success'}
              required 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              disabled={status === 'loading' || status === 'success'}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className={`btn ${status === 'loading' || status === 'success' ? 'btn-secondary' : 'btn-primary'}`} 
            style={{ width: '100%' }}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Updating Securely...' : status === 'success' ? 'Done!' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
