import React from 'react';

const ClassicTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '2.5rem 3rem', backgroundColor: '#ffffff', color: '#1a1a1a', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Header */}
      <div style={{ borderBottom: '3px double #333', paddingBottom: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1.1rem', color: '#555', fontStyle: 'italic', marginBottom: '0.75rem' }}>
          {personalDetails?.jobTitle || 'Your Title'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#666' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>| {personalDetails.phone}</span>}
          {personalDetails?.address && <span>| {personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>| {personalDetails.linkedin}</span>}
          {personalDetails?.github && <span>| {personalDetails.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Summary</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#333', textAlign: 'justify' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Experience</h3>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.95rem' }}>{item.jobTitle}</strong>
                <span style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>{item.company}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.95rem' }}>{item.degree}</strong>
                <span style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>{item.startDate} - {item.endDate}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>{item.school}</div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Skills</h3>
          <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.8' }}>
            {skills.map((s, i) => <span key={i}>{s.name}{s.level ? ` (${s.level})` : ''}{i < skills.length - 1 ? ' • ' : ''}</span>)}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '0.25rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projects</h3>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>{item.name}</strong>
              {item.technologies && <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: '0.5rem' }}>({item.technologies})</span>}
              {item.link && <span style={{ fontSize: '0.85rem', color: '#0066cc', marginLeft: '0.5rem' }}>{item.link}</span>}
              {item.description && <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ClassicTemplate;
