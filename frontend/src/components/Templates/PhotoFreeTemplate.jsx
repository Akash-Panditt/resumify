import React, { forwardRef } from 'react';

const PhotoFreeTemplate = forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  return (
    <div ref={ref} className="resume-paper" style={{ padding: '40px', color: '#334155', fontFamily: 'var(--font-sans)', minHeight: '1123px', width: '794px', backgroundColor: '#fff', boxSizing: 'border-box' }}>
      {/* Header with Photo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', pb: '20px' }}>
        {personalDetails?.photo ? (
          <img 
            src={personalDetails.photo} 
            alt="Profile" 
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '4px solid #f1f5f9' }} 
          />
        ) : (
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', color: '#94a3b8', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: '500' }}>
            No Photo
          </div>
        )}
        <h1 style={{ margin: '0 0 5px 0', fontSize: '2.5rem', color: '#0f172a', fontWeight: '700' }}>{personalDetails.fullName}</h1>
        <p style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#6366f1', fontWeight: '600' }}>{personalDetails.jobTitle}</p>
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#64748b', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>{personalDetails.email}</span>
          <span>{personalDetails.phone}</span>
          <span>{personalDetails.linkedin}</span>
          <span>{personalDetails.address}</span>
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Professional Summary</h2>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{personalDetails.summary}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        {/* Left Column */}
        <div>
          {/* Experience */}
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', pb: '5px' }}>Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#334155' }}>
                  <span>{exp.jobTitle}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div style={{ color: '#6366f1', fontSize: '0.9rem', marginBottom: '5px' }}>{exp.company}</div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569' }}>{exp.description}</p>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section>
            <h2 style={{ fontSize: '1.1rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', pb: '5px' }}>Projects</h2>
            {projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: '600' }}>{proj.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>{proj.technologies}</div>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{proj.description}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', pb: '5px' }}>Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{edu.degree}</div>
                <div style={{ color: '#475569', fontSize: '0.85rem' }}>{edu.school}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h2 style={{ fontSize: '1.1rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', pb: '5px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, idx) => (
                <span key={idx} style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

PhotoFreeTemplate.displayName = 'PhotoFreeTemplate';
export default PhotoFreeTemplate;
