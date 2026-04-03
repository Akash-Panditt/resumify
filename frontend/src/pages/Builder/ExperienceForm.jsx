import React from 'react';
import AIEnhancer from '../../components/AIEnhancer';

const ExperienceForm = ({ experience, onChange, onAdd, onRemove }) => {
  return (
    <div>
      {experience.map((item, index) => (
        <div key={index} className="card" style={{ marginBottom: '1.5rem', position: 'relative', border: '1px solid var(--border-color)', background: 'transparent' }}>
          <button 
            type="button" 
            onClick={() => onRemove(index)}
            className="btn btn-secondary"
            style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.5rem', background: '#ef4444', color: '#fff', border: 'none' }}
          >
            Remove
          </button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input className="form-input" value={item.jobTitle} onChange={(e) => onChange(index, 'jobTitle', e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input className="form-input" value={item.company} onChange={(e) => onChange(index, 'company', e.target.value)} placeholder="Google" />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input className="form-input" value={item.startDate} onChange={(e) => onChange(index, 'startDate', e.target.value)} placeholder="Jun 2022" />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input className="form-input" value={item.endDate} onChange={(e) => onChange(index, 'endDate', e.target.value)} placeholder="Present" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Responsibilities / Achievements</label>
                <AIEnhancer 
                  text={item.description} 
                  onApply={(val) => onChange(index, 'description', val)}
                  type="experience"
                />
              </div>
              <textarea className="form-input" rows="4" value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="• Developed feature X using React..."></textarea>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={onAdd} style={{ width: '100%', borderStyle: 'dashed' }}>+ Add Experience</button>
    </div>
  );
};

export default ExperienceForm;
