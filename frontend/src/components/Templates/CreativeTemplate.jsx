import React from 'react';

const CreativeTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  const accentColor = '#7c3aed';

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: '#1e1b4b', color: '#fff', padding: '2rem 1.5rem' }}>
        {/* Name */}
        <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.25rem', lineHeight: '1.3' }}>
            {personalDetails?.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '0.9rem', color: accentColor, fontWeight: '500' }}>
            {personalDetails?.jobTitle || 'Your Title'}
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
            {personalDetails?.email && <span>📧 {personalDetails.email}</span>}
            {personalDetails?.phone && <span>📱 {personalDetails.phone}</span>}
            {personalDetails?.address && <span>📍 {personalDetails.address}</span>}
            {personalDetails?.linkedin && <span>🔗 {personalDetails.linkedin}</span>}
            {personalDetails?.github && <span>💻 {personalDetails.github}</span>}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '0.2rem' }}>{s.name}</div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%',
                      borderRadius: '2px',
                      background: accentColor,
                      width: s.level === 'Expert' ? '100%' : s.level === 'Advanced' ? '80%' : s.level === 'Intermediate' ? '60%' : '35%'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>Education</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{item.degree}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{item.school}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{item.startDate} - {item.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem 2.5rem', color: '#1a1a1a' }}>
        {/* Summary */}
        {personalDetails?.summary && (
          <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: `2px solid ${accentColor}20` }}>
            <h3 style={{ fontSize: '0.75rem', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem', fontWeight: '600' }}>About Me</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#444' }}>{personalDetails.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem', fontWeight: '600' }}>Work Experience</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem', paddingLeft: '1rem', borderLeft: `3px solid ${accentColor}` }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>{item.jobTitle}</h4>
                <div style={{ fontSize: '0.9rem', color: accentColor, fontWeight: '500' }}>{item.company}</div>
                <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem' }}>{item.startDate} — {item.endDate}</div>
                {item.description && <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.75rem', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem', fontWeight: '600' }}>Projects</h3>
            {projects.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: `3px solid ${accentColor}30` }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>{item.name}</h4>
                {item.technologies && <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '500' }}>{item.technologies}</div>}
                {item.description && <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', marginTop: '0.25rem' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default CreativeTemplate;
