import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../../components/ThemeToggle';
import AIEnhancer from '../../components/AIEnhancer';
import ATSGuidePopover from '../../components/ATSGuidePopover';

import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    title: 'Untitled Resume',
    template: 'modern',
    personalDetails: { fullName: '', jobTitle: '', email: '', phone: '', address: '', linkedin: '', github: '', summary: '', photo: null },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });

  const steps = ['Personal Details', 'Education', 'Experience', 'Skills', 'Projects'];

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('resumify_user'));
        if (!user) return navigate('/login');
        
        const res = await axios.get(`http://localhost:5000/api/resumes/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        // Merge fetched data defensively
        setResumeData({
          title: res.data.title || 'Untitled Resume',
          template: res.data.template || 'modern',
          personalDetails: res.data.personalDetails || { fullName: '', jobTitle: '', email: '', phone: '', address: '', linkedin: '', github: '', summary: '' },
          education: res.data.education || [],
          experience: res.data.experience || [],
          skills: res.data.skills || [],
          projects: res.data.projects || []
        });
      } catch (err) {
        console.error('Failed to load resume', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const handleSave = async (showNotification = true) => {
    setIsSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('resumify_user'));
      if (!user) return navigate('/login');
      
      await axios.put(`http://localhost:5000/api/resumes/${id}`, resumeData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (showNotification) alert('Resume saved successfully!');
      return true;
    } catch (err) {
      console.error('Failed to save resume', err);
      alert('Save failed. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleNavigate = async (path) => {
    const success = await handleSave(false);
    if (success) {
      navigate(path);
    }
  };

  const handlePersonalChange = (e) => {
    setResumeData({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, [e.target.name]: e.target.value }
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Image size exceeds 1MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData({
          ...resumeData,
          personalDetails: { ...resumeData.personalDetails, photo: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setResumeData({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, photo: null }
    });
  };

  // --- Generic Array Handlers ---
  const addArrayItem = (field, defaultObject) => {
    setResumeData({
      ...resumeData,
      [field]: [...resumeData[field], defaultObject]
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...resumeData[field]];
    newArray.splice(index, 1);
    setResumeData({
      ...resumeData,
      [field]: newArray
    });
  };

  const updateArrayItem = (field, index, key, value) => {
    const newArray = [...resumeData[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setResumeData({
      ...resumeData,
      [field]: newArray
    });
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h1 className="text-gradient">Resumify Builder</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ThemeToggle />
            <button 
              className="btn btn-secondary" 
              onClick={() => handleNavigate('/dashboard')}
              disabled={isSaving}
            >
              Dashboard
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleNavigate(`/preview/${id}`)}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Preview'}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => handleSave(true)}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>
        {/* Sidebar / Steps */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Sections</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {steps.map((step, index) => (
              <button 
                key={index}
                className={`btn ${activeStep === index ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                onClick={() => setActiveStep(index)}
              >
                {index + 1}. {step}
              </button>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
            <h2>{steps[activeStep]}</h2>
            <div className="form-group" style={{ marginBottom: 0, flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Resume Title:</label>
              <input 
                className="form-input" 
                style={{ width: '200px', padding: '0.25rem 0.5rem' }}
                value={resumeData.title}
                onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                placeholder="Software Engineer Role"
              />
            </div>
          </div>

          {activeStep === 0 && (
            <div>
              {['photo-free', 'photo-premium'].includes(resumeData.template) ? (
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center', background: 'rgba(99, 102, 241, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: 'var(--radius-lg)', border: '2px dashed var(--surface-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
                    {resumeData.personalDetails?.photo ? (
                      <>
                        <img src={resumeData.personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          onClick={removePhoto}
                          style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Remove Photo"
                        >✕</button>
                      </>
                    ) : (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        <span>📷</span>
                        <p>Profile Photo</p>
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                     <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block', color: 'var(--primary)', fontWeight: '700' }}>✨ Photo-Enabled Layout</label>
                     <input 
                       type="file" 
                       accept="image/*"
                       onChange={handlePhotoUpload}
                       className="form-input" 
                       style={{ padding: '0.5rem' }}
                     />
                     <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Upload a professional headshot for this template.</p>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  💡 Change template to a <strong>"Photo"</strong> layout to enable profile pictures.
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input name="fullName" className="form-input" value={resumeData.personalDetails?.fullName || ''} onChange={handlePersonalChange} />
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                  <label className="form-label">Job Title</label>
                  <input name="jobTitle" className="form-input" value={resumeData.personalDetails?.jobTitle || ''} onChange={handlePersonalChange} />
                  <ATSGuidePopover jobTitle={resumeData.personalDetails?.jobTitle} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input name="email" type="email" className="form-input" value={resumeData.personalDetails?.email || ''} onChange={handlePersonalChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input name="phone" className="form-input" value={resumeData.personalDetails?.phone || ''} onChange={handlePersonalChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input name="linkedin" className="form-input" value={resumeData.personalDetails?.linkedin || ''} onChange={handlePersonalChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub/Portfolio</label>
                  <input name="github" className="form-input" value={resumeData.personalDetails?.github || ''} onChange={handlePersonalChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Address</label>
                  <input name="address" className="form-input" value={resumeData.personalDetails?.address || ''} onChange={handlePersonalChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Professional Summary</label>
                    <AIEnhancer 
                      text={resumeData.personalDetails?.summary || ''} 
                      onApply={(val) => setResumeData({
                        ...resumeData,
                        personalDetails: { ...resumeData.personalDetails, summary: val }
                      })}
                      type="summary"
                    />
                  </div>
                  <textarea name="summary" className="form-input" rows="5" value={resumeData.personalDetails?.summary || ''} onChange={handlePersonalChange}></textarea>
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <EducationForm 
              education={resumeData.education} 
              onChange={(index, key, val) => updateArrayItem('education', index, key, val)}
              onAdd={() => addArrayItem('education', { degree: '', school: '', startDate: '', endDate: '', description: '' })}
              onRemove={(index) => removeArrayItem('education', index)}
            />
          )}

          {activeStep === 2 && (
            <ExperienceForm 
              experience={resumeData.experience} 
              onChange={(index, key, val) => updateArrayItem('experience', index, key, val)}
              onAdd={() => addArrayItem('experience', { jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}
              onRemove={(index) => removeArrayItem('experience', index)}
            />
          )}

          {activeStep === 3 && (
            <SkillsForm 
              skills={resumeData.skills} 
              onChange={(index, key, val) => updateArrayItem('skills', index, key, val)}
              onAdd={() => addArrayItem('skills', { name: '', level: 'Intermediate' })}
              onRemove={(index) => removeArrayItem('skills', index)}
            />
          )}

          {activeStep === 4 && (
            <ProjectsForm 
              projects={resumeData.projects} 
              onChange={(index, key, val) => updateArrayItem('projects', index, key, val)}
              onAdd={() => addArrayItem('projects', { name: '', link: '', technologies: '', description: '' })}
              onRemove={(index) => removeArrayItem('projects', index)}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default Builder;
