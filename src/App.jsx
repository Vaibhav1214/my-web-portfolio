import { useState, useEffect } from 'react'
import avatarImg from './assets/avatar.png'
import './App.css'

// Web3Forms Key
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ""

// Inline clean SVG Icons for authentic dev aesthetic
const Icons = {
  Github: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
  ),
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
  ),
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  Code: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
  ),
  Cpu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>
  ),
  Terminal: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
  ),
  Location: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  )
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Interactive Project 1: IoT Sensor State Simulation
  const [sensorAlertMode, setSensorAlertMode] = useState(false)

  // Interactive Project 2: Streetlight Vehicle Simulation
  const [vehiclePassing, setVehiclePassing] = useState(false)

  // Interactive Project 3: SDLC Tool Step State
  const [sdlcPhase, setSdlcPhase] = useState('Requirements')

  // Contact Form State
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (sectionId) => {
    setMobileMenuOpen(false)
    setActiveSection(sectionId)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('mishravaibhav1214@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 3000)
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    if (formName && formEmail && formMessage) {
      setIsSubmitting(true)
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formName,
            email: formEmail,
            message: formMessage,
            subject: `New Portfolio Message from ${formName}`,
            from_name: "Vaibhav Portfolio"
          })
        })

        const data = await response.json()
        if (response.ok && data.success) {
          setFormSubmitted(true)
          setFormName('')
          setFormEmail('')
          setFormMessage('')
          setTimeout(() => setFormSubmitted(false), 5000)
        } else {
          alert(data.message || "Something went wrong while sending message.")
        }
      } catch (error) {
        console.error("Contact form error:", error)
        alert("Network error. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const sdlcDetails = {
    Requirements: "Gathering system requirements, define smoke detection thresholds & API schema specifications.",
    Design: "System architecture diagrams, component wireframes, database tables & sensor circuit schematics.",
    Development: "Coding modular C++ Arduino firmware routines and building responsive React interface components.",
    Testing: "Executing hardware loop tests, gas threshold calibration, and automated UI state validations.",
    Deployment: "Building production bundles, Git version control push, and live cloud deployment hosting."
  }

  return (
    <>
      {/* Navigation Header */}
      <nav className="navbar" id="main-navigation">
        <div className="container nav-container">
          <div className="logo" id="portfolio-logo">
            <span className="logo-badge">&lt;VM /&gt;</span>
            <span>Vaibhav Mishra</span>
          </div>

          <button
            className="menu-toggle"
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navigation-links-list">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((sec) => (
              <li key={sec}>
                <a
                  href={`#${sec}`}
                  id={`nav-link-${sec}`}
                  className={activeSection === sec ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(sec); }}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container" id="home">
        <div className="hero-grid">
          <div className="hero-content animate-slide-up">
            <div className="status-pill">
              <span className="status-dot"></span>
              Open for Internships & Collaborations
            </div>

            <h1 className="hero-title" id="hero-main-title">
              Engineering Software & <span className="text-gradient">Hardware Systems</span>
            </h1>
            
            <p className="hero-subtitle">
              B.Tech Computer Science & Engineering Student (3rd Year) focused on modern web development, data structures, and IoT embedded systems.
            </p>

            <p className="hero-desc">
              Based in Uttarakhand, India. Building clean functional web apps with React & JavaScript, alongside Arduino-based sensor automation projects.
            </p>

            <div className="cta-group">
              <a
                href="https://linkedin.com/in/vaibhav-mishra-04578a290"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="cta-btn-linkedin"
              >
                <Icons.Linkedin /> LinkedIn Profile
              </a>
              
              <button
                className="btn btn-secondary"
                id="cta-btn-contact"
                onClick={() => handleLinkClick('contact')}
              >
                <Icons.Mail /> Contact Me
              </button>

              <a
                href="https://github.com/Vaibhav1214"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                aria-label="GitHub Profile"
              >
                <Icons.Github /> GitHub
              </a>
            </div>

            {/* Terminal snippet card */}
            <div className="terminal-box">
              <div className="terminal-header">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command">cat developer_profile.json</span>
              </div>
              <div className="terminal-line" style={{ marginTop: '4px' }}>
                <span className="terminal-output">
                  {`{ "name": "Vaibhav Mishra", "degree": "B.Tech CSE", "year": "3rd Year (Sem 6)", "skills": ["C++", "React", "Python", "IoT"] }`}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right: Profile Card */}
          <div className="hero-avatar-box animate-slide-up">
            <div className="avatar-wrapper">
              <img
                src={avatarImg}
                alt="Vaibhav Mishra Profile"
                className="avatar-img"
                id="about-profile-image"
              />
            </div>
            
            <div className="avatar-badge-grid">
              <div className="quick-stat-badge">
                <div className="quick-stat-value">3rd Year</div>
                <div className="quick-stat-label">B.Tech CSE Student</div>
              </div>
              <div className="quick-stat-badge">
                <div className="quick-stat-value">2</div>
                <div className="quick-stat-label">Web Internships</div>
              </div>
              <div className="quick-stat-badge">
                <div className="quick-stat-value">IoT & Web</div>
                <div className="quick-stat-label">Hardware & Software</div>
              </div>
              <div className="quick-stat-badge">
                <div className="quick-stat-value">3+</div>
                <div className="quick-stat-label">Key Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section className="section-padding container" id="about">
        <div className="section-header">
          <div className="section-tag">Background</div>
          <h2 className="section-title">About & Education</h2>
          <p className="section-desc">
            Academic timeline, coursework focus, and engineering fundamentals at Dr. APJ Abdul Kalam Institute of Technology.
          </p>
        </div>

        <div className="cards-grid-2">
          {/* Bio overview */}
          <div className="card">
            <h3 style={{ fontSize: '20px', marginBottom: '14px' }}>Developer Overview</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>
              I am a 3rd-year Computer Science student passionate about translating theory into functional applications. My work spans client-side web development with React and JavaScript to low-level microcontroller programming for IoT solutions.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7' }}>
              Through remote internships at SkillCraft and CodSoft, I have developed disciplined software development practices including git version control, clean modular layout patterns, and API integration.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="card">
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Education</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-header">
                  <div>
                    <div className="timeline-title">B.Tech in Computer Science & Engineering</div>
                    <div className="timeline-org">Dr. APJ Abdul Kalam Institute of Technology</div>
                  </div>
                  <span className="timeline-date">2023 – 2027</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Currently in 3rd Year (6th Semester). Coursework: DSA, OOP in C++, DBMS, Operating Systems, Computer Networks.
                </p>
              </div>

              <div className="timeline-item">
                <div className="timeline-header">
                  <div>
                    <div className="timeline-title">Class XII (Senior Secondary)</div>
                    <div className="timeline-org">Himalayan Progressive School (CBSE)</div>
                  </div>
                  <span className="timeline-date">Completed</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Science Stream: Physics, Chemistry, Mathematics & Computer Science (PCM+CS).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding container" id="experience">
        <div className="section-header">
          <div className="section-tag">Internships</div>
          <h2 className="section-title">Work & Internship Experience</h2>
          <p className="section-desc">
            Hands-on web engineering roles where I built responsive web applications and improved development workflows.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <div className="timeline-title">Web Development Intern</div>
                  <div className="timeline-org">SkillCraft</div>
                </div>
                <span className="timeline-date">July 2025</span>
              </div>
              <ul className="timeline-bullets">
                <li>Completed 4 core web development projects, including interactive single-page web applications.</li>
                <li>Built a Tic-Tac-Toe web game featuring custom AI decision logic and responsive UI state management.</li>
                <li>Engineered a high-precision Stopwatch Web Application with lap recording and timing controls.</li>
                <li>Designed responsive multi-device landing page layouts optimizing performance across viewports.</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <div className="timeline-title">Web Development Intern</div>
                  <div className="timeline-org">CodSoft</div>
                </div>
                <span className="timeline-date">Nov – Dec 2024</span>
              </div>
              <ul className="timeline-bullets">
                <li>Delivered 3 production-ready client web projects with clean semantic HTML5 & modern CSS.</li>
                <li>Built a web-based Calculator application with accurate arithmetic operations and keyboard event listeners.</li>
                <li>Created a personal developer portfolio website showcasing projects, skills, and contact flows.</li>
                <li>Practiced version control workflows with Git & GitHub deployment tools.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Interactive Visualizers */}
      <section className="section-padding container" id="projects">
        <div className="section-header">
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">Featured Engineering Projects</h2>
          <p className="section-desc">
            Hardware-software IoT implementations and application tools built with real-world utility in mind.
          </p>
        </div>

        <div className="cards-grid-3">
          {/* Project 1: Forest Fire Detection */}
          <div className="project-card">
            <div className="project-widget">
              <div className="widget-bar">
                <span>SENSOR_DASHBOARD.cc</span>
                <span className="widget-tag">IoT Hardware</span>
              </div>

              {/* Interactive Sensor Box */}
              <div className="sensor-grid">
                <div className="sensor-box">
                  <div className="sensor-name">MQ-2 Gas / Smoke</div>
                  <div className={`sensor-val ${sensorAlertMode ? 'alert' : 'normal'}`}>
                    {sensorAlertMode ? '680 PPM (HIGH)' : '115 PPM (OK)'}
                  </div>
                </div>

                <div className="sensor-box">
                  <div className="sensor-name">DHT11 Temp</div>
                  <div className={`sensor-val ${sensorAlertMode ? 'alert' : 'normal'}`}>
                    {sensorAlertMode ? '49.2 °C' : '26.4 °C'}
                  </div>
                </div>

                <div className="sensor-box">
                  <div className="sensor-name">Soil Moisture</div>
                  <div className="sensor-val normal">
                    {sensorAlertMode ? '14% (Dry)' : '42% (Normal)'}
                  </div>
                </div>

                <div className="sensor-box">
                  <div className="sensor-name">Seismic SW-420</div>
                  <div className={`sensor-val ${sensorAlertMode ? 'alert' : 'normal'}`}>
                    {sensorAlertMode ? 'VIB_DETECTED' : 'STABLE'}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <button
                  className="btn btn-outline"
                  style={{ fontSize: '11px', padding: '4px 10px', width: '100%' }}
                  onClick={() => setSensorAlertMode(!sensorAlertMode)}
                >
                  ⚡ Toggle Test Simulation: {sensorAlertMode ? 'Hazard Alert State' : 'Normal Operational State'}
                </button>
              </div>
            </div>

            <div className="project-body">
              <h3 className="project-title">AI-Enabled Forest Fire Detection</h3>
              <p className="project-desc">
                An IoT prototype combining multi-sensor microcontrollers (MQ-2 gas/smoke, DHT11 temp/humidity, SW-420 seismic vibration) for early wildfire alert detection in high-risk zones.
              </p>

              <div className="project-tech-tags">
                <span className="tech-tag">C / C++</span>
                <span className="tech-tag">Arduino Uno</span>
                <span className="tech-tag">MQ-2 & DHT11</span>
                <span className="tech-tag">IoT Alert System</span>
              </div>

              <a
                href="https://github.com/Vaibhav1214/my-web-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '13px', width: '100%' }}
              >
                <Icons.Github /> View Source Code <Icons.ExternalLink />
              </a>
            </div>
          </div>

          {/* Project 2: Smart Streetlights */}
          <div className="project-card">
            <div className="project-widget">
              <div className="widget-bar">
                <span>STREETLIGHT_SIMULATOR</span>
                <span className="widget-tag" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>SIH 2024</span>
              </div>

              <div className="streetlight-demo">
                <div className="road-visualization">
                  <div className="street-lamp">
                    <div
                      className="lamp-glow"
                      style={{
                        boxShadow: vehiclePassing ? '0 0 24px #f59e0b, 0 0 40px #f59e0b' : '0 0 8px rgba(245, 158, 11, 0.4)',
                        opacity: vehiclePassing ? 1 : 0.45
                      }}
                    ></div>
                    <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                      {vehiclePassing ? '100% Brightness' : '50% Idle'}
                    </span>
                  </div>

                  <div
                    className="vehicle-sim"
                    style={{ transform: vehiclePassing ? 'translateX(30px)' : 'translateX(-30px)' }}
                  >
                    🚗
                  </div>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ fontSize: '11px', padding: '4px 10px', width: '100%' }}
                  onClick={() => setVehiclePassing(!vehiclePassing)}
                >
                  🚙 Click to Simulate Vehicle Passing IR Sensor
                </button>
              </div>
            </div>

            <div className="project-body">
              <h3 className="project-title">Smart Streetlights Automation</h3>
              <p className="project-desc">
                Award-winning Smart India Hackathon project. Energy-saving streetlight network using IR motion sensors to dim lights to 50% during idle periods and boost to 100% when vehicles approach.
              </p>

              <div className="project-tech-tags">
                <span className="tech-tag">IoT Hardware</span>
                <span className="tech-tag">IR Motion Sensor</span>
                <span className="tech-tag">Energy Automation</span>
                <span className="tech-tag">SIH 1st Place</span>
              </div>

              <a
                href="https://github.com/Vaibhav1214/my-web-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '13px', width: '100%' }}
              >
                <Icons.Github /> View Source Code <Icons.ExternalLink />
              </a>
            </div>
          </div>

          {/* Project 3: SDLC Tool */}
          <div className="project-card">
            <div className="project-widget">
              <div className="widget-bar">
                <span>SDLC_WORKFLOW.py</span>
                <span className="widget-tag" style={{ color: '#a7f3d0', borderColor: 'rgba(167, 243, 208, 0.3)' }}>Python GUI</span>
              </div>

              <div className="sdlc-flow">
                {['Requirements', 'Design', 'Development', 'Testing', 'Deployment'].map((step) => (
                  <div
                    key={step}
                    className={`sdlc-step ${sdlcPhase === step ? 'active' : ''}`}
                    onClick={() => setSdlcPhase(step)}
                  >
                    {step}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '10px', background: '#111827', padding: '8px 10px', borderRadius: '6px', fontSize: '12px', color: '#94a3b8' }}>
                <strong style={{ color: '#818cf8' }}>Phase: {sdlcPhase}</strong>
                <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.4' }}>{sdlcDetails[sdlcPhase]}</p>
              </div>
            </div>

            <div className="project-body">
              <h3 className="project-title">SDLC Interactive Learning Tool</h3>
              <p className="project-desc">
                Educational desktop application that models the Software Development Life Cycle phases. Provides visual step-by-step guidance on requirements analysis, architectural design, testing, and deployment.
              </p>

              <div className="project-tech-tags">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">GUI Interface</span>
                <span className="tech-tag">Software Engineering</span>
              </div>

              <a
                href="https://github.com/Vaibhav1214/my-web-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '13px', width: '100%' }}
              >
                <Icons.Github /> View Source Code <Icons.ExternalLink />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tech Stack Section */}
      <section className="section-padding container" id="skills">
        <div className="section-header">
          <div className="section-tag">Competencies</div>
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p className="section-desc">
            Core programming languages, web technologies, and computer science fundamentals.
          </p>
        </div>

        <div className="cards-grid-3">
          {/* Languages */}
          <div className="skills-category-box">
            <div className="skills-category-title">
              <Icons.Code /> Languages
            </div>
            <div className="skills-grid">
              <div className="skill-badge-card">
                <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>C++</span> C++
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#818cf8', fontWeight: 'bold' }}>C</span> C Language
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Py</span> Python
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>☕</span> Java
              </div>
            </div>
          </div>

          {/* Web Tech */}
          <div className="skills-category-box">
            <div className="skills-category-title">
              <Icons.Terminal /> Web Technologies
            </div>
            <div className="skills-grid">
              <div className="skill-badge-card">
                <span style={{ color: '#61dafb', fontWeight: 'bold' }}>⚛</span> React.js
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#f7df1e', fontWeight: 'bold' }}>JS</span> JavaScript
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#e34f26', fontWeight: 'bold' }}>H5</span> HTML5
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#1572b6', fontWeight: 'bold' }}>C3</span> CSS3
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#00758f', fontWeight: 'bold' }}>SQL</span> SQL DBs
              </div>
              <div className="skill-badge-card">
                <span style={{ color: '#f05032', fontWeight: 'bold' }}>Git</span> Git & GitHub
              </div>
            </div>
          </div>

          {/* Computer Science Core */}
          <div className="skills-category-box">
            <div className="skills-category-title">
              <Icons.Cpu /> CS Fundamentals
            </div>
            <div className="skills-grid">
              <div className="skill-badge-card">DSA (Data Structures)</div>
              <div className="skill-badge-card">OOP Principles</div>
              <div className="skill-badge-card">DBMS & SQL</div>
              <div className="skill-badge-card">Operating Systems</div>
              <div className="skill-badge-card">Computer Networks</div>
              <div className="skill-badge-card">Arduino / IoT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section className="section-padding container">
        <div className="cards-grid-2">
          {/* Certifications */}
          <div className="card">
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--text-primary)' }}>Certifications & Training</h3>
            <ul className="timeline-bullets">
              <li><strong>Google Student Ambassador Program</strong> — Participation Certificate (2025)</li>
              <li><strong>Financial Education for Young Citizens</strong> — NISM & Aditya Birla Capital Foundation (2025)</li>
              <li><strong>Digital Literacy Certification</strong> — PMGDISHA, Government of India (2021)</li>
            </ul>
          </div>

          {/* Achievements */}
          <div className="card">
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--text-primary)' }}>Key Achievements</h3>
            <ul className="timeline-bullets">
              <li><strong>1st Place Winner</strong> — Internal Smart India Hackathon (SIH 2024) for IoT Streetlight Automation.</li>
              <li>Active participant in academic programming contests & technical quizzes.</li>
              <li>Engaged in college debate, public speaking events, and team presentation activities.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding container" id="contact">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title" style={{ fontSize: '28px' }}>Let's Connect</h2>
            <p className="section-desc" style={{ fontSize: '14px' }}>
              I am open for internships, software engineering projects, and open-source collaborations. Feel free to reach out directly.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon"><Icons.Mail /></div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href="mailto:mishravaibhav1214@gmail.com">mishravaibhav1214@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Icons.Location /></div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Lalkuan, Nainital, Uttarakhand, India</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Icons.Linkedin /></div>
                <div>
                  <div className="contact-label">LinkedIn Profile</div>
                  <div className="contact-value">
                    <a href="https://linkedin.com/in/vaibhav-mishra-04578a290" target="_blank" rel="noopener noreferrer">
                      vaibhav-mishra-04578a290
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-card">
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Send a Message</h3>
            
            <form onSubmit={handleContactSubmit}>
              {formSubmitted && (
                <div className="form-success-alert">
                  ✓ Message sent successfully! I will reply as soon as possible.
                </div>
              )}

              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact-name"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="contact-email"
                  name="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  className="form-control"
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Write your inquiry or project message here..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-copy">
            © {new Date().getFullYear()} Vaibhav Mishra • Engineered with React & Modern Web Standards
          </div>

          <div className="social-links">
            <a
              href="https://github.com/Vaibhav1214"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <Icons.Github />
            </a>
            <a
              href="https://linkedin.com/in/vaibhav-mishra-04578a290"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <Icons.Linkedin />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
