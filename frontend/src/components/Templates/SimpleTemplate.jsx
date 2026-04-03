import React from 'react';

const SimpleTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3rem 3rem', backgroundColor: '#ffffff', color: '#000000', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Times New Roman, serif' }}>
      {/* Header - Simple & ATS Friendly */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem', fontWeight: '700' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '0.9rem', color: '#333' }}>
          {personalDetails?.email} | {personalDetails?.phone} | {personalDetails?.address}
        </div>
        {personalDetails?.linkedin && <div style={{ fontSize: '0.9rem', color: '#333' }}>{personalDetails.linkedin}</div>}
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid #000', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase' }}>Summary</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.4' }}>{personalDetails.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid #000', marginBottom: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Experience</h3>
          {experience.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>{item.jobTitle}, {item.company}</span>
                <span>{item.startDate} — {item.endDate || 'Present'}</span>
              </div>
              {item.description && <p style={{ fontSize: '1rem', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid #000', marginBottom: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Education</h3>
          {education.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>{item.degree}, {item.school}</span>
                <span>{item.startDate} — {item.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid #000', marginBottom: '0.5rem', fontWeight: '700', textTransform: 'uppercase' }}>Skills</h3>
          <p style={{ fontSize: '1rem' }}>
            {skills.map(s => s.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
});

export default SimpleTemplate;
