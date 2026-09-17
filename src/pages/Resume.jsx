import React, { useState, useEffect, useRef } from 'react'
import TurntablePlayer from '../components/TurntablePlayer'
import P5CornerRadialMenu from '../components/P5CornerRadialMenu'
import './Resume.css'

export default function Resume() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [scrollX, setScrollX] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      // Map vertical mouse wheel inputs directly to horizontal track translation (deltaX = deltaY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY * 1.15
      }
    }

    const handleScroll = () => {
      setScrollX(el.scrollLeft)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="resume-page-wrapper">
      {/* Background Grain & Paper Texture (0.8x Parallax Speed) */}
      <div
        className="resume-bg-overlay"
        style={{ transform: `translateX(${scrollX * -0.2}px)` }}
      />
      <div className="resume-paper-texture" />

      {/* Top Left Corner Floating Turntable (Fixed) */}
      <div className="resume-turntable-fixed">
        <TurntablePlayer width="95px" />
      </div>



      {/* Top Right Corner P5 Radial Menu */}
      <P5CornerRadialMenu />

      {/* Ultra-Wide Side-Scrolling Scrapbook Canvas */}
      <div className="resume-scroll-container" ref={scrollRef}>
        <main className="resume-canvas-track">
          
          {/* ================= SECTION 1: PROFILE & BIO STAGE ================= */}
          <section className="canvas-section section-profile-bio">
            {/* Cutout & Inflatable 3D Pink Star Balloon Stage (0.8x Parallax Shift) */}
            <div
              className="profile-stage"
              style={{ transform: `translateX(${scrollX * -0.08}px)` }}
            >
              {/* Inflatable glossy 3D pink star balloon */}
              <div className="star-balloon-wrapper">
                <img
                  src="/assets/pink_star_balloon.png"
                  alt="Inflatable Pink Star Balloon"
                  className="star-balloon-img"
                />
              </div>

              {/* High-resolution Cutout of Shaivi */}
              <div className="shaivi-cutout-wrapper">
                <img
                  src="/assets/shaivi_cutout.png"
                  alt="Shaivi Lavhe"
                  className="shaivi-cutout-photo"
                  onError={(e) => {
                    e.target.src = '/assets/shaivi_upper_body.png'
                  }}
                />
              </div>
            </div>

            {/* Headline, Title & About Me Section (1.0x Base Speed) */}
            <div className="bio-content">
              <h1 className="resume-headline">It's Shaivi Lavhe!</h1>
              <h2 className="resume-role-title">UI/UX Designer</h2>

              <div className="about-me-section">
                <h3 className="about-me-heading">About me</h3>
                <p className="about-me-paragraph">
                  A forward-thinking UI/UX Designer blending the principles of spatial design with digital innovation. My expertise lies in user research, detailed information architecture, and leveraging complex user flows and AI to solve modern design challenges. I excel at transforming intricate, multi-layered concepts into engaging, highly accessible interactive experiences.
                </p>
              </div>
            </div>

            {/* Sticky Canvas Footer: Magenta Horizontal Marquee Banner */}
            <div className="contact-ribbon-wrapper">
              <div className="contact-ribbon-banner marquee-container">
                <div className="marquee-track">
                  {/* Duplicate the content 4 times for seamless infinite scrolling on ultrawide screens */}
                  {[...Array(4)].map((_, i) => (
                    <div className="marquee-content-group" key={i}>
                      <span className="marquee-label">Contact me:</span>

                      <a href="mailto:shaivilavhe@gmail.com" className="marquee-link" target="_blank" rel="noopener noreferrer">
                        <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="3" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span>shaivilavhe@gmail.com</span>
                      </a>

                      <a href="https://www.linkedin.com/in/connectwithshaivi" className="marquee-link" target="_blank" rel="noopener noreferrer">
                        <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                        </svg>
                        <span>www.linkedin.com/in/connectwithshaivi</span>
                      </a>

                      <a href="https://www.behance.net/shaivilavhe11" className="marquee-link" target="_blank" rel="noopener noreferrer">
                        <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h2.797c2.01 0 2.266-2.014 2.266-3.134 0-1.119-.256-3.133-2.266-3.133h-2.797v6.267zm0 5.988h3.118c2.56 0 2.828-2.371 2.828-3.505 0-1.134-.268-3.504-2.828-3.504h-3.118v7.009z" />
                        </svg>
                        <span>https://www.behance.net/shaivilavhe11</span>
                      </a>

                      <a href="/resume.pdf" className="marquee-link" target="_blank" rel="noopener noreferrer">
                        <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="8 12 12 16 16 12" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                        </svg>
                        <span>Download Resume</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION 2: INTERACTIVE SCRAPBOOK MODULES ================= */}
          <section className="canvas-section section-scrapbook-modules">
            
            {/* 1. TOOLS FRONT CLAMSHELL (1.2x Parallax Speed) */}
            <div
              className={`scrapbook-item tools-shell-card ${hoveredCard === 'tools' ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard('tools')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ transform: `translateX(${scrollX * 0.06}px)` }}
            >
              <div className="clamshell-container">
                <img
                  src="/assets/clamshell_3d.png"
                  alt="3D Front Clamshell Tools"
                  className="clamshell-3d-img"
                />
              </div>
            </div>

            {/* 2. SKILLS NOTEPAD SHEET */}
            <div
              className={`scrapbook-item skills-notepad-card ${hoveredCard === 'skills' ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard('skills')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="washi-tape-pink" />
              <div className="notepad-ribbon-bow" />

              <div className="notepad-spiral-holes">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="spiral-hole" />
                ))}
              </div>

              <h3 className="notepad-title">Skills</h3>

              <ul className="skills-list">
                <li><span className="pink-bullet">•</span> User Experience (UX) Design</li>
                <li><span className="pink-bullet">•</span> User Interface (UI) Design</li>
                <li><span className="pink-bullet">•</span> Information Architecture (IA)</li>
                <li><span className="pink-bullet">•</span> User Flows & Wireframing</li>
                <li><span className="pink-bullet">•</span> Interaction Design</li>
                <li><span className="pink-bullet">•</span> User Research & Persona Building</li>
                <li><span className="pink-bullet">•</span> Usability Testing</li>
              </ul>

              <img
                src="/assets/toy_bear_3d.png"
                alt="Miniature Y2K Bear Toy"
                className="y2k-bear-accessory"
              />

              <div className="y2k-buttons-group">
                <div className="y2k-glossy-heart" title="Y2K Heart Badge">
                  <div className="heart-shine" />
                </div>
                <div className="y2k-flower-button" title="Flower Button">
                  <div className="button-holes">
                    <span className="hole" />
                    <span className="hole" />
                    <span className="hole" />
                    <span className="hole" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. EDUCATION LANYARD BADGE & LANGUAGES STARBURST (1.2x Parallax Speed) */}
            <div className="education-and-languages-group">
              
              <div
                className={`scrapbook-item education-lanyard-card ${hoveredCard === 'edu' ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard('edu')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ transform: `translateX(${scrollX * 0.08}px)` }}
              >
                <img
                  src="/assets/pink_lanyard.png"
                  alt="Education Lanyard Badge"
                  className="lanyard-badge-img"
                />
              </div>

              <div
                className={`scrapbook-item languages-starburst-card ${hoveredCard === 'lang' ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard('lang')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ transform: `translateX(${scrollX * 0.08}px)` }}
              >
                <img
                  src="/assets/languages_badge.png"
                  alt="Languages Badge"
                  className="languages-badge-img"
                />
              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  )
}
