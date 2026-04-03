import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradeModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal Content */}
      <div className="card" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '450px',
        padding: '2.5rem',
        textAlign: 'center',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚀</div>
        <h2 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Limit Reached!</h2>
        <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {data?.message || 'You have reached your download limit.'}
        </p>
        
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '2rem',
          border: '1px solid var(--surface-border)'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Usage: <strong style={{ color: 'var(--text-main)' }}>{data?.used}/{data?.limit}</strong> downloads
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Current Plan: <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{data?.plan}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.875rem' }}
            onClick={() => {
              navigate('/pricing');
              onClose();
            }}
          >
            Upgrade to Get More
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', border: 'none' }}
            onClick={onClose}
          >
            Maybe Later
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default UpgradeModal;
