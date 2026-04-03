import React from 'react';

const MinimalistTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3rem', backgroundColor: '#ffffff', color: '#111', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '300', color: '#111', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '1rem', color: '#888', fontWeight: '300', marginBottom: '1rem' }}>
          {personalDetails?.jobTitle || 'Your Title'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>{personalDetails.linkedin}</span>}
          {personalDetails?.github && <span>{personalDetails.github}</span>}
        </div>
      </div>

      <div style={{ width: '100%', height: '1px', background: '#eee', marginBottom: '2rem' }}></div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#555', fontWeight: '300' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: '500' }}>Experience</h3>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#111', margin: 0 }}>{item.jobTitle} <span style={{ fontWeight: '300', color: '#888' }}>at {item.company}</span></h4>
                <span style={{ fontSize: '0.8rem', color: '#aaa', flexShrink: 0 }}>{item.startDate} — {item.endDate}</span>
              </div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.7', marginTop: '0.5rem', fontWeight: '300', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: '500' }}>Education</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#111', margin: 0 }}>{item.degree} <span style={{ fontWeight: '300', color: '#888' }}>— {item.school}</span></h4>
                <span style={{ fontSize: '0.8rem', color: '#aaa', flexShrink: 0 }}>{item.startDate} — {item.endDate}</span>
              </div>
              {item.description && <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', marginTop: '0.25rem', fontWeight: '300' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', fontWeight: '500' }}>Projects</h3>
          {projects.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#111', margin: 0 }}>{item.name}</h4>
              {item.technologies && <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.15rem' }}>{item.technologies}</div>}
              {item.description && <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', marginTop: '0.25rem', fontWeight: '300' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h3 style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', fontWeight: '500' }}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: '0.85rem', color: '#555', padding: '0.2rem 0.6rem', border: '1px solid #e5e5e5', borderRadius: '2px', fontWeight: '300' }}>{s.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default MinimalistTemplate;
