import React from 'react';

const ModernTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '2rem 3rem', backgroundColor: '#ffffff', color: '#1e293b', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #6366f1', paddingBottom: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#6366f1', marginBottom: '0.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <h2 style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '1rem', fontWeight: '500' }}>
          {personalDetails?.jobTitle || 'Your Job Title'}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails?.address && <span>• {personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>• {personalDetails.linkedin}</span>}
          {personalDetails?.github && <span>• {personalDetails.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Professional Summary</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#475569' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Sections Wrapper */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        
        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Experience</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>{item.jobTitle}</h4>
                    <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>{item.company}</div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                  </div>
                </div>
                {item.description && <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Education</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>{item.degree}</h4>
                    <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>{item.school}</div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {item.startDate} {item.endDate ? `- ${item.endDate}` : ''}
                  </div>
                </div>
                {item.description && <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Projects</h3>
            {projects.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                    {item.name} {item.link && <span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#6366f1', marginLeft: '0.5rem' }}>{item.link}</span>}
                  </h4>
                  {item.technologies && <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500', fontStyle: 'italic' }}>{item.technologies}</div>}
                </div>
                {item.description && <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((item, idx) => (
                <div key={idx} style={{ backgroundColor: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.95rem', color: '#334155', fontWeight: '500' }}>
                  {item.name} {item.level && <span style={{ opacity: 0.7, fontSize: '0.8rem', marginLeft: '0.25rem' }}>({item.level})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

export default ModernTemplate;
