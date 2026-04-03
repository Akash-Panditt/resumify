import React from 'react';

const ProjectsForm = ({ projects, onChange, onAdd, onRemove }) => {
  return (
    <div>
      {projects.map((item, index) => (
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
              <label className="form-label">Project Name</label>
              <input className="form-input" value={item.name} onChange={(e) => onChange(index, 'name', e.target.value)} placeholder="Ecommerce Dashboard" />
            </div>
            <div className="form-group">
              <label className="form-label">Live Link / GitHub URI</label>
              <input className="form-input" value={item.link} onChange={(e) => onChange(index, 'link', e.target.value)} placeholder="https://..." />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Technologies Used</label>
              <input className="form-input" value={item.technologies} onChange={(e) => onChange(index, 'technologies', e.target.value)} placeholder="React, Node.js, PosgreSQL" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description</label>
              <textarea className="form-input" rows="3" value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="Built a highly performant application that..."></textarea>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={onAdd} style={{ width: '100%', borderStyle: 'dashed' }}>+ Add Project</button>
    </div>
  );
};

export default ProjectsForm;
