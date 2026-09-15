import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Work.css'

const caseStudies = [
  {
    id: 'saathi',
    category: 'UX / PRODUCT DESIGN CASE STUDY',
    titleLine1: 'Saathi',
    titleLine2Italic: 'Navigate Safely',
    titleLine3: 'Together.',
    description: "A women's safety navigation app that replaces anxiety with community-powered confidence — verified safe routes, real-time support, and a network of trusted saathis.",
    mockupImg: '/assets/saathi_iphone_mockup.png',
    cardBackground: 'linear-gradient(135deg, #2c1a67 0%, #1c1048 100%)',
    tags: [
      'Mobile App Design',
      'User Testing',
      'User Research',
      'Information Architecture',
      'Safety Tech',
      'Inclusive Design'
    ],
    bottomTitleLine1: "Saathi: Women's Safety",
    bottomTitleLine2: 'App'
  },
  {
    id: 'agri',
    category: 'ENTERPRISE UX / DATA DESIGN',
    titleLine1: 'AgriPulse',
    titleLine2Italic: 'Smart Farming',
    titleLine3: 'Insights.',
    description: 'An intuitive agricultural monitoring dashboard designed for government officials to effortlessly visualize crop health, yield metrics, and regional data.',
    mockupImg: '/work/02.jpg',
    cardBackground: 'linear-gradient(135deg, #0f3d36 0%, #082622 100%)',
    tags: [
      'Dashboard Design',
      'Data Visualization',
      'User Research',
      'Enterprise UX',
      'Agritech'
    ],
    bottomTitleLine1: 'AgriPulse: Smart Agriculture',
    bottomTitleLine2: 'Dashboard'
  },
  {
    id: 'goodreads',
    category: 'UX REDESIGN & USER TESTING',
    titleLine1: 'Goodreads',
    titleLine2Italic: 'Rediscover Reading',
    titleLine3: 'Together.',
    description: 'A comprehensive heuristic evaluation, user testing, and modern UI redesign of the Goodreads mobile experience to streamline book discovery.',
    mockupImg: '/work/03.jpg',
    cardBackground: 'linear-gradient(135deg, #4d1836 0%, #2b0b1e 100%)',
    tags: [
      'Heuristic Evaluation',
      'User Testing',
      'Mobile UX Redesign',
      'Prototyping',
      'Design Systems'
    ],
    bottomTitleLine1: 'Goodreads: Mobile UX',
    bottomTitleLine2: 'Redesign'
  }
]

function Work() {
  const navigate = useNavigate()
  const [projectIndex, setProjectIndex] = useState(0)

  const activeProject = caseStudies[projectIndex]

  const handleNextProject = () => {
    setProjectIndex((prev) => (prev + 1) % caseStudies.length)
  }

  return (
    <div className="work-page-container">
      {/* Top Left Corner Floating Turntable Music Player */}
      <div
        className="work-top-left"
        onClick={() => navigate('/')}
        title="Return to Home"
        role="button"
        tabIndex={0}
      >
        <img
          src="/assets/turntable_transparent.png"
          alt="Record Player"
          className="turntable-corner-img"
        />
      </div>

      {/* Top Right Corner Floating 3D Avatar Head */}
      <div
        className="work-top-right"
        onClick={() => navigate('/about')}
        title="About Shaivi"
        role="button"
        tabIndex={0}
      >
        <img
          src="/assets/head_3d_clean.png"
          alt="Shaivi 3D Character"
          className="avatar-corner-img"
        />
      </div>

      {/* Center Case Study Card Wrapper */}
      <div className="work-card-wrapper">
        <div
          className="work-case-study-card"
          style={{ background: activeProject.cardBackground }}
        >
          {/* Decorative Wave BG */}
          <div className="card-wave-bg"></div>

          {/* Left Column Content */}
          <div className="card-left-content">
            <div className="case-study-badge">{activeProject.category}</div>

            <h1 className="case-study-title">
              {activeProject.titleLine1}
              <br />
              <span className="italic-accent">{activeProject.titleLine2Italic}</span>
              <br />
              {activeProject.titleLine3}
            </h1>

            <p className="case-study-desc">{activeProject.description}</p>

            {/* Tools Used Section */}
            <div className="tools-used-group">
              <span className="tools-label">Tools used:</span>
              <div className="tools-badges-row">
                <div className="tool-badge-square" title="Figma">
                  <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
                    <path
                      d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
                      fill="#1ABCFE"
                    />
                    <path
                      d="M0 47.5C0 42.2533 4.2467 38 9.5 38H19V47.5C19 52.7467 14.7533 57 9.5 57C4.2467 57 0 52.7467 0 47.5Z"
                      fill="#0ACF83"
                    />
                    <path
                      d="M19 0V19H28.5C33.7467 19 38 14.7533 38 9.5C38 4.2467 33.7467 0 28.5 0H19Z"
                      fill="#FF7262"
                    />
                    <path
                      d="M0 9.5C0 14.7533 4.2467 19 9.5 19H19V0H9.5C4.2467 0 0 4.2467 0 9.5Z"
                      fill="#F24E1E"
                    />
                    <path
                      d="M0 28.5C0 33.7467 4.2467 38 9.5 38H19V19H9.5C4.2467 19 0 23.2533 0 28.5Z"
                      fill="#A259FF"
                    />
                  </svg>
                </div>
                <div className="tool-badge-square" title="Anthropic / Miro">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#f25f4c"
                    />
                  </svg>
                </div>
                <div className="tool-badge-square" title="Sparkle AI">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                      fill="#38bdf8"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="case-study-tags">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (3D Mockup) */}
          <div className="card-right-content">
            <div className="iphone-mockup-wrapper">
              <img
                src={activeProject.mockupImg}
                alt={activeProject.titleLine1}
                className="iphone-mockup-img"
              />
            </div>
          </div>
        </div>

        {/* Floating Right Chevron Navigation Button */}
        <button
          className="nav-chevron-btn"
          onClick={handleNextProject}
          aria-label="Next Case Study"
        >
          <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
            <path
              d="M4 4L24 24L4 44"
              stroke="#e6428c"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Centered Title */}
      <div className="bottom-project-title-group">
        <h2 className="bottom-project-title">
          {activeProject.bottomTitleLine1}
          <br />
          {activeProject.bottomTitleLine2}
        </h2>
      </div>
    </div>
  )
}

export default Work
