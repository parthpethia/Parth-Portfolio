import React, { useEffect, useState } from 'react';

const calculateDuration = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  
  if (months <= 0) months = 1;
  
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  
  let result = [];
  if (yrs > 0) result.push(`${yrs} yr${yrs > 1 ? 's' : ''}`);
  if (mos > 0) result.push(`${mos} mo${mos > 1 ? 's' : ''}`);
  
  return result.length > 0 ? result.join(' ') : '1 mo';
};

function App() {
  const [activeNav, setActiveNav] = useState('#home');
  const [isTechnical, setIsTechnical] = useState(false);
  const [isProjectTechnical, setIsProjectTechnical] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const heroVisual = document.querySelector(".hero-visual");
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      if (heroVisual) {
        heroVisual.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
      }

      document.querySelectorAll(".float-icon").forEach((icon, i) => {
        const factor = 10 + i * 4;
        icon.style.marginLeft = `${dx * factor}px`;
        icon.style.marginTop = `${dy * factor}px`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      const vShapes = document.querySelectorAll('.title-underline.v-shape');
      const vh = window.innerHeight;

      vShapes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Unfold between 90% and 50% of the viewport height
        const startY = vh * 0.9;
        const endY = vh * 0.5;

        let progress = (rect.top - endY) / (startY - endY);
        progress = Math.max(0, Math.min(1, progress));

        const angle = 35 * progress;
        el.style.setProperty('--scroll-angle', `${angle}deg`);
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach((el) => revealObserver.observe(el));

    const sections = document.querySelectorAll('section');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' });

    sections.forEach((section) => navObserver.observe(section));

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      reveals.forEach((el) => revealObserver.unobserve(el));
      sections.forEach((section) => navObserver.unobserve(section));
    };
  }, []);

  return (
    <>
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        <div className="nav-logo">Portfolio</div>
        <ul className="nav-links">
          <li><a href="#home" className={activeNav === '#home' ? 'active' : ''} onClick={() => setActiveNav('#home')}>Home</a></li>
          <li><a href="#about" className={activeNav === '#about' ? 'active' : ''} onClick={() => setActiveNav('#about')}>About</a></li>
          <li><a href="#experience" className={activeNav === '#experience' ? 'active' : ''} onClick={() => setActiveNav('#experience')}>Experience</a></li>
          <li><a href="#education" className={activeNav === '#education' ? 'active' : ''} onClick={() => setActiveNav('#education')}>Education</a></li>
          <li><a href="#projects" className={activeNav === '#projects' ? 'active' : ''} onClick={() => setActiveNav('#projects')}>Projects</a></li>
          <li><a href="#contact" className={activeNav === '#contact' ? 'active' : ''} onClick={() => setActiveNav('#contact')}>Contact</a></li>
        </ul>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="hero">
        {/* Aura glow behind everything */}
        <div className="hero-aura"></div>

        <div className="hero-content">
          {/* Hero visual wrapper */}
          <div className="hero-visual">
            {/* Blob (circle background) */}
            <div className="blob"></div>

            {/* Person in front of blob — head naturally extends above */}
            <img src="/assets/person.png" alt="Atul" className="person-img" />

            {/* Floating app icons scattered organically */}
            <div className="float-icon icon-premiere" style={{ '--delay': '0s', '--dx': '6px', '--dy': '-12px' }}><img src="/assets/icons/premiere.svg" alt="Premiere Pro" /></div>
            <div className="float-icon icon-photoshop" style={{ '--delay': '0.8s', '--dx': '10px', '--dy': '8px' }}><img src="/assets/icons/photoshop.svg" alt="Photoshop" /></div>
            <div className="float-icon icon-afterfx" style={{ '--delay': '1.2s', '--dx': '-6px', '--dy': '-14px' }}><img src="/assets/icons/aftereffects.svg" alt="After Effects" /></div>
            <div className="float-icon icon-github" style={{ '--delay': '0.6s', '--dx': '8px', '--dy': '10px' }}><img src="/assets/icons/github.svg" alt="GitHub" /></div>
            <div className="float-icon icon-react" style={{ '--delay': '1.0s', '--dx': '-10px', '--dy': '6px' }}><img src="/assets/icons/react.svg" alt="React" /></div>
            <div className="float-icon icon-html" style={{ '--delay': '0.4s', '--dx': '-8px', '--dy': '-10px' }}><img src="/assets/icons/html.svg" alt="HTML5" /></div>
            <div className="float-icon icon-js" style={{ '--delay': '1.4s', '--dx': '6px', '--dy': '-8px' }}><img src="/assets/icons/js.svg" alt="JavaScript" /></div>
            <div className="float-icon icon-davinci" style={{ '--delay': '0.2s', '--dx': '-6px', '--dy': '12px' }}><img src="/assets/icons/davinci.svg" alt="DaVinci Resolve" /></div>
            <div className="float-icon icon-java" style={{ '--delay': '1.6s', '--dx': '8px', '--dy': '-6px' }}><img src="/assets/icons/java.svg" alt="Java" /></div>
            <div className="float-icon icon-python" style={{ '--delay': '1.8s', '--dx': '-8px', '--dy': '10px' }}><img src="/assets/icons/python.svg" alt="Python" /></div>
          </div>

          {/* Name & tagline next to the image */}
          <div className="hero-text">
            <h1>PARTH PETHIA</h1>
            <p>Creative Designer &amp; Video Editor</p>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="about">
        <div className="about-container">
          <div className="section-header reveal">
            <h2 className="section-title">About Me</h2>
            <div className="title-underline v-shape"></div>
          </div>
          <div className="about-content reveal">
            <div className="about-text">
              <p className="about-intro">
                Hi, I'm <span className="highlight">Parth Pethia</span> — a passionate creative designer and video editor who turns ideas into visually stunning digital experiences.
              </p>
              <p>
                I specialize in video editing, motion graphics, and UI/UX design with expertise in tools like Premiere Pro, After Effects, Photoshop, and DaVinci Resolve. I also build modern web interfaces using HTML, CSS, JavaScript, and React.
              </p>
              <p>
                Whether it's crafting a cinematic edit, designing eye-catching graphics, or developing a responsive website — I bring creativity and precision to every project.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Done</span>
                </div>
              </div>
            </div>
            <div className="about-skills">
              <div className="skill-card">
                <div className="skill-icon">🎬</div>
                <h3>Video Editing</h3>
                <p>Premiere Pro, After Effects, DaVinci Resolve</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon">🎨</div>
                <h3>Graphic Design</h3>
                <p>Photoshop, Illustrator, Figma</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon">💻</div>
                <h3>Web Development</h3>
                <p>HTML, CSS, JavaScript, React</p>
              </div>
              <div className="skill-card">
                <div className="skill-icon">☕</div>
                <h3>Programming</h3>
                <p>Java, Python, Git & GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE SECTION ========== */}
      <section id="experience" className="experience">
        <div className="experience-container">
          <div className="section-header reveal">
            <h2 className="section-title">Experience</h2>
            <div className="title-underline v-shape"></div>
          </div>

          <div className="exp-toggle reveal">
            <span className={`exp-toggle-label ${!isTechnical ? 'active' : ''}`} onClick={() => setIsTechnical(false)}>🎬 Creative</span>
            <div className={`exp-toggle-switch ${isTechnical ? 'active' : ''}`} id="expToggle" onClick={() => setIsTechnical(!isTechnical)}>
              <div className="exp-toggle-thumb"></div>
            </div>
            <span className={`exp-toggle-label ${isTechnical ? 'active' : ''}`} onClick={() => setIsTechnical(true)}>💻 Technical</span>
          </div>

          <div className={`experience-panel ${!isTechnical ? 'active' : ''}`} id="panel-creative">
            <div className="timeline">
              <div className="timeline-item reveal">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>Content Creator</h3>
                    <span className="timeline-date">Aug 2025 — Present · {calculateDuration('2025-08-01')}</span>
                  </div>
                  <p>Designed thumbnails, banners, posters and social media content for creators and small businesses. Delivered consistent brand identity across platforms.</p>
                  <div className="timeline-tags">
                    <span>Photoshop</span>
                    <span>Illustrator</span>
                    <span>Figma</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item reveal">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>Core - <a href="https://www.instagram.com/lifeatsst_official/" className="insta-link">@lifeatsst_official</a></h3>
                    <span className="timeline-date">Aug 2025 — Feb 2026 · {calculateDuration('2025-08-01', '2026-02-01')}</span>
                  </div>
                  <p>Creating cinematic edits, motion graphics, and brand visuals for clients across YouTube, Instagram, and corporate projects. Working with Premiere Pro, After Effects, and DaVinci Resolve.</p>
                  <div className="timeline-tags">
                    <span>Premiere Pro</span>
                    <span>After Effects</span>
                    <span>DaVinci Resolve</span>
                    <span>Photoshop</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item reveal">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>Member - <a href="https://www.instagram.com/lifeatsst_official/" className="insta-link">@lifeatsst_official</a></h3>
                    <span className="timeline-date">Aug 2025 — Feb 2026 · {calculateDuration('2025-08-01', '2026-02-01')}</span>
                  </div>
                  <p>Creating cinematic edits, motion graphics, and brand visuals for clients across YouTube, Instagram, and corporate projects. Working with Premiere Pro, After Effects, and DaVinci Resolve.</p>
                  <div className="timeline-tags">
                    <span>Premiere Pro</span>
                    <span>After Effects</span>
                    <span>DaVinci Resolve</span>
                    <span>Photoshop</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item reveal">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>Point of Contact — Yugaantar 2025</h3>
                    <span className="timeline-date">Oct 2025 — Dec 2025 · {calculateDuration('2025-10-01', '2025-12-01')}</span>
                  </div>
                  <p>Designed thumbnails, banners, posters and social media content for creators and small businesses. Delivered consistent brand identity across platforms.</p>
                  <div className="timeline-tags">
                    <span>Photoshop</span>
                    <span>Illustrator</span>
                    <span>Figma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`experience-panel ${isTechnical ? 'active' : ''}`} id="panel-technical">
            <div className="timeline">
              <div className="timeline-item reveal">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>Web Developer — Personal Projects</h3>
                    <span className="timeline-date">2023 — Present · {calculateDuration('2023-01-01')}</span>
                  </div>
                  <p>Building responsive, modern websites and web applications using HTML, CSS, JavaScript, and React. Focused on clean UI/UX and performance optimization.</p>
                  <div className="timeline-tags">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                    <span>React</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item reveal">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>Member — Open Source Club, SST</h3>
                    <span className="timeline-date">Aug 2025 — Present · {calculateDuration('2025-08-01')}</span>
                  </div>
                  <p>Building responsive, modern websites and web applications using HTML, CSS, JavaScript, and React. Focused on clean UI/UX and performance optimization.</p>
                  <div className="timeline-tags">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                    <span>React</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EDUCATION SECTION ========== */}
      <section id="education" className="education">
        <div className="education-container">
          <div className="section-header reveal">
            <h2 className="section-title">Education</h2>
            <div className="title-underline v-shape"></div>
          </div>
          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3>Birla Institute of Technology & Science, Pilani — Bachelors</h3>
                  <span className="timeline-date">2025 — 2029</span>
                </div>
                <p>Pursuing Bachelors in Computer Science with a focus on software development, data structures, and algorithms. Actively involved in design and development projects.</p>
                <div className="timeline-tags">
                  <span>Computer Science</span>
                  <span>DSA</span>
                  <span>Web Development</span>
                </div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3>Scaler School of Technology - Bachelors</h3>
                  <span className="timeline-date">2025 — 2029</span>
                </div>
                <p>Pursuing Bachelors in Computer Science with a focus on software development, data structures, and algorithms. Actively involved in design and development projects.</p>
                <div className="timeline-tags">
                  <span>Computer Science</span>
                  <span>DSA</span>
                  <span>Web Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="section-header reveal">
            <h2 className="section-title">Projects</h2>
            <div className="title-underline v-shape"></div>
          </div>

          <div className="exp-toggle reveal">
            <span className={`exp-toggle-label ${!isProjectTechnical ? 'active' : ''}`} onClick={() => setIsProjectTechnical(false)}>🎬 Creative</span>
            <div className={`exp-toggle-switch ${isProjectTechnical ? 'active' : ''}`} onClick={() => setIsProjectTechnical(!isProjectTechnical)}>
              <div className="exp-toggle-thumb"></div>
            </div>
            <span className={`exp-toggle-label ${isProjectTechnical ? 'active' : ''}`} onClick={() => setIsProjectTechnical(true)}>💻 Technical</span>
          </div>

          <div className={`experience-panel ${!isProjectTechnical ? 'active' : ''}`}>
            <div className="projects-grid">
              <div className="project-card reveal">
                <div className="project-image">
                  <div className="project-placeholder">🎬</div>
                </div>
                <div className="project-info">
                  <h3>Cinematic Travel Edit</h3>
                  <p>A cinematic travel video edited in Premiere Pro with color grading in DaVinci Resolve and motion titles in After Effects.</p>
                  <div className="project-tags">
                    <span>Premiere Pro</span>
                    <span>DaVinci</span>
                    <span>After Effects</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-btn">View Project</a>
                  </div>
                </div>
              </div>
              <div className="project-card reveal">
                <div className="project-image">
                  <div className="project-placeholder">🎨</div>
                </div>
                <div className="project-info">
                  <h3>Brand Identity Package</h3>
                  <p>Complete brand identity including logo, color palette, typography, social media templates, and business cards designed in Photoshop and Illustrator.</p>
                  <div className="project-tags">
                    <span>Photoshop</span>
                    <span>Illustrator</span>
                    <span>Branding</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-btn">View Project</a>
                  </div>
                </div>
              </div>
              <div className="project-card reveal">
                <div className="project-image">
                  <div className="project-placeholder">📱</div>
                </div>
                <div className="project-info">
                  <h3>YouTube Channel Branding</h3>
                  <p>End-to-end YouTube channel branding — intros, outros, thumbnails, lower thirds and channel art for a 100K+ subscriber creator.</p>
                  <div className="project-tags">
                    <span>After Effects</span>
                    <span>Photoshop</span>
                    <span>Motion Design</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-btn">View Project</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`experience-panel ${isProjectTechnical ? 'active' : ''}`}>
            <div className="projects-grid">
              <div className="project-card reveal">
                <div className="project-image">
                  <div className="project-placeholder">💻</div>
                </div>
                <div className="project-info">
                  <h3>Portfolio Website</h3>
                  <p>A modern dark-themed portfolio website built with HTML, CSS, and JavaScript featuring smooth animations and parallax effects.</p>
                  <div className="project-tags">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-btn">View Project</a>
                    <a href="#" className="project-btn btn-outline">GitHub</a>
                  </div>
                </div>
              </div>
              <div className="project-card reveal">
                <div className="project-image">
                  <div className="project-placeholder">⚛️</div>
                </div>
                <div className="project-info">
                  <h3>React Dashboard App</h3>
                  <p>An interactive dashboard application built with React featuring real-time data visualization, responsive layouts, and smooth transitions.</p>
                  <div className="project-tags">
                    <span>React</span>
                    <span>JavaScript</span>
                    <span>CSS</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-btn">View Project</a>
                    <a href="#" className="project-btn btn-outline">GitHub</a>
                  </div>
                </div>
              </div>
              <div className="project-card reveal">
                <div className="project-image">
                  <div className="project-placeholder">☕</div>
                </div>
                <div className="project-info">
                  <h3>Java Management System</h3>
                  <p>A full-stack management application built with Java featuring CRUD operations, database integration, and a clean user interface.</p>
                  <div className="project-tags">
                    <span>Java</span>
                    <span>MySQL</span>
                    <span>OOP</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-btn">View Project</a>
                    <a href="#" className="project-btn btn-outline">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="section-header reveal">
            <h2 className="section-title">Get In Touch</h2>
            <div className="title-underline v-shape"></div>
            <p className="contact-subtitle">Have a project in mind or want to collaborate? Feel free to reach out!</p>
          </div>
          <div className="contact-content reveal">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4885a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:parthpethia@gmail.com">parthpethia@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4885a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+919371065002">+91 9371065002</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4885a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Bengaluru, India</p>
                </div>
              </div>
              <div className="contact-socials">
                <a href="https://github.com/parthpethia" className="social-link" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#e0e0e0"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/parth-pethia/" className="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#e0e0e0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://www.instagram.com/parthhh.mp4/" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#e0e0e0"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://www.youtube.com/@PethiaJi" className="social-link" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#e0e0e0"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="Project inquiry" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="form-submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 <span className="highlight">Parth Pethia</span>. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
