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
  const handleEnter = (cat) => {
    if (onHoverCategory) onHoverCategory(cat)
  }

  const handleLeave = () => {
    if (onLeaveCategory) onLeaveCategory()
  }

  return (
    <div className="about-editorial-wrapper">

      {/* ============================================================
          SECTION 1: HERO TAGLINE
          ============================================================ */}
      <section className="editorial-section section-hero-tagline">
        <div className="tagline-wrap-container">
          <span className="tagline-line">Turning complex</span>
          <span className="tagline-line middle-split">
            <span className="split-left">problems into</span>
            <span className="split-spacer" />
            <span className="split-right">simple solutions</span>
          </span>
          <span className="tagline-line">that work.</span>
        </div>

        <p className="hero-subtitle-caption">
          UX Designer, UI Designer, UX Researcher &amp; Product Designer
        </p>

        <div className="scroll-hint-indicator">
          <span>Scroll down to explore</span>
          <span className="scroll-arrow">&darr;</span>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: ROLES — Floating plain text, no cards
          ============================================================ */}
      <section className="editorial-section section-roles-display">
        <div className="roles-flow-container">
          <div
            className="role-group role-center interactive-role-group"
            onMouseEnter={() => handleEnter('product-design')}
            onMouseLeave={handleLeave}
          >
            <span className="role-title">Product Design</span>
            <span className="role-item">Interaction Architecture</span>
            <span className="role-item">Design Strategy</span>
            <span className="role-item">Product Vision</span>
            <span className="role-item">Design Systems</span>
          </div>

          <div className="role-split-row">
            <div
              className="role-group role-align-right interactive-role-group"
              onMouseEnter={() => handleEnter('ux-research')}
              onMouseLeave={handleLeave}
            >
              <span className="role-title">UX Research</span>
              <span className="role-item">User Research &amp; Testing</span>
              <span className="role-item">Empathy Mapping</span>
              <span className="role-item">Journey Mapping</span>
              <span className="role-item">Information Architecture</span>
              <span className="role-item">Wireframing</span>
            </div>

            <div className="role-avatar-gap" />

            <div
              className="role-group role-align-left interactive-role-group"
              onMouseEnter={() => handleEnter('ui-design')}
              onMouseLeave={handleLeave}
            >
              <span className="role-title">UI Design</span>
              <span className="role-item">Visual Systems</span>
              <span className="role-item">Micro-animations</span>
              <span className="role-item">Interactive Prototyping</span>
              <span className="role-item">Design Guidelines</span>
              <span className="role-item">Responsive Design</span>
            </div>
          </div>

          <div
            className="role-group role-center interactive-role-group"
            onMouseEnter={() => handleEnter('digital-spatial')}
            onMouseLeave={handleLeave}
          >
            <span className="role-title">Digital &amp; Spatial</span>
            <span className="role-item">Spatial UI / XR</span>
            <span className="role-item">AI Integration</span>
            <span className="role-item">Accessibility</span>
            <span className="role-item">3D Design</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: CONTACT — Floating text, same style
          ============================================================ */}
      <section className="editorial-section section-contact-display">
        <div className="roles-flow-container">
          <div className="role-group role-center">
            <span className="role-title">Contact</span>
          </div>

          <div className="role-split-row">
            <div
              className="role-group role-align-right interactive-role-group"
              onMouseEnter={() => handleEnter('contact-left')}
              onMouseLeave={handleLeave}
            >
              <a href="https://www.linkedin.com/in/connectwithshaivi/" target="_blank" rel="noopener noreferrer" className="role-item role-link">LinkedIn</a>
              <a href="https://www.behance.net/shaivilavhe11" target="_blank" rel="noopener noreferrer" className="role-item role-link">Behance</a>
            </div>
            <div className="role-avatar-gap" />
            <div
              className="role-group role-align-left interactive-role-group"
              onMouseEnter={() => handleEnter('contact-right')}
              onMouseLeave={handleLeave}
            >
              <a href="mailto:shaivilavhe@gmail.com" className="role-item role-link">Email</a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="role-item role-link">Download CV</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: ALL CHAPTERS — displayed vertically in sequence
          Each chapter: title row → left text + gap + right text
          The fixed avatar sits in the gap as text scrolls past
          ============================================================ */}
      {CHAPTERS.map((ch) => (
        <section key={ch.num} className="chapter-scroll-section">
          {/* Chapter title: "Ch. One    I    Feel" */}
          <div className="chapter-title-row">
            <span className="chapter-num-name">Ch. {ch.numText}</span>
            <span className="roman-numeral-display">{ch.num}</span>
            <span className="chapter-title-name">{ch.title}</span>
          </div>

          {/* Left & Right text columns wrapping around avatar gap */}
          <div className="chapter-columns-wrap">
            <div
              className="chapter-text-column column-left interactive-role-group"
              onMouseEnter={() => handleEnter('chapter-left')}
              onMouseLeave={handleLeave}
            >
              <p>{ch.leftText}</p>
            </div>
            <div className="chapter-center-spacer" />
            <div
              className="chapter-text-column column-right interactive-role-group"
              onMouseEnter={() => handleEnter('chapter-right')}
              onMouseLeave={handleLeave}
            >
              <p>{ch.rightText}</p>
            </div>
          </div>
        </section>
      ))}

    </div>
  )
}

export default About
