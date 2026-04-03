import React from 'react';

const GoldTemplate = React.forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} style={{ padding: '4rem 4rem', backgroundColor: '#ffffff', color: '#334155', minHeight: '1056px', width: '816px', margin: '0 auto', fontFamily: 'Lora, serif' }}>
      {/* Header - Elegant & Minimalist */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '0.75rem', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        <h2 style={{ fontSize: '1.1rem', color: '#b8860b', marginBottom: '1.25rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {personalDetails?.jobTitle || 'Your Job Title'}
        </h2>
        <div style={{ width: '40px', height: '1px', background: '#b8860b', margin: '0 auto 1.5rem' }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
          {personalDetails?.email && <span>{personalDetails.email}</span>}
          {personalDetails?.phone && <span>{personalDetails.phone}</span>}
          {personalDetails?.address && <span>{personalDetails.address}</span>}
          {personalDetails?.linkedin && <span>LinkedIn</span>}
        </div>
      </div>

      {/* Summary */}
      {personalDetails?.summary && (
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#444', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>"{personalDetails.summary}"</p>
        </div>
      )}

      {/* Sections Wrapper */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
        
        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #eee', paddingBottom: '0.75rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700', textAlign: 'center' }}>Experience History</h3>
            {experience.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a' }}>{item.jobTitle}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#b8860b', fontWeight: '600', textTransform: 'uppercase' }}>
                    {item.startDate} — {item.endDate || 'Present'}
                  </div>
                </div>
                <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: '600', marginBottom: '0.75rem' }}>{item.company}</div>
                {item.description && <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education & Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
          {/* Education column */}
          {education && education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.9rem', color: '#1a1a1a', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>Academic</h3>
              {education.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#334155', marginBottom: '0.25rem' }}>{item.degree}</h4>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{item.school}</div>
                  <div style={{ fontSize: '0.8rem', color: '#b8860b', marginTop: '0.25rem' }}>{item.startDate} — {item.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills column */}
          {skills && skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.9rem', color: '#1a1a1a', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>Expertise</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map((item, idx) => (
                  <span key={idx} style={{ fontSize: '0.9rem', color: '#444', border: '1px solid #eee', padding: '0.2rem 0.5rem', borderRadius: '2px' }}>{item.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default GoldTemplate;
