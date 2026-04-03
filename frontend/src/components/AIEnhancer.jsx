import React, { useState } from 'react';
import axios from 'axios';

const AIEnhancer = ({ text, onApply, type = 'summary' }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  const handleEnhance = async () => {
    if (!text || text.trim().length < 5) {
      return alert('Please enter some text first to enhance it.');
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/enhance', 
        { text, type },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuggestion(res.data.enhanced);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enhance text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        type="button"
        className={`btn ${loading ? 'btn-secondary' : 'btn-primary'}`}
        style={{ 
          padding: '0.4rem 0.8rem', 
          fontSize: '0.75rem', 
          gap: '0.4rem',
          borderRadius: 'var(--radius-sm)',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}
        onClick={handleEnhance}
        disabled={loading}
      >
        <span>{loading ? '🪄' : '✨'}</span>
        {loading ? 'Thinking...' : 'Smart Enhance'}
      </button>

      {error && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          right: 0, 
          zIndex: 100, 
          marginTop: '0.5rem',
          background: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: '0.8rem',
          color: '#f87171',
          width: '200px'
        }}>
          {error}
        </div>
      )}

      {suggestion && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '2rem', border: '1px solid var(--primary)' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem' }}>AI Enhancement Ready</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.7rem' }}>ORIGINAL</label>
                <div style={{ 
                  padding: '1rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  height: '150px',
                  overflow: 'auto',
                  border: '1px solid var(--surface-border)'
                }}>{text}</div>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>ENHANCED BY AI</label>
                <div style={{ 
                  padding: '1rem', 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  height: '150px',
                  overflow: 'auto',
                  border: '1px solid var(--primary)'
                }}>{suggestion}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  onApply(suggestion);
                  setSuggestion(null);
                }}
              >
                Apply Enhancement
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setSuggestion(null)}
              >
                Keep Original
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIEnhancer;
