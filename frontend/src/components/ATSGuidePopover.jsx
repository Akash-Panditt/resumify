import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ATSGuidePopover = ({ jobTitle }) => {
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!jobTitle || jobTitle.trim().length < 3) {
      setGuideData(null);
      setError(null);
      return;
    }

    const fetchGuide = async () => {
      setLoading(true);
      setError(null);
      setIsOpen(true);
      try {
        const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');
        
        const res = await axios.post('http://localhost:5000/api/ai/ats-guide', 
          { jobTitle },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        
        setGuideData(res.data.guide);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Backend error occurred.");
        } else {
          // network error or other
          setError("Connection failed. Is the backend running?");
          console.error(err);
        }
        setGuideData(null);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchGuide();
    }, 1000); // 1-second debounce

    return () => clearTimeout(debounceTimer);
  }, [jobTitle]);

  if (!loading && !guideData && !error) return null;
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: '10px',
      zIndex: 100,
      width: '350px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      borderRadius: '12px',
      padding: '1.25rem',
      animation: 'fadeIn 0.3s ease-in-out',
      color: '#333'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5' }}>
          <span style={{ fontSize: '1.2rem' }}>✨</span> ATS Keyword Guide
        </h4>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#888' }}
        >
          ✕
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: '#666', fontSize: '0.9rem' }}>
           <div className="spinner" style={{ border: '2px solid #f3f3f3', borderTop: '2px solid #4f46e5', borderRadius: '50%', width: '20px', height: '20px', animation: 'spin 1s linear infinite', margin: '0 auto 10px auto' }}></div>
           <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          Analyzing market trends for "{jobTitle}"...
        </div>
      ) : error ? (
        <div style={{ fontSize: '0.85rem', color: '#d97706', background: '#fef3c7', padding: '0.75rem', borderRadius: '6px' }}>
          <strong>⚠️ Warning:</strong> {error}
        </div>
      ) : guideData ? (
        <div>
          <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '1rem', fontStyle: 'italic', lineHeight: 1.4 }}>
            {guideData.why}
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ fontSize: '0.8rem', color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Top 5 Critical Keywords</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {guideData.keywords.map((kw, i) => (
                <span key={i} style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '500' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ fontSize: '0.8rem', color: '#111', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Top Action Verbs</strong>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
               {guideData.actionVerbs.map((verb, i) => (
                 <span key={i} style={{ background: '#fce7f3', color: '#be185d', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '500' }}>
                   {verb}
                 </span>
               ))}
            </div>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
            <strong style={{ fontSize: '0.75rem', color: '#1e40af', display: 'block', marginBottom: '4px' }}>FORMATTING TIP</strong>
            <p style={{ fontSize: '0.75rem', margin: 0, color: '#475569', lineHeight: 1.4 }}>
              {guideData.formattingTip}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ATSGuidePopover;
