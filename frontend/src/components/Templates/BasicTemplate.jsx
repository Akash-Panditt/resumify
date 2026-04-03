import React from 'react';

const BasicTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '3.5rem 3rem', backgroundColor: '#ffffff', color: '#374151', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Roboto, sans-serif' }}>
      {/* Header - Basic Grey */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '2rem', borderRadius: '4px', marginBottom: '2.5rem', borderLeft: '8px solid #9ca3af' }}>
        <h1 style={{ fontSize: '2.25rem', color: '#111827', marginBottom: '0.25rem', fontWeight: '800' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <h2 style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '1rem', fontWeight: '500' }}>
          {personalDetails?.jobTitle}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
          {personalDetails?.email && <span>✉️ {personalDetails.email}</span>}
          {personalDetails?.phone && <span>📞 {personalDetails.phone}</span>}
          {personalDetails?.address && <span>📍 {personalDetails.address}</span>}
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        
        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '1.25rem', fontWeight: '800' }}>WORK EXPERIENCE</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>{item.jobTitle}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280', margin: '0.2rem 0 0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>{item.company}</span>
                  <span>{item.startDate} — {item.endDate}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5' }}>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education & Skills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
           <div>
              <h3 style={{ fontSize: '1rem', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '1rem', fontWeight: '800' }}>EDUCATION</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.degree}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{item.school} | {item.startDate} — {item.endDate}</div>
                </div>
              ))}
           </div>
           <div>
              <h3 style={{ fontSize: '1rem', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '1rem', fontWeight: '800' }}>SKILLS</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map((s, idx) => (
                  <span key={idx} style={{ fontSize: '0.8rem', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{s.name}</span>
                ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
});

export default BasicTemplate;
