import { useState, useEffect } from 'react'
import avatarImg from './assets/avatar.png'
import projectMockupImg from './assets/project_mockup.png'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  // Contact Form State
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Track scroll position to update active navigation links
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
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
    if (formName && formEmail && formMessage) {
      try {
        const response = await fetch("https://formsubmit.co/ajax/mishravaibhav1214@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            message: formMessage,
            _subject: `New Portfolio Message from ${formName}`
          })
        })
        
        if (response.ok) {
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
          alert("Oops! Something went wrong while sending the message. Please try again.")
        }
      } catch (error) {
        console.error("Error submitting contact form:", error)
        alert("Oops! There was a network connection error. Please try again later.")
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
                About
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
          <div className="hero-subtitle" id="hero-sub">Creative Developer</div>
          <h1 className="hero-title" id="hero-main-title">
            Crafting Premium <br />
            <span className="text-gradient">React Experiences</span>
          </h1>
          <p className="hero-desc" id="hero-description-paragraph">
            Hi, I'm Vaibhav. I design and build high-performance web applications 
            with pixel-perfect layouts, modern interactions, and robust user interfaces.
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

      {/* About Section */}
      <section className="section-padding container" id="about">
        <div className="about-grid">
          <div className="about-img-container">
            <div className="about-img-wrapper" id="about-image-wrapper-element">
              <img 
                src={avatarImg} 
                alt="Vaibhav Profile Avatar" 
                className="about-img" 
                id="about-profile-image"
              />
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title text-gradient" id="about-section-heading">About Myself</h2>
            <p className="about-paragraph" id="about-desc-p1">
              I am a web application developer with a passion for designing slick, 
              responsive, and user-centric interfaces. My journey is focused on combining 
              clean technical architecture with polished design.
            </p>
            <p className="about-paragraph" id="about-desc-p2">
              Using React, modern state management, and optimized workflows, I convert complex 
              concepts into functional code that renders beautifully across all devices.
            </p>
            
            <div className="about-stats" id="about-stats-grid">
              <div className="stat-card" id="stat-card-experience">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Learning</div>
              </div>
              <div className="stat-card" id="stat-card-projects">
                <div className="stat-number">20+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-card" id="stat-card-commits">
                <div className="stat-number">500+</div>
                <div className="stat-label">Git Commits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding container" id="projects">
        <h2 className="section-title text-gradient" id="projects-section-heading">Featured Work</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px 0', textAlign: 'left' }}>
          Here are some of the web applications I've engineered. Focus is placed on responsive design, smooth state transitions, and usability.
        </p>

        <div className="projects-grid" id="portfolio-projects-grid">
          {/* Project 1 */}
          <div className="project-card" id="project-card-dashboard">
            <div className="project-img-wrapper">
              <img src={projectMockupImg} alt="Analytics Dashboard Mockup" className="project-img" />
            </div>
            <div className="project-info">
              <h3 className="project-title" id="project-title-dashboard">Analytics UI Dashboard</h3>
              <p className="project-desc">
                A premium web interface demonstrating interactive data visualization, clean sales charts, and customizable layout themes.
              </p>
              <div className="project-tags">
                <span className="tag">React</span>
                <span className="tag">Vite</span>
                <span className="tag">Vanilla CSS</span>
                <span className="tag">Data Viz</span>
              </div>
              <div className="project-links">
                <a href="#projects" className="project-link" id="project-link-demo-dashboard">
                  Live Preview ↗
                </a>
                <a href="https://github.com/Vaibhav1214/my-web-portfolio" className="project-link" id="project-link-repo-dashboard" target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card" id="project-card-planner">
            <div className="project-img-wrapper">
              <img src={projectMockupImg} alt="Smart Project Management Mockup" className="project-img" style={{ filter: 'hue-rotate(180deg)' }} />
            </div>
            <div className="project-info">
              <h3 className="project-title" id="project-title-planner">Smart Task Planner</h3>
              <p className="project-desc">
                An interactive task planning application with dynamic drag-and-drop mechanics, board lists, and fluid modal dialog configurations.
              </p>
              <div className="project-tags">
                <span className="tag">React</span>
                <span className="tag">State Manager</span>
                <span className="tag">Drag & Drop</span>
              </div>
              <div className="project-links">
                <a href="#projects" className="project-link" id="project-link-demo-planner">
                  Live Preview ↗
                </a>
                <a href="https://github.com/Vaibhav1214/my-web-portfolio" className="project-link" id="project-link-repo-planner" target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card" id="project-card-system">
            <div className="project-img-wrapper">
              <img src={projectMockupImg} alt="Interactive UI Library Mockup" className="project-img" style={{ filter: 'hue-rotate(45deg)' }} />
            </div>
            <div className="project-info">
              <h3 className="project-title" id="project-title-system">Design System Explorer</h3>
              <p className="project-desc">
                A sandbox for building reusable web components with custom HSL-based variables, sleek accessibility features, and micro-animations.
              </p>
              <div className="project-tags">
                <span className="tag">React</span>
                <span className="tag">Storybook</span>
                <span className="tag">CSS Variables</span>
              </div>
              <div className="project-links">
                <a href="#projects" className="project-link" id="project-link-demo-system">
                  Live Preview ↗
                </a>
                <a href="https://github.com/Vaibhav1214/my-web-portfolio" className="project-link" id="project-link-repo-system" target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding container" id="skills">
        <h2 className="section-title text-gradient" id="skills-section-heading">Skills & Tools</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px 0', textAlign: 'left' }}>
          Technologies and developer practices I utilize to design, build, and deploy premium web applications.
        </p>

        <div className="skills-container" id="portfolio-skills-container">
          <div className="skills-category" id="skills-category-frontend">
            <h3 className="skills-category-title">Core Development</h3>
            <div className="skills-grid">
              <div className="skill-badge" id="skill-badge-react">
                <span className="skill-icon-blue">⚛</span> React
              </div>
              <div className="skill-badge" id="skill-badge-js">
                <span className="skill-icon-orange">⚡</span> JavaScript (ES6+)
              </div>
              <div className="skill-badge" id="skill-badge-html">
                <span className="skill-icon-orange">✦</span> HTML5 / Canvas
              </div>
              <div className="skill-badge" id="skill-badge-css">
                <span className="skill-icon-blue">🎨</span> CSS3 / Vanilla CSS
              </div>
              <div className="skill-badge" id="skill-badge-vite">
                <span className="skill-icon-orange">⚡</span> Vite Bundler
              </div>
            </div>
          </div>

          <div className="skills-category" id="skills-category-tools">
            <h3 className="skills-category-title">Tools & Infrastructure</h3>
            <div className="skills-grid">
              <div className="skill-badge" id="skill-badge-git">
                <span className="skill-icon-orange">⚙</span> Git & GitHub
              </div>
              <div className="skill-badge" id="skill-badge-npm">
                <span className="skill-icon-orange">📦</span> npm Package Manager
              </div>
              <div className="skill-badge" id="skill-badge-vscode">
                <span className="skill-icon-blue">💻</span> VS Code Editor
              </div>
              <div className="skill-badge" id="skill-badge-devtools">
                <span className="skill-icon-blue">🔍</span> Chrome DevTools
              </div>
            </div>
          </div>

          <div className="skills-category" id="skills-category-design">
            <h3 className="skills-category-title">Design Philosophy</h3>
            <div className="skills-grid">
              <div className="skill-badge" id="skill-badge-ui">
                <span className="skill-icon-orange">✧</span> UI/UX Prototyping
              </div>
              <div className="skill-badge" id="skill-badge-responsive">
                <span className="skill-icon-blue">📱</span> Responsive Grid Layouts
              </div>
              <div className="skill-badge" id="skill-badge-animations">
                <span className="skill-icon-orange">☄</span> Micro-interactions & Animations
              </div>
              <div className="skill-badge" id="skill-badge-accessibility">
                <span className="skill-icon-blue">✓</span> Web Accessibility (a11y)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding container" id="contact">
        <h2 className="section-title text-gradient" id="contact-section-heading">Let's Connect</h2>
        
        <div className="contact-grid">
          <div className="contact-info" id="portfolio-contact-info-panel">
            <h3 className="contact-title" id="contact-panel-heading">Have a project in mind?</h3>
            <p className="contact-desc" id="contact-panel-description">
              I am currently open to project ideas, collaborations, and web development opportunities. Use the contact form or email me directly.
            </p>
            
            <div className="contact-details" id="contact-details-list">
              <div className="contact-item" id="contact-item-email">
                <div className="contact-icon-wrapper">✉</div>
                <div>
                  <div className="contact-label">Mail Me</div>
                  <div className="contact-value">
                    <a href="mailto:mishravaibhav1214@gmail.com" id="contact-email-link">mishravaibhav1214@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item" id="contact-item-location">
                <div className="contact-icon-wrapper">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">India</div>
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
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer" id="portfolio-footer">
        <div className="container footer-content">
          <div className="footer-copy" id="footer-copyright-text">
            © {new Date().getFullYear()} Vaibhav. All rights reserved.
          </div>
          <div className="social-links" id="footer-social-links">
            <a href="https://github.com/Vaibhav1214/my-web-portfolio" target="_blank" rel="noopener noreferrer" className="social-btn" id="social-link-github" aria-label="GitHub Profile">
              🐙
            </a>
            <a href="#home" className="social-btn" id="social-link-linkedin" aria-label="LinkedIn Profile">
              💼
            </a>
            <a href="#home" className="social-btn" id="social-link-twitter" aria-label="Twitter Profile">
              🐦
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
