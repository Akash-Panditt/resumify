import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';

const TEMPLATES = [
  { id: 'modern',      name: 'Modern',      description: 'Clean indigo accents with a professional feel.', minPlan: 'free' },
  { id: 'classic',     name: 'Classic',      description: 'Traditional serif layout, timeless and formal.',   minPlan: 'free' },
  { id: 'simple',      name: 'Simple',       description: 'Minimalist text-only layout, perfect for ATS.',     minPlan: 'free' },
  { id: 'compact',     name: 'Compact',      description: 'Dense, single-page layout for experienced pros.',   minPlan: 'free' },
  { id: 'basic',       name: 'Basic (Grey)', description: 'Clean layout with subtle grey accents.',           minPlan: 'free' },
  { id: 'minimalist',  name: 'Minimalist',   description: 'Ultra-clean whitespace, light & airy design.',    minPlan: 'premium' },
  { id: 'creative',    name: 'Creative',     description: 'Bold sidebar layout with skill bars & accent color.', minPlan: 'premium' },
  { id: 'professional', name: 'Professional',  description: 'Traditional corporate look with navy accents.',    minPlan: 'premium' },
  { id: 'indigo',      name: 'Indigo',        description: 'Modern layout with a bold indigo sidebar.',       minPlan: 'premium' },
  { id: 'gold',        name: 'Gold',          description: 'Elegant luxury-minimalist design with gold highlights.', minPlan: 'enterprise' },
  { id: 'ruby',        name: 'Ruby',          description: 'High-energy tech layout with ruby red accents.',   minPlan: 'premium' },
  { id: 'blueprint',   name: 'Blueprint',     description: 'Structured, technical design with teal/grey tones.', minPlan: 'premium' },
  { id: 'photo-free',  name: 'Photo (Free)',    description: 'Minimalist layout with a professional profile picture support.', minPlan: 'free' },
  { id: 'photo-premium', name: 'Photo (Pro)',   description: 'World-class sidebar layout with elegant photo integration.', minPlan: 'premium' },
];

const PLAN_RANK = { free: 0, premium: 1, enterprise: 2 };

const Templates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');
  const userPlan = user?.plan || 'free';

  const canAccess = (minPlan) => PLAN_RANK[userPlan] >= PLAN_RANK[minPlan];

  const handleSelect = async (templateId) => {
    if (!user?.token) return navigate('/login');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/resumes', { template: templateId }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      navigate(`/builder/${res.data._id}`);
    } catch (err) {
      console.error('Failed to create resume', err);
      alert(err.response?.data?.message || 'Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <header className="navbar">
        <div className="nav-container">
          <h1 className="text-gradient" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Select Template</h1>
          <div className="nav-links">
            <ThemeToggle />
            <span className={`badge ${userPlan === 'premium' ? 'badge-purple' : userPlan === 'enterprise' ? 'badge-success' : 'badge-primary'}`}>{userPlan} plan</span>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Dashboard</button>
          </div>
        </div>
      </header>

      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '1.05rem' }}>
        Select a template to start building your resume. Premium templates require an upgraded plan.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {TEMPLATES.map((t) => {
          const locked = !canAccess(t.minPlan);
          return (
            <div key={t.id} className="template-card" onClick={() => !locked && !loading && handleSelect(t.id)}>
              {locked && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '700', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>✨</span> Premium
                </div>
              )}
              {locked && (
                <div className="hover-lock-notice" style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'rgba(15, 23, 42, 0.2)', backdropFilter: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', borderRadius: 'var(--radius-lg)' }}>
                   <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }} onClick={(e) => { e.stopPropagation(); navigate('/pricing'); }}>Upgrade to Use</button>
                </div>
              )}

              <div className="template-preview" style={{ filter: locked ? 'blur(2px) grayscale(0.2)' : 'none', opacity: locked ? 0.7 : 1 }}>
                <div style={{ transform: 'scale(0.3)', transformOrigin: 'top center', width: '816px', pointerEvents: 'none' }}>
                  <TemplateMiniPreview templateId={t.id} />
                </div>
              </div>
              <div className="template-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3>{t.name}</h3>
                  {t.minPlan !== 'free' && <span className="badge badge-purple">{t.minPlan}</span>}
                </div>
                <p>{t.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Renders a tiny static preview of each template
const TemplateMiniPreview = ({ templateId }) => {
  const sampleData = {
    personalDetails: { fullName: 'Alex Johnson', jobTitle: 'Software Engineer', email: 'alex@example.com', summary: 'Passionate developer with 5+ years building modern web apps.' },
    experience: [{ jobTitle: 'Full Stack Dev', company: 'TechCorp', startDate: '2021', endDate: 'Present', description: 'Built scalable microservices.' }],
    education: [{ degree: 'B.S. Computer Science', school: 'MIT', startDate: '2017', endDate: '2021' }],
    skills: [{ name: 'React', level: 'Expert' }, { name: 'Node.js', level: 'Advanced' }, { name: 'PostgreSQL', level: 'Intermediate' }],
    projects: [{ name: 'Portfolio', technologies: 'React, Vite', description: 'A personal portfolio site.' }]
  };

  // Lazy import to avoid circular deps
  const templates = {
    modern: React.lazy(() => import('../../components/Templates/ModernTemplate')),
    classic: React.lazy(() => import('../../components/Templates/ClassicTemplate')),
    simple: React.lazy(() => import('../../components/Templates/SimpleTemplate')),
    compact: React.lazy(() => import('../../components/Templates/CompactTemplate')),
    basic: React.lazy(() => import('../../components/Templates/BasicTemplate')),
    minimalist: React.lazy(() => import('../../components/Templates/MinimalistTemplate')),
    creative: React.lazy(() => import('../../components/Templates/CreativeTemplate')),
    professional: React.lazy(() => import('../../components/Templates/ProfessionalTemplate')),
    indigo: React.lazy(() => import('../../components/Templates/IndigoTemplate')),
    gold: React.lazy(() => import('../../components/Templates/GoldTemplate')),
    ruby: React.lazy(() => import('../../components/Templates/RubyTemplate')),
    blueprint: React.lazy(() => import('../../components/Templates/BlueprintTemplate')),
    'photo-free': React.lazy(() => import('../../components/Templates/PhotoFreeTemplate')),
    'photo-premium': React.lazy(() => import('../../components/Templates/PhotoPremiumTemplate')),
  };

  const TemplateComponent = templates[templateId];
  if (!TemplateComponent) return <div style={{ padding: '2rem', color: '#999' }}>Preview unavailable</div>;

  return (
    <React.Suspense fallback={<div style={{ padding: '2rem', color: '#ccc' }}>Loading...</div>}>
      <TemplateComponent data={sampleData} />
    </React.Suspense>
  );
};

export default Templates;

// Inject hover styles for the lock notice
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .template-card:hover .hover-lock-notice {
      opacity: 1 !important;
      backdrop-filter: blur(2px) !important;
    }
  `;
  document.head.appendChild(style);
}
