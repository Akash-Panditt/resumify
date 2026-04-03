import React from 'react';

const CompactTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '2rem 2rem', backgroundColor: '#ffffff', color: '#1e293b', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Calibri, sans-serif' }}>
      {/* Header - Compact */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>{personalDetails?.fullName || 'Your Name'}</h1>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: '#64748b' }}>{personalDetails?.jobTitle}</h2>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#475569' }}>
          <div>{personalDetails?.email} • {personalDetails?.phone}</div>
          <div>{personalDetails?.address} • {personalDetails?.linkedin}</div>
        </div>
      </div>

      {/* Summary - Compact */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#475569' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience - Compact */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', borderBottom: '1px solid #e2e8f0', marginBottom: '0.5rem', color: '#0f172a' }}>EXPERIENCE</h3>
        {experience.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '700' }}>
              <span>{item.jobTitle} | {item.company}</span>
              <span style={{ fontWeight: '400', fontSize: '0.85rem' }}>{item.startDate} — {item.endDate || 'Present'}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.1rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Education & Skills - Side by Side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', borderBottom: '1px solid #e2e8f0', marginBottom: '0.5rem', color: '#0f172a' }}>EDUCATION</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: '700' }}>{item.degree}</div>
              <div style={{ color: '#475569' }}>{item.school} | {item.startDate} — {item.endDate}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', borderBottom: '1px solid #e2e8f0', marginBottom: '0.5rem', color: '#0f172a' }}>SKILLS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
            {skills.map((s, idx) => (
              <span key={idx} style={{ fontSize: '0.85rem', background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>{s.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CompactTemplate;
