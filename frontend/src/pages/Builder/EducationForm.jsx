import React from 'react';

const EducationForm = ({ education, onChange, onAdd, onRemove }) => {
  return (
    <div>
      {education.map((item, index) => (
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
              <label className="form-label">Degree / Program</label>
              <input className="form-input" value={item.degree} onChange={(e) => onChange(index, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
            </div>
            <div className="form-group">
              <label className="form-label">School / University</label>
              <input className="form-input" value={item.school} onChange={(e) => onChange(index, 'school', e.target.value)} placeholder="Stanford University" />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input className="form-input" value={item.startDate} onChange={(e) => onChange(index, 'startDate', e.target.value)} placeholder="Aug 2018" />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input className="form-input" value={item.endDate} onChange={(e) => onChange(index, 'endDate', e.target.value)} placeholder="May 2022" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description (Optional)</label>
              <textarea className="form-input" rows="3" value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="Relevant coursework, honors, GPA, etc."></textarea>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={onAdd} style={{ width: '100%', borderStyle: 'dashed' }}>+ Add Education</button>
    </div>
  );
};

export default EducationForm;
