import { useEffect, useRef } from 'react'
import './About.css'

const CHAPTERS = [
  {
    num: 'I',
    numText: 'One',
    title: 'Feel',
    leftText: "Design isn't just about how something looks — it's about how it feels to interact with. Intuitive interfaces build immediate trust and emotional resonance, making complex systems feel effortless, responsive, and welcoming.",
    rightText: "By prioritizing human emotion and cognitive flow, I craft experiences that connect on a deeper level. Every micro-interaction and motion transition is designed to spark joy, clarity, and delight."
  },
  {
    num: 'II',
    numText: 'Two',
    title: 'Quality',
    leftText: "I don't believe in producing work just to fill space or meet a deadline for its own sake. Every project deserves time, care, and intention, because that's where something meaningful takes shape. Quality isn't something you add at the end — it's a mindset that informs every step of the process.",
    rightText: "That's why I allow the work the time it needs to come together properly. Good design happens when everything aligns — form, function, and context — and that kind of result can't be rushed without compromising what makes it strong in the first place."
  },
  {
    num: 'III',
    numText: 'Three',
    title: 'Purpose',
    leftText: "Great design starts with deep empathy and relentless curiosity. I dive into user research and real-world behaviors to uncover the core 'why' behind every problem before sketching a single layout.",
    rightText: "Purposeful design eliminates unnecessary clutter and focuses on what truly matters. Every element, interaction, and structural decision serves a clear user goal and drives meaningful product outcomes."
  },
  {
    num: 'IV',
    numText: 'Four',
    title: 'Detail',
    leftText: "The magic lives in the details. From pixel-perfect typography to consistent spacing tokens, the subtle nuances elevate a functional interface into an unforgettable digital experience.",
    rightText: "Precision and consistency build trust in digital environments. I obsess over edge cases, micro-animations, and visual harmony to ensure the final product feels seamless across every breakpoint."
  }
]

function About({ onHoverCategory, onLeaveCategory }) {
  const editorialRef = useRef(null)

  const handleEnter = (cat) => {
    if (onHoverCategory) onHoverCategory(cat)
  }

  const handleLeave = () => {
    if (onLeaveCategory) onLeaveCategory()
  }

  // Pretext Dynamic Text Wrap Engine (chenglou.me/pretext dynamic contour wrapping)
  useEffect(() => {
    const container = editorialRef.current
    if (!container) return

    let animId
    const R = 210 // Avatar head exclusion radius in px (head radius + 40px clearance margin)
    
    const updatePretextLayout = () => {
      const headCY = window.innerHeight / 2
      const items = container.querySelectorAll('.pretext-item')

      items.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elCY = rect.top + rect.height / 2
        const dy = elCY - headCY
        const absDy = Math.abs(dy)
        const side = el.dataset.side // 'left', 'right', or 'center'

        if (absDy < R) {
          // Inside the circular exclusion zone of the avatar head
          // Compute clearance radius at this vertical level: sqrt(R^2 - dy^2)
          const clearance = Math.sqrt(R * R - dy * dy)

          if (side === 'left') {
            // Push left item further left to contour along left curve of head
            const extraShift = clearance - 75
            const shiftX = Math.max(0, extraShift)
            el.style.transform = `translateX(-${shiftX}px)`
          } else if (side === 'right') {
            // Push right item further right to contour along right curve of head
            const extraShift = clearance - 75
            const shiftX = Math.max(0, extraShift)
            el.style.transform = `translateX(${shiftX}px)`
          } else if (side === 'center') {
            // Center element (e.g. single title) hitting face directly:
            // Smoothly shift up or down to clear the head top/bottom
            if (dy < 0) {
              const pushY = (1 - absDy / R) * -45
              el.style.transform = `translateY(${pushY}px)`
            } else {
              const pushY = (1 - absDy / R) * 45
              el.style.transform = `translateY(${pushY}px)`
            }
          }
        } else {
          // Outside exclusion zone: return to natural position
          el.style.transform = 'translate(0, 0)'
        }
      })
    }

    const onScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(() => {
          updatePretextLayout()
          animId = null
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updatePretextLayout()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="about-editorial-wrapper" ref={editorialRef}>

      {/* ============================================================
          SECTION 1: HERO TAGLINE WITH MONOSPACE TYPOGRAPHY & AVATAR SPLIT
          ============================================================ */}
      <section className="editorial-section section-hero-tagline">
        <div className="tagline-wrap-container">
          <span className="tagline-line">I am Shaivi,</span>
          <span className="tagline-line middle-split">
            <span className="split-left">I am a</span>
            <span className="split-spacer" />
            <span className="split-right">UI/UX designer.</span>
          </span>
          <span className="tagline-subtext">
            I love to research, get to the bottom of the problems and make stuff that actually works.
          </span>
        </div>

        <div className="scroll-hint-indicator">
          <span>Scroll down to explore</span>
          <span className="scroll-arrow">&darr;</span>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: ROLES & SKILLS — PRETEXT DYNAMIC CONTOUR WRAPPING
          ============================================================ */}
      <section className="editorial-section section-roles-display">
        <div className="roles-flow-container">

          {/* Category 1: Product Design */}
          <div className="pretext-group">
            <div
              className="role-group role-center interactive-role-group pretext-item"
              data-side="center"
              onMouseEnter={() => handleEnter('product-design')}
              onMouseLeave={handleLeave}
            >
              <span className="role-title">PRODUCT DESIGN</span>
            </div>

            <div className="role-split-row">
              <div
                className="role-group role-align-right interactive-role-group"
                onMouseEnter={() => handleEnter('product-design')}
                onMouseLeave={handleLeave}
              >
                <span className="role-item pretext-item" data-side="left">Interaction Architecture</span>
                <span className="role-item pretext-item" data-side="left">Design Strategy</span>
              </div>

              <div className="role-avatar-gap" />

              <div
                className="role-group role-align-left interactive-role-group"
                onMouseEnter={() => handleEnter('product-design')}
                onMouseLeave={handleLeave}
              >
                <span className="role-item pretext-item" data-side="right">Product Vision</span>
                <span className="role-item pretext-item" data-side="right">Design Systems</span>
              </div>
            </div>
          </div>

          {/* Category 2: UX Research & UI Design */}
          <div className="pretext-group">
            <div className="role-split-row">
              <div
                className="role-group role-align-right interactive-role-group"
                onMouseEnter={() => handleEnter('ux-research')}
                onMouseLeave={handleLeave}
              >
                <span className="role-title pretext-item" data-side="left">UX RESEARCH</span>
                <span className="role-item pretext-item" data-side="left">User Research &amp; Testing</span>
                <span className="role-item pretext-item" data-side="left">Empathy Mapping</span>
                <span className="role-item pretext-item" data-side="left">Journey Mapping</span>
                <span className="role-item pretext-item" data-side="left">Information Architecture</span>
                <span className="role-item pretext-item" data-side="left">Wireframing</span>
              </div>

              <div className="role-avatar-gap" />

              <div
                className="role-group role-align-left interactive-role-group"
                onMouseEnter={() => handleEnter('ui-design')}
                onMouseLeave={handleLeave}
              >
                <span className="role-title pretext-item" data-side="right">UI DESIGN</span>
                <span className="role-item pretext-item" data-side="right">Visual Systems</span>
                <span className="role-item pretext-item" data-side="right">Micro-animations</span>
                <span className="role-item pretext-item" data-side="right">Interactive Prototyping</span>
                <span className="role-item pretext-item" data-side="right">Design Guidelines</span>
                <span className="role-item pretext-item" data-side="right">Responsive Design</span>
              </div>
            </div>
          </div>

          {/* Category 3: Digital & Spatial */}
          <div className="pretext-group">
            <div
              className="role-group role-center interactive-role-group pretext-item"
              data-side="center"
              onMouseEnter={() => handleEnter('digital-spatial')}
              onMouseLeave={handleLeave}
            >
              <span className="role-title">DIGITAL &amp; SPATIAL</span>
            </div>

            <div className="role-split-row">
              <div
                className="role-group role-align-right interactive-role-group"
                onMouseEnter={() => handleEnter('digital-spatial')}
                onMouseLeave={handleLeave}
              >
                <span className="role-item pretext-item" data-side="left">Spatial UI / XR</span>
                <span className="role-item pretext-item" data-side="left">AI Integration</span>
              </div>

              <div className="role-avatar-gap" />

              <div
                className="role-group role-align-left interactive-role-group"
                onMouseEnter={() => handleEnter('digital-spatial')}
                onMouseLeave={handleLeave}
              >
                <span className="role-item pretext-item" data-side="right">Accessibility</span>
                <span className="role-item pretext-item" data-side="right">3D Design</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          SECTION 3: CONTACT — PRETEXT DYNAMIC CONTOUR WRAPPING
          ============================================================ */}
      <section className="editorial-section section-contact-display">
        <div className="roles-flow-container">
          <div className="role-group role-center pretext-item" data-side="center">
            <span className="role-title">CONTACT</span>
          </div>

          <div className="role-split-row">
            <div
              className="role-group role-align-right interactive-role-group"
              onMouseEnter={() => handleEnter('contact-left')}
              onMouseLeave={handleLeave}
            >
              <a href="https://www.linkedin.com/in/connectwithshaivi/" target="_blank" rel="noopener noreferrer" className="role-item role-link pretext-item" data-side="left">LinkedIn</a>
              <a href="https://www.behance.net/shaivilavhe11" target="_blank" rel="noopener noreferrer" className="role-item role-link pretext-item" data-side="left">Behance</a>
            </div>
            <div className="role-avatar-gap" />
            <div
              className="role-group role-align-left interactive-role-group"
              onMouseEnter={() => handleEnter('contact-right')}
              onMouseLeave={handleLeave}
            >
              <a href="mailto:shaivilavhe@gmail.com" className="role-item role-link pretext-item" data-side="right">Email</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="role-item role-link pretext-item" data-side="right">Download CV</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: CHAPTERS — Monospace Text Wrapping around Fixed Avatar
          ============================================================ */}
      {CHAPTERS.map((ch) => (
        <section key={ch.num} className="chapter-scroll-section">
          <div className="chapter-title-row pretext-item" data-side="center">
            <span className="chapter-num-name">Ch. {ch.numText}</span>
            <span className="roman-numeral-display">{ch.num}</span>
            <span className="chapter-title-name">{ch.title}</span>
          </div>

          <div className="chapter-columns-wrap">
            <div
              className="chapter-text-column column-left interactive-role-group"
              onMouseEnter={() => handleEnter('chapter-left')}
              onMouseLeave={handleLeave}
            >
              <p className="pretext-item" data-side="left">{ch.leftText}</p>
            </div>
            <div className="chapter-center-spacer" />
            <div
              className="chapter-text-column column-right interactive-role-group"
              onMouseEnter={() => handleEnter('chapter-right')}
              onMouseLeave={handleLeave}
            >
              <p className="pretext-item" data-side="right">{ch.rightText}</p>
            </div>
          </div>
        </section>
      ))}

    </div>
  )
}

export default About
