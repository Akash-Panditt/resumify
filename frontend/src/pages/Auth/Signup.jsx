import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('resumify_user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', { credential: credentialResponse.credential });
      localStorage.setItem('resumify_user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google Registration failed');
    }
  };

  return (
    <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Resumify</h1>
      </div>
      
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Create Account</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Sign up to start building your premium resume.</p>
        
        {error && <div style={{ color: 'var(--error)', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
        
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
            <Link to="/login" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none', textAlign: 'center' }}>Already have an account?</Link>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0', color: 'var(--text-muted)' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
              <span style={{ padding: '0 1rem', fontSize: '0.875rem' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google Authentication Failed')} width="100%" text="signup_with" shape="rectangular" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
