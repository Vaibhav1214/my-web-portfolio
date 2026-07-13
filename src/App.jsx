import { useState, useEffect } from 'react'
import avatarImg from './assets/avatar.png'
import projectMockupImg from './assets/project_mockup.png'
import './App.css'

// 💡 Reads your Web3Forms Access Key from environment variables.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ""

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Contact Form State
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Track scroll position to update active navigation links
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLinkClick = (sectionId) => {
    setMobileMenuOpen(false)
    setActiveSection(sectionId)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
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
          // Reset fields
          setFormName('')
          setFormEmail('')
          setFormMessage('')

          // Clear success message after 5 seconds
          setTimeout(() => {
            setFormSubmitted(false)
          }, 5000)
        } else {
          alert(data.message || "Oops! Something went wrong while sending the message. Please try again.")
        }
      } catch (error) {
        console.error("Error submitting contact form:", error)
        alert("Oops! There was a network connection error. Please try again later.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      {/* Navigation Header */}
      <nav className="navbar" id="main-navigation">
        <div className="container nav-container">
          <div className="logo" id="portfolio-logo">
            Vaibhav<span>.</span>
          </div>

          <button
            className="menu-toggle"
            id="mobile-nav-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="navigation-links-list">
            <li>
              <a
                href="#home"
                id="nav-link-home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                id="nav-link-about"
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
              >
                About & Education
              </a>
            </li>
            <li>
              <a
                href="#experience"
                id="nav-link-experience"
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleLinkClick('experience'); }}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#projects"
                id="nav-link-projects"
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleLinkClick('projects'); }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                id="nav-link-skills"
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleLinkClick('skills'); }}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                id="nav-link-contact"
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container" id="home">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="hero-content animate-slide-up">
          <div className="hero-subtitle" id="hero-sub">Computer Science Student</div>
          <h1 className="hero-title" id="hero-main-title">
            Hi, I'm <span className="text-gradient">Vaibhav Mishra</span>
          </h1>
          <p className="hero-desc" id="hero-description-paragraph">
            An enthusiastic B.Tech CSE student with strong foundations in programming,
            data structures, and web development. Focused on creating functional software solutions
            and looking to bring ideas to life.
          </p>
          <div className="cta-group">
            <button
              className="btn btn-primary"
              id="cta-btn-projects"
              onClick={() => handleLinkClick('projects')}
            >
              View My Work
            </button>
            <button
              className="btn btn-secondary"
              id="cta-btn-contact"
              onClick={() => handleLinkClick('contact')}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section className="section-padding container" id="about">
        <div className="about-grid">
          <div className="about-img-container">
            <div className="about-img-wrapper" id="about-image-wrapper-element">
              <img
                src={avatarImg}
                alt="Vaibhav Mishra Profile Avatar"
                className="about-img"
                id="about-profile-image"
              />
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title text-gradient" id="about-section-heading">About Myself</h2>
            <p className="about-paragraph" id="about-desc-p1">
              I am a B.Tech Computer Science & Engineering student at Dr. APJ Abdul Kalam Institute of Technology.
              Currently in my 3rd year (6th Semester), I am working to combine solid software engineering principles,
              such as data structures and core computer science concepts, with interactive frontend web development.
            </p>
            <p className="about-paragraph" id="about-desc-p2">
              My hands-on experience includes developing multiple IoT sensor systems (such as Arduino-based street lights
              and forest fire detection projects) and completing web development internships where I delivered functional
              React and JavaScript tools.
            </p>

            <div className="about-stats" id="about-stats-grid">
              <div className="stat-card" id="stat-card-experience">
                <div className="stat-number">3rd Year</div>
                <div className="stat-label">B.Tech CSE Student</div>
              </div>
              <div className="stat-card" id="stat-card-projects">
                <div className="stat-number">2</div>
                <div className="stat-label">Web Internships Done</div>
              </div>
              <div className="stat-card" id="stat-card-commits">
                <div className="stat-number">3+</div>
                <div className="stat-label">Key Systems Built</div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div style={{ marginTop: '60px' }}>
          <h3 className="skills-category-title" style={{ fontSize: '24px', textAlign: 'left' }}>Education Background</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-header">
                <div>
                  <h4 className="timeline-title">B.Tech in Computer Science and Engineering</h4>
                  <span className="timeline-subtitle">Dr. APJ Abdul Kalam Institute of Technology</span>
                </div>
                <span className="timeline-date">2023 – 2027</span>
              </div>
              <div className="timeline-desc">
                <p>Currently in 3rd Year, 6th Semester.</p>
                <p style={{ marginTop: '6px', color: 'var(--accent-orange-light)', fontSize: '13px' }}>
                  <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-header">
                <div>
                  <h4 className="timeline-title">Class XII (Senior Secondary School)</h4>
                  <span className="timeline-subtitle">Himalayan Progressive School (CBSE)</span>
                </div>
                <span className="timeline-date">Completed</span>
              </div>
              <div className="timeline-desc">
                <p>Stream: Physics, Chemistry, Mathematics + Computer Science (PCM+CS)</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-header">
                <div>
                  <h4 className="timeline-title">Class X (Secondary School)</h4>
                  <span className="timeline-subtitle">Himalayan Progressive School (CBSE)</span>
                </div>
                <span className="timeline-date">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding container" id="experience" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', margin: '40px auto', padding: '60px 40px' }}>
        <h2 className="section-title text-gradient" id="experience-section-heading">Internship Experience</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px 0', textAlign: 'left' }}>
          Industry projects and remote web development internships where I developed software development practices.
        </p>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-header">
              <div>
                <h4 className="timeline-title">Web Development Intern</h4>
                <span className="timeline-subtitle" style={{ color: 'var(--accent-blue-light)' }}>SkillCraft</span>
              </div>
              <span className="timeline-date">July 2025</span>
            </div>
            <div className="timeline-desc">
              <ul>
                <li>Completed 4 hands-on web tasks, including building a Web App with functional UI and backend integration.</li>
                <li>Developed an interactive Tic-Tac-Toe game using Smart AI and decision-making logic.</li>
                <li>Built a fully featured Stopwatch Web App with responsive control states (start, stop, reset).</li>
                <li>Designed and coded a responsive landing page optimized for multi-device viewport displays.</li>
                <li>Strengthened technical knowledge of core web standards (HTML5, CSS3, JavaScript) and styling libraries.</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-header">
              <div>
                <h4 className="timeline-title">Web Development Intern</h4>
                <span className="timeline-subtitle" style={{ color: 'var(--accent-blue-light)' }}>CodSoft</span>
              </div>
              <span className="timeline-date">Nov – Dec 2024</span>
            </div>
            <div className="timeline-desc">
              <ul>
                <li>Delivered 3 assigned responsive client-side web projects.</li>
                <li>Designed and built a web-based Calculator Application with interactive UI layouts and accurate arithmetic operations.</li>
                <li>Developed a Personal Portfolio Website to cleanly showcase projects, skills, and resume details.</li>
                <li>Created a landing page incorporating responsive grids and clean, state-of-the-art UI elements.</li>
                <li>Solidified workflows in debugging web components, version control via Git, and hosting live builds.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding container" id="projects">
        <h2 className="section-title text-gradient" id="projects-section-heading">Featured Projects</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px 0', textAlign: 'left' }}>
          Hardware-software integrations and application prototypes built to solve real-world problems.
        </p>

        <div className="projects-grid" id="portfolio-projects-grid">
          {/* Project 1 */}
          <div className="project-card" id="project-card-fire-detection">
            <div className="project-img-wrapper">
              <img src={projectMockupImg} alt="Forest Fire Detection System Mockup" className="project-img" />
            </div>
            <div className="project-info">
              <span className="timeline-date" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>Arduino Based</span>
              <h3 className="project-title" id="project-title-fire-detection">AI-Enabled Forest Fire Detection</h3>
              <p className="project-desc">
                Developed a sensor-based prototype system that detects early indicators of forest fires and environmental threats.
                Integrates MQ-2 Gas sensor (smoke/gas), DHT11 (temp/humidity), soil moisture sensors, and SW-420 seismic vibration triggers.
              </p>
              <div className="project-tags">
                <span className="tag">C/C++</span>
                <span className="tag">Arduino</span>
                <span className="tag">IoT Sensors</span>
                <span className="tag">Disaster Prevention</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Vaibhav1214/my-web-portfolio" className="project-link" id="project-link-repo-fire" target="_blank" rel="noopener noreferrer">
                  Source Code ↗
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card" id="project-card-streetlights">
            <div className="project-img-wrapper">
              <img src={projectMockupImg} alt="Smart Street Lights Mockup" className="project-img" style={{ filter: 'hue-rotate(180deg)' }} />
            </div>
            <div className="project-info">
              <span className="timeline-date" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>SIH 2024 / Arduino</span>
              <h3 className="project-title" id="project-title-streetlights">Smart Streetlights & Home Automation</h3>
              <p className="project-desc">
                Designed a smart city energy-saving automation system. Uses IR sensors to detect approaching vehicles and dynamically
                adjust light intensity from 50% to 100%. Incorporates LDR sensors for light-controlled switching and renewable energy inputs.
              </p>
              <div className="project-tags">
                <span className="tag">IoT</span>
                <span className="tag">SIH 2024</span>
                <span className="tag">Renewable Energy</span>
                <span className="tag">Infrared Sensors</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Vaibhav1214/my-web-portfolio" className="project-link" id="project-link-repo-streetlights" target="_blank" rel="noopener noreferrer">
                  Source Code ↗
                </a>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card" id="project-card-sdlc-tool">
            <div className="project-img-wrapper">
              <img src={projectMockupImg} alt="SDLC Learning Tool Mockup" className="project-img" style={{ filter: 'hue-rotate(45deg)' }} />
            </div>
            <div className="project-info">
              <span className="timeline-date" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>Python Tool</span>
              <h3 className="project-title" id="project-title-sdlc">SDLC Interactive Learning Tool</h3>
              <p className="project-desc">
                Created an interactive educational software application to teach the Software Development Life Cycle phases.
                Users can click through stages (Requirements, Design, Coding, Testing, Deployment) to render theory details and flow workflows.
              </p>
              <div className="project-tags">
                <span className="tag">Python</span>
                <span className="tag">GUI Systems</span>
                <span className="tag">Software Engineering</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Vaibhav1214/my-web-portfolio" className="project-link" id="project-link-repo-sdlc" target="_blank" rel="noopener noreferrer">
                  Source Code ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding container" id="skills">
        <h2 className="section-title text-gradient" id="skills-section-heading">Skills & Tech Stack</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px 0', textAlign: 'left' }}>
          Technologies and core academic concepts I study and apply in software engineering projects.
        </p>

        <div className="skills-container" id="portfolio-skills-container">
          <div className="skills-category" id="skills-category-programming">
            <h3 className="skills-category-title">Programming Languages</h3>
            <div className="skills-grid">
              <div className="skill-badge" id="skill-badge-c">
                <span className="skill-icon-orange">✦</span> C
              </div>
              <div className="skill-badge" id="skill-badge-cpp">
                <span className="skill-icon-blue">⚛</span> C++
              </div>
              <div className="skill-badge" id="skill-badge-python">
                <span className="skill-icon-orange">⚡</span> Python
              </div>
              <div className="skill-badge" id="skill-badge-java">
                <span className="skill-icon-blue">💻</span> Java
              </div>
            </div>
          </div>

          <div className="skills-category" id="skills-category-web">
            <h3 className="skills-category-title">Web Development</h3>
            <div className="skills-grid">
              <div className="skill-badge" id="skill-badge-html">
                <span className="skill-icon-orange">✦</span> HTML5
              </div>
              <div className="skill-badge" id="skill-badge-css">
                <span className="skill-icon-blue">🎨</span> CSS3
              </div>
              <div className="skill-badge" id="skill-badge-js">
                <span className="skill-icon-orange">⚡</span> JavaScript
              </div>
              <div className="skill-badge" id="skill-badge-sql">
                <span className="skill-icon-blue">📦</span> SQL Databases
              </div>
            </div>
          </div>

          <div className="skills-category" id="skills-category-concepts">
            <h3 className="skills-category-title">Core Computer Science Concepts</h3>
            <div className="skills-grid">
              <div className="skill-badge" id="skill-badge-dsa">
                <span className="skill-icon-orange">⚙</span> Data Structures & Algorithms
              </div>
              <div className="skill-badge" id="skill-badge-oop">
                <span className="skill-icon-blue">✓</span> Object-Oriented Programming (OOP)
              </div>
              <div className="skill-badge" id="skill-badge-daa">
                <span className="skill-icon-orange">⚡</span> DAA (Design & Analysis of Algorithms)
              </div>
              <div className="skill-badge" id="skill-badge-dbms">
                <span className="skill-icon-blue">🔍</span> DBMS
              </div>
              <div className="skill-badge" id="skill-badge-os">
                <span className="skill-icon-orange">✦</span> Operating Systems (OS)
              </div>
              <div className="skill-badge" id="skill-badge-cn">
                <span className="skill-icon-blue">🌐</span> Computer Networks (CN)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Achievements Section */}
      <section className="section-padding container" id="certifications" style={{ borderTop: '1px solid var(--border-color)' }}>
        <h2 className="section-title text-gradient" id="certs-heading">Qualifications & Achievements</h2>
        <div className="cards-grid-2col">
          {/* Certifications */}
          <div className="info-card" id="certifications-card">
            <h3 className="info-card-title">Professional Certifications</h3>
            <ul className="info-list">
              <li className="info-list-item">
                <strong>Google Student Ambassador Program</strong> — Participation Certificate (2025)
              </li>
              <li className="info-list-item">
                <strong>Financial Education for Young Citizens</strong> — NISM & Aditya Birla Capital Foundation (2025)
              </li>
              <li className="info-list-item">
                <strong>Digital Literacy Certification</strong> — PMGDISHA, Government of India (2021)
              </li>
            </ul>
          </div>

          {/* Achievements & Activities */}
          <div className="info-card" id="achievements-card">
            <h3 className="info-card-title">Achievements & Activities</h3>
            <ul className="info-list">
              <li className="info-list-item">
                <strong>1st Place</strong> — Internal Smart India Hackathon (SIH), Sept 2024
              </li>
              <li className="info-list-item">
                Active participation in sports events at school and college level
              </li>
              <li className="info-list-item">
                Engaged in quizzes and academic contests with strong placements
              </li>
              <li className="info-list-item">
                Involved in debates and public speaking, developing communication skills
              </li>
              <li className="info-list-item">
                Performed in skits and cultural activities, contributing to creative team projects
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding container" id="contact">
        <h2 className="section-title text-gradient" id="contact-section-heading">Let's Connect</h2>

        <div className="contact-grid">
          <div className="contact-info" id="portfolio-contact-info-panel">
            <h3 className="contact-title" id="contact-panel-heading">Have a project or opportunity?</h3>
            <p className="contact-desc" id="contact-panel-description">
              I am currently open to internship opportunities, student collaborations, and web development projects.
              Fill out the form or reach out directly via email.
            </p>

            <div className="contact-details" id="contact-details-list">
              <div className="contact-item" id="contact-item-email">
                <div className="contact-icon-wrapper">✉</div>
                <div>
                  <div className="contact-label">Email Me</div>
                  <div className="contact-value">
                    <a href="mailto:mishravaibhav1214@gmail.com" id="contact-email-link">mishravaibhav1214@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-item" id="contact-item-location">
                <div className="contact-icon-wrapper">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Lalkuan, Nainital, India</div>
                </div>
              </div>

              <div className="contact-item" id="contact-item-linkedin">
                <div className="contact-icon-wrapper">💼</div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">
                    <a href="https://linkedin.com/in/vaibhav-mishra-04578a290" target="_blank" rel="noopener noreferrer">
                      vaibhav-mishra-04578a290
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" id="contact-form-element" onSubmit={handleContactSubmit}>
            {formSubmitted && (
              <div className="form-success-msg" id="contact-form-success-alert">
                ✓ Message sent successfully! I will get back to you soon.
              </div>
            )}

            <div className="form-group" id="form-group-name">
              <label htmlFor="contact-name">Name</label>
              <input
                type="text"
                className="form-control"
                id="contact-name"
                name="name"
                required
                placeholder="Your Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>

            <div className="form-group" id="form-group-email">
              <label htmlFor="contact-email">Email</label>
              <input
                type="email"
                className="form-control"
                id="contact-email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>

            <div className="form-group" id="form-group-message">
              <label htmlFor="contact-message">Message</label>
              <textarea
                className="form-control"
                id="contact-message"
                name="message"
                required
                placeholder="Write your message here..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              id="contact-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer" id="portfolio-footer">
        <div className="container footer-content">
          <div className="footer-copy" id="footer-copyright-text">
            © {new Date().getFullYear()} Vaibhav Mishra. All rights reserved.
          </div>
          <div className="social-links" id="footer-social-links">
            <a href="https://github.com/Vaibhav1214/my-web-portfolio" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-link-github" aria-label="GitHub Profile">
              🐙
            </a>
            <a href="https://linkedin.com/in/vaibhav-mishra-04578a290" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-link-linkedin-footer" aria-label="LinkedIn Profile">
              💼
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
