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
                  {/* Duplicate the content twice for seamless infinite scrolling */}
                  {[...Array(2)].map((_, i) => (
                    <div className="marquee-content-group" key={i}>
                      {['UI/UX DESIGN', 'SPATIAL DESIGN', 'USER RESEARCH', 'INFORMATION ARCHITECTURE', 'INTERACTION DESIGN', 'PROTOTYPING'].map((word, index) => (
                        <React.Fragment key={`${i}-${index}`}>
                          <span className="marquee-word">{word}</span>
                          <div className="terracotta-diamond" />
                        </React.Fragment>
                      ))}
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
