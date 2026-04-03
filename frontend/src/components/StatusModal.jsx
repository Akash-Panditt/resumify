import React from 'react';

const StatusModal = ({ isOpen, onClose, type = 'success', title, message, buttonText = 'Got it' }) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Modal Card */}
      <div className="card" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
        textAlign: 'center',
        border: `1px solid ${isSuccess ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        boxShadow: `0 25px 70px -12px ${isSuccess ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`,
        background: 'var(--card-bg)',
      }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          filter: isSuccess ? 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.4))' : 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.4))'
        }}>
          {isSuccess ? '✅' : '❌'}
        </div>
        
        <h2 className="text-gradient" style={{ 
          fontSize: '1.5rem', 
          marginBottom: '1rem',
          background: isSuccess 
            ? 'linear-gradient(to right, #22c55e, #10b981)' 
            : 'linear-gradient(to right, #ef4444, #f87171)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {title || (isSuccess ? 'Success!' : 'Oops!')}
        </h2>
        
        <p style={{ 
          color: 'var(--text-main)', 
          marginBottom: '2rem', 
          lineHeight: '1.6',
          fontSize: '1rem'
        }}>
          {message}
        </p>
        
        <button 
          className={`btn ${isSuccess ? 'btn-primary' : 'btn-danger'}`}
          style={{ width: '100%', padding: '0.875rem' }}
          onClick={onClose}
        >
          {buttonText}
        </button>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .btn-danger {
          background: #ef4444;
          color: #fff;
          border: none;
        }
        .btn-danger:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default StatusModal;
