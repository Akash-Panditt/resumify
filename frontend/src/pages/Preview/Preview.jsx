import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import ThemeToggle from '../../components/ThemeToggle';
import UpgradeModal from '../../components/UpgradeModal';
import ModernTemplate from '../../components/Templates/ModernTemplate';
import ClassicTemplate from '../../components/Templates/ClassicTemplate';
import MinimalistTemplate from '../../components/Templates/MinimalistTemplate';
import CreativeTemplate from '../../components/Templates/CreativeTemplate';
import ProfessionalTemplate from '../../components/Templates/ProfessionalTemplate';
import IndigoTemplate from '../../components/Templates/IndigoTemplate';
import GoldTemplate from '../../components/Templates/GoldTemplate';
import RubyTemplate from '../../components/Templates/RubyTemplate';
import BlueprintTemplate from '../../components/Templates/BlueprintTemplate';
import SimpleTemplate from '../../components/Templates/SimpleTemplate';
import CompactTemplate from '../../components/Templates/CompactTemplate';
import BasicTemplate from '../../components/Templates/BasicTemplate';
import PhotoFreeTemplate from '../../components/Templates/PhotoFreeTemplate';
import PhotoPremiumTemplate from '../../components/Templates/PhotoPremiumTemplate';

const TEMPLATE_MAP = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  indigo: IndigoTemplate,
  gold: GoldTemplate,
  ruby: RubyTemplate,
  blueprint: BlueprintTemplate,
  simple: SimpleTemplate,
  compact: CompactTemplate,
  basic: BasicTemplate,
  'photo-free': PhotoFreeTemplate,
  'photo-premium': PhotoPremiumTemplate,
};

const PLAN_LIMITS = { free: 3, premium: 50, enterprise: Infinity };

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalData, setUpgradeModalData] = useState(null);
  const componentRef = useRef();

  const user = JSON.parse(localStorage.getItem('resumify_user') || '{}');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        if (!user?.token) return navigate('/login');
        
        const res = await axios.get(`http://localhost:5000/api/resumes/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setResumeData(res.data);
      } catch (err) {
        console.error('Failed to load resume', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: resumeData?.title || 'Resume_Export',
  });

  const handleDownload = async () => {
    if (!user?.token) return navigate('/login');
    setDownloading(true);
    try {
      // Call download tracking endpoint first
      const res = await axios.post(`http://localhost:5000/api/resumes/download/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (res.data.allowed) {
        // Update local user download count
        const updatedUser = { ...user, download_count: res.data.download_count };
        localStorage.setItem('resumify_user', JSON.stringify(updatedUser));
        handlePrint();
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setUpgradeModalData(err.response.data);
        setIsUpgradeModalOpen(true);
      } else {
        console.error('Download failed', err);
        alert('Download failed. Please try again.');
      }
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Preview...</div>;
  if (!resumeData) return <div style={{ padding: '2rem', textAlign: 'center' }}>Resume not found.</div>;

  const TemplateComponent = TEMPLATE_MAP[resumeData.template] || ModernTemplate;
  const maxDownloads = PLAN_LIMITS[user?.plan] || 1;
  const currentDownloads = user?.download_count || 0;
  const downloadsRemaining = Math.max(0, maxDownloads - currentDownloads);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh' }}>
      
      {/* Action Bar */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{resumeData.title}</h1>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Template: <span className="badge badge-primary">{resumeData.template}</span> • Last updated: {new Date(resumeData.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ThemeToggle />
          <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Downloads remaining</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: downloadsRemaining <= 0 ? 'var(--error)' : 'var(--success)' }}>
              {maxDownloads === Infinity ? '∞' : downloadsRemaining}
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(`/builder/${id}`)}>Back to Builder</button>
          <button 
            className="btn btn-primary" 
            onClick={handleDownload} 
            disabled={downloading}
            style={{ padding: '0.75rem 1.5rem' }}
          >
            {downloading ? 'Processing...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Template Viewer */}
      <div style={{ 
        flex: 1,
        padding: '3rem', 
        backgroundColor: 'rgba(15, 23, 42, 0.4)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--surface-border)',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
           <TemplateComponent ref={componentRef} data={resumeData} />
        </div>
      </div>
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        data={upgradeModalData} 
      />
    </div>
  );
};

export default Preview;
