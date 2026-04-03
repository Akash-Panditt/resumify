import React, { forwardRef } from 'react';

const PhotoPremiumTemplate = forwardRef(({ data }, ref) => {
  const { personalDetails, education, experience, skills, projects } = data;

  // Professional SVG Icons for the premium feel
  const IconMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const IconPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const IconMap = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const IconLinkedin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

  return (
    <div ref={ref} className="resume-paper" style={{ display: 'flex', color: '#1e293b', fontFamily: "'Inter', 'Outfit', sans-serif", minHeight: '1123px', width: '794px', backgroundColor: '#fff', boxSizing: 'border-box', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
      {/* Sidebar - Dark Silicon Slate */}
      <div style={{ width: '260px', background: '#0f172a', color: '#f8fafc', padding: '40px 25px', display: 'flex', flexDirection: 'column' }}>
        {/* Profile Action Card */}
        <div style={{ marginBottom: '35px', textAlign: 'center' }}>
          <div style={{ width: '160px', height: '160px', margin: '0 auto 20px auto', borderRadius: '50%', overflow: 'hidden', border: '4px solid #6366f1', boxShadow: '0 10px 25px rgba(99,102,241,0.3)', padding: '4px', background: '#0f172a' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              {personalDetails?.photo ? (
                <img src={personalDetails.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '1.5rem' }}>👤</div>
              )}
            </div>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '5px', letterSpacing: '-0.02em' }}>{personalDetails.fullName}</h2>
          <p style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{personalDetails.jobTitle}</p>
        </div>

        {/* Contact info with Icons */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.2em', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: '#6366f1' }}><IconMail /></span>
                <span style={{ opacity: 0.9 }}>{personalDetails.email}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: '#6366f1' }}><IconPhone /></span>
                <span style={{ opacity: 0.9 }}>{personalDetails.phone}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: '#6366f1' }}><IconMap /></span>
                <span style={{ opacity: 0.9 }}>{personalDetails.address}</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span style={{ color: '#6366f1' }}><IconLinkedin /></span>
                <span style={{ opacity: 0.9 }}>LinkedIn Profile</span>
             </div>
          </div>
        </div>

        {/* Hard Skills - Visual bars */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.2em', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>Expertise</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '0.85rem', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{skill.name}</span>
                </div>
                <div style={{ height: '3px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : '60%', height: '100%', background: 'linear-gradient(to right, #6366f1, #818cf8)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Minimalist White */}
      <div style={{ flex: 1, padding: '50px 45px', display: 'flex', flexDirection: 'column' }}>
        {/* Profile / Summary */}
        <section style={{ marginBottom: '45px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '15px', position: 'relative' }}>
            Professional Profile
            <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '40px', height: '4px', background: '#6366f1' }}></div>
          </h2>
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.7', color: '#475569' }}>{personalDetails.summary}</p>
        </section>

        {/* Experience - The Timeline look */}
        <section style={{ marginBottom: '45px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '25px', position: 'relative' }}>
            Experience
            <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '40px', height: '4px', background: '#6366f1' }}></div>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {experience.map((exp, idx) => (
              <div key={idx} style={{ position: 'relative', paddingLeft: '25px', borderLeft: '2px solid #f1f5f9' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>{exp.jobTitle}</h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8', background: '#f8fafc', padding: '2px 8px', borderRadius: '4px' }}>{exp.startDate} — {exp.endDate}</span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: '600', color: '#6366f1' }}>{exp.company}</p>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#64748b' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
           <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px', position: 'relative' }}>
                Education
                <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '40px', height: '4px', background: '#6366f1' }}></div>
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>{edu.degree}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#64748b' }}>{edu.school}</p>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{edu.startDate} — {edu.endDate}</span>
                </div>
              ))}
           </section>

           <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '20px', position: 'relative' }}>
                Projects
                <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '40px', height: '4px', background: '#6366f1' }}></div>
              </h2>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>{proj.name}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#6366f1', fontWeight: '500' }}>{proj.technologies}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{proj.description}</p>
                </div>
              ))}
           </section>
        </div>
      </div>
    </div>
  );
});

PhotoPremiumTemplate.displayName = 'PhotoPremiumTemplate';
export default PhotoPremiumTemplate;
