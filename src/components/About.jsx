import { useState, useEffect, useRef } from 'react'
import './About.css'

const CHAPTERS = [
  {
    num: 'I',
    numText: 'One',
    title: 'Feel',
    label: 'Ch I : Feel',
    leftText: "Design isn't just about how something looks — it's about how it feels to interact with. Intuitive interfaces build immediate trust and emotional resonance, making complex systems feel effortless, responsive, and welcoming.",
    rightText: "By prioritizing human emotion and cognitive flow, I craft experiences that connect on a deeper level. Every micro-interaction and motion transition is designed to spark joy, clarity, and delight."
  },
  {
    num: 'II',
    numText: 'Two',
    title: 'Quality',
    label: 'Ch II : Quality',
    leftText: "I don't believe in producing work just to fill space or meet a deadline for its own sake. Every project deserves time, care, and intention, because that's where something meaningful takes shape. Quality isn't something you add at the end — it's a mindset that informs every step of the process.",
    rightText: "That's why I allow the work the time it needs to come together properly. Good design happens when everything aligns — form, function, and context — and that kind of result can't be rushed without compromising what makes it strong in the first place."
  },
  {
    num: 'III',
    numText: 'Three',
    title: 'Purpose',
    label: 'Ch III : Purpose',
    leftText: "Great design starts with deep empathy and relentless curiosity. I dive into user research and real-world behaviors to uncover the core 'why' behind every problem before sketching a single layout.",
    rightText: "Purposeful design eliminates unnecessary clutter and focuses on what truly matters. Every element, interaction, and structural decision serves a clear user goal and drives meaningful product outcomes."
  },
  {
    num: 'IV',
    numText: 'Four',
    title: 'Detail',
    label: 'Ch IV : Detail',
    leftText: "The magic lives in the details. From pixel-perfect typography to consistent spacing tokens, the subtle nuances elevate a functional interface into an unforgettable digital experience.",
    rightText: "Precision and consistency build trust in digital environments. I obsess over edge cases, micro-animations, and visual harmony to ensure the final product feels seamless across every breakpoint."
  }
]

function About() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  const taglineRef = useRef(null)
  const rolesRef = useRef(null)
  const contactRef = useRef(null)
  const chaptersRef = useRef(null)

  // Track mouse position for subtle avatar float effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2)
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2)
      setMouseOffset({ x: x * 6, y: y * 6 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="about-editorial-wrapper">
      {/* CENTERED STICKY 3D AVATAR HEAD - PERFECT DEAD-CENTER AT (50vw, 50vh) */}
      <div className="avatar-center-stage">
        <div
          className="avatar-head-wrapper"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
          }}
        >
          <img
            src="/assets/head_3d_clean.png"
            alt="Shaivi 3D Avatar Head"
            className="avatar-head-img"
          />
          <div className="avatar-ambient-glow" />
        </div>
      </div>

      {/* SECTION 1: TAGLINE */}
      <section
        id="section-tagline"
        ref={taglineRef}
        className="editorial-section section-hero-tagline"
      >
        <div className="tagline-wrap-container">
          <h1 className="hero-tagline-text">
            <span className="tagline-line top-line">Turning complex</span>
            <span className="tagline-line middle-split">
              <span className="split-left">problems into</span>
              <span className="split-spacer" />
              <span className="split-right">simple solutions</span>
            </span>
            <span className="tagline-line bottom-line">that work.</span>
          </h1>
          <p className="hero-subtitle-caption">
            UX Designer, UI Designer, UX Researcher &amp; Product Designer
          </p>
          <div className="scroll-hint-indicator">
            <span>Scroll down to explore</span>
            <span className="scroll-arrow">&darr;</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: ROLES */}
      <section
        id="section-roles"
        ref={rolesRef}
        className="editorial-section section-roles-display"
      >
        <div className="roles-container">
          <h2 className="section-header-title">UX designer, UI Designer, UX researcher, Product Designer.</h2>

          <div className="roles-radial-grid">
            {/* Top Node */}
            <div className="role-node node-top">
              <span className="role-category-label">Product Designer</span>
              <ul className="role-skills-list">
                <li>Interaction Architecture</li>
                <li>Design Strategy</li>
                <li>Product Vision</li>
              </ul>
            </div>

            {/* Left Node */}
            <div className="role-node node-left">
              <span className="role-category-label">UX Designer &amp; Researcher</span>
              <ul className="role-skills-list">
                <li>User Research &amp; Testing</li>
                <li>Empathy &amp; Journey Mapping</li>
                <li>Information Architecture</li>
                <li>Wireframing</li>
              </ul>
            </div>

            {/* Right Node */}
            <div className="role-node node-right">
              <span className="role-category-label">UI Designer</span>
              <ul className="role-skills-list">
                <li>Visual Systems</li>
                <li>Micro-animations</li>
                <li>Interactive Prototyping</li>
                <li>Design Guidelines</li>
              </ul>
            </div>

            {/* Bottom Node */}
            <div className="role-node node-bottom">
              <span className="role-category-label">Digital &amp; Spatial Design</span>
              <ul className="role-skills-list">
                <li>Spatial UI / XR</li>
                <li>AI Integration</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTACT */}
      <section
        id="section-contact"
        ref={contactRef}
        className="editorial-section section-contact-display"
      >
        <div className="contact-container">
          <h2 className="section-header-title">Contact: Linkedin, Behance, Email</h2>

          <div className="contact-radial-grid">
            <a
              href="https://www.linkedin.com/in/connectwithshaivi/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-linkedin"
            >
              <span className="contact-card-label">LinkedIn</span>
              <span className="contact-card-link">connectwithshaivi &rarr;</span>
            </a>

            <a
              href="https://www.behance.net/shaivilavhe11"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-behance"
            >
              <span className="contact-card-label">Behance</span>
              <span className="contact-card-link">shaivilavhe11 &rarr;</span>
            </a>

            <a
              href="mailto:shaivilavhe@gmail.com"
              className="contact-card card-email"
            >
              <span className="contact-card-label">Email</span>
              <span className="contact-card-link">shaivilavhe@gmail.com &rarr;</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="contact-card card-resume"
            >
              <span className="contact-card-label">Curriculum Vitae</span>
              <span className="contact-card-link">Download PDF &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: CHAPTERS / PRINCIPLES */}
      <section
        id="section-chapters"
        ref={chaptersRef}
        className="editorial-section section-chapters-display"
      >
        <div className="chapters-container">
          {/* Chapter Selector Tabs */}
          <div className="chapter-selector-tabs">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.num}
                className={`chapter-tab-pill ${activeChapter === idx ? 'active' : ''}`}
                onClick={() => setActiveChapter(idx)}
              >
                {ch.label}
              </button>
            ))}
          </div>

          {/* Active Chapter Header */}
          <div className="chapter-header-wrap">
            <span className="roman-numeral-display">
              {CHAPTERS[activeChapter].num}
            </span>
            <div className="chapter-title-row">
              <span className="chapter-num-name">Ch. {CHAPTERS[activeChapter].numText}</span>
              <span className="chapter-divider">|</span>
              <span className="chapter-title-name">{CHAPTERS[activeChapter].title}</span>
            </div>
          </div>

          {/* Curved Left & Right Text Columns wrapping around center avatar */}
          <div className="chapter-columns-wrap">
            <div className="chapter-text-column column-left">
              <p>{CHAPTERS[activeChapter].leftText}</p>
            </div>
            <div className="chapter-center-spacer" />
            <div className="chapter-text-column column-right">
              <p>{CHAPTERS[activeChapter].rightText}</p>
            </div>
          </div>

          {/* Quick Chapter Step Dots */}
          <div className="chapter-dots-indicator">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.num}
                className={`chapter-dot ${activeChapter === idx ? 'active' : ''}`}
                onClick={() => setActiveChapter(idx)}
                aria-label={`Go to Chapter ${ch.numText}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
