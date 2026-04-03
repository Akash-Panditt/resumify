import React from 'react';

const IndigoTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ display: 'flex', backgroundColor: '#ffffff', color: '#1e293b', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: '#4f46e5', color: '#ffffff', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.4rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e0e7ff' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
            {personalDetails?.email && <div>✉️ {personalDetails.email}</div>}
            {personalDetails?.phone && <div>📞 {personalDetails.phone}</div>}
            {personalDetails?.linkedin && <div>🔗 LinkedIn</div>}
            {personalDetails?.github && <div>🐙 GitHub</div>}
            {personalDetails?.address && <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>📍 {personalDetails.address}</div>}
          </div>
        </div>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.4rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e0e7ff' }}>Technical Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skills.map((item, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{item.level}</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', background: '#ffffff', borderRadius: '2px', width: item.level === 'Expert' ? '100%' : item.level === 'Advanced' ? '80%' : item.level === 'Intermediate' ? '60%' : '40%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3.5rem 2.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e1b4b', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{personalDetails?.fullName || 'Your Name'}</h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#4338ca', marginBottom: '1rem' }}>{personalDetails?.jobTitle || 'Your Job Title'}</h2>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#475569' }}>{personalDetails?.summary}</p>
        </div>

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e1b4b', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #4f46e5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b' }}>{item.jobTitle}</h4>
                  <span style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: '600' }}>{item.startDate} — {item.endDate}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600', marginBottom: '0.5rem' }}>{item.company}</div>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e1b4b', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>{item.degree}</h4>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.startDate} — {item.endDate}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#475569' }}>{item.school}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default IndigoTemplate;
