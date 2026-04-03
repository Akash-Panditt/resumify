import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation loop
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navbar segment */}
      <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="nav-container">
          <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.75rem', letterSpacing: '-0.5px' }}>
            Resumify
          </h1>
          <div className="nav-links">
            <ThemeToggle />
            <Link to="/login" className="btn btn-secondary" style={{ padding: '0.4rem 1.25rem', fontSize: '0.9rem' }}>
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1.25rem', fontSize: '0.9rem' }}>
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem', marginTop: '2rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <span className="badge badge-purple" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
              ✨ Meet the Future of Resumes
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
            Build a <span className="text-gradient">Professional Resume</span> in Minutes.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            Stand out to recruiters and breeze past Applicant Tracking Systems. Resumify empowers you with intelligent templates, smart AI enhancements, and easy-to-use tools.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Create Your Resume Free
            </button>
            <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Explore Features
            </button>
          </div>
        </div>

        {/* Hero Image Mockup Area */}
        <div style={{ width: '100%', maxWidth: '900px', height: '400px', marginBottom: '6rem', position: 'relative' }}>
           <div className="card" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(192,132,252,0.05))', overflow: 'hidden' }}>
              {/* Decorative abstract elements */}
              <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(99,102,241,0.2)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '250px', height: '250px', background: 'rgba(16,185,129,0.15)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
              
              <div style={{ textAlign: 'center', zIndex: 1, color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>📄</span>
                <p style={{ fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>App Preview Here</p>
              </div>
           </div>
        </div>

        {/* Features / Glassmorphism Cards */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Why Choose <span className="text-gradient">Resumify?</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', paddingBottom: '6rem' }}>
          <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
              ✨
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>AI Smart Enhancements</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Writer's block? Our AI intelligently rewrites and upgrades your summary and experiences, tailoring them to beat ATS filters.
            </p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
              🎨
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Premium Templates</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Choose from a curated collection of modern, responsive templates designed to impress recruiters in every industry.
            </p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Instant Export</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Download your polished resume in pixel-perfect PDF format instantly, ensuring it looks exactly right on any device.
            </p>
          </div>
        </div>

        {/* How it Works Section */}
        <div style={{ width: '100%', paddingBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>How it <span className="text-gradient">Works</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Three simple steps to your next interview.</p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
             {[
               { step: '01', title: 'Pick a Template', desc: 'Select from our ATS-friendly collection.' },
               { step: '02', title: 'Fill & Enhance', desc: 'Input your details and let AI refine the tone.' },
               { step: '03', title: 'Download & Apply', desc: 'Export to PDF and send it to your dream job.' }
             ].map((item, id) => (
               <div key={id} style={{ flex: '1 1 250px', maxWidth: '350px', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', position: 'relative' }}>
                  <div style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(99, 102, 241, 0.1)', position: 'absolute', top: '10px', right: '20px', lineHeight: 1 }}>{item.step}</div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '1rem', position: 'relative', zIndex: 1 }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>{item.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ width: '100%', paddingBottom: '6rem' }}>
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Loved by <span className="text-gradient">Professionals</span></h2>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
             <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★★★★★</div>
               <p style={{ color: 'var(--text-main)', fontSize: '1rem', fontStyle: 'italic' }}>"I landed interviews at top tech companies within weeks of using Resumify's AI suggestions. It completely transformed my bullet points!"</p>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
                 <div>
                   <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Sarah Jenkins</h5>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Software Engineer</span>
                 </div>
               </div>
             </div>
             
             <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★★★★★</div>
               <p style={{ color: 'var(--text-main)', fontSize: '1rem', fontStyle: 'italic' }}>"The ATS Keyword Guide helped me understand exactly what recruiters were looking for. The premium templates look gorgeous on mobile."</p>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>M</div>
                 <div>
                   <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Michael T.</h5>
                   <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Product Manager</span>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* CTA Bottom */}
        <div style={{ width: '100%', textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(top, transparent, rgba(99, 102, 241, 0.05))', borderRadius: 'var(--radius-xl)', marginBottom: '3rem', border: '1px solid var(--surface-border)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 700 }}>Ready to upgrade your career?</h2>
          <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
            Start Building Now
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--surface-border)', 
        padding: '2rem', 
        textAlign: 'center',
        background: 'rgba(var(--bg-rgb), 0.5)',
        backdropFilter: 'blur(10px)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Resumify. Build the career you deserve.</p>
      </footer>
    </div>
  );
};

export default Landing;
