import React from 'react';

const RubyTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3.5rem 3rem', backgroundColor: '#ffffff', color: '#1e293b', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
      {/* Header - Modern & Tech Focus */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', borderBottom: '4px solid #be123c', paddingBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '3rem', color: '#111827', marginBottom: '0.25rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
            {personalDetails?.fullName || 'Your Name'}
          </h1>
          <h2 style={{ fontSize: '1.25rem', color: '#be123c', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {personalDetails?.jobTitle || 'Your Job Title'}
          </h2>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {personalDetails?.email && <div>{personalDetails.email} ✉️</div>}
          {personalDetails?.phone && <div>{personalDetails.phone} 📞</div>}
          {personalDetails?.linkedin && <div>LinkedIn 🔗</div>}
          {personalDetails?.github && <div>GitHub 🐙</div>}
        </div>
      </div>

      {/* Profile Section */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#111827', marginBottom: '1rem', fontWeight: '800', textTransform: 'uppercase' }}>Professional Overview</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4b5563', paddingLeft: '1.5rem', borderLeft: '3px solid #be123c' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Grid Layout for Skills and Experience */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: '3rem' }}>
        
        {/* Left Column - Experience and Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', color: '#111827', marginBottom: '1.5rem', fontWeight: '800', textTransform: 'uppercase' }}>Core Experience</h3>
              {experience.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#111827', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.jobTitle}</span>
                    <span style={{ fontSize: '0.8rem', color: '#be123c' }}>{item.startDate} — {item.endDate || 'Present'}</span>
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: '600', marginBottom: '0.5rem' }}>{item.company}</div>
                  {item.description && <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', color: '#111827', marginBottom: '1.25rem', fontWeight: '800', textTransform: 'uppercase' }}>Selected Projects</h3>
              {projects.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Skills and Education */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', color: '#111827', marginBottom: '1.25rem', fontWeight: '800', textTransform: 'uppercase' }}>Technical Stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((item, idx) => (
                  <div key={idx} style={{ padding: '0.3rem 0.6rem', border: '1px solid #be123c', color: '#be123c', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', color: '#111827', marginBottom: '1.25rem', fontWeight: '800', textTransform: 'uppercase' }}>Education</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827' }}>{item.degree}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '0.25rem' }}>{item.school}</div>
                  <div style={{ fontSize: '0.75rem', color: '#be123c' }}>{item.startDate} — {item.endDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
});

export default RubyTemplate;
