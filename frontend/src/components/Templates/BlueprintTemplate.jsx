import React from 'react';

const BlueprintTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3.5rem 3.5rem', backgroundColor: '#f8fafc', color: '#334155', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Courier New, monospace', border: '20px solid #ffffff', boxShadow: 'inset 0 0 0 1px #e2e8f0' }}>
      {/* Header - Technical & Structured */}
      <div style={{ paddingBottom: '2.5rem', borderBottom: '1px solid #94a3b8', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: '900', letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <h2 style={{ fontSize: '1.1rem', color: '#0d9488', fontWeight: '700', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {personalDetails?.jobTitle || 'Your Job Title'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
          {personalDetails?.email && <div>E: {personalDetails.email}</div>}
          {personalDetails?.phone && <div>P: {personalDetails.phone}</div>}
          {personalDetails?.linkedin && <div>L: {personalDetails.linkedin}</div>}
          {personalDetails?.github && <div>G: {personalDetails.github}</div>}
          {personalDetails?.address && <div style={{ gridColumn: '1 / -1' }}>A: {personalDetails.address}</div>}
        </div>
      </div>

      {/* Sections Wrapper */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
        
        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#e2e8f0', padding: '0.2rem 0.5rem', marginBottom: '1.25rem', fontWeight: '800', width: 'fit-content' }}>[01] EXPERIENCE</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.75rem', borderLeft: '1px dashed #94a3b8', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>{item.jobTitle}</h4>
                <div style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: '700', marginBottom: '0.5rem' }}>{item.company} // {item.startDate} — {item.endDate || 'Present'}</div>
                {item.description && <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Technical Stack */}
        {skills && skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#e2e8f0', padding: '0.2rem 0.5rem', marginBottom: '1rem', fontWeight: '800', width: 'fit-content' }}>[02] TECHNICAL_STACK</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.85rem' }}>
              {skills.map((item, idx) => (
                <div key={idx} style={{ color: '#0d9488', fontWeight: '700' }}>#{item.name}</div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', backgroundColor: '#e2e8f0', padding: '0.2rem 0.5rem', marginBottom: '1.25rem', fontWeight: '800', width: 'fit-content' }}>[03] EDUCATION</h3>
            {education.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>{item.degree}</h4>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.school} // {item.startDate} — {item.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default BlueprintTemplate;
