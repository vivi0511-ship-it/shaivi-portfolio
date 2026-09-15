import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TurntablePlayer from '../components/TurntablePlayer'
import './Work.css'

const caseStudies = [
  {
    id: 'saathi',
    category: 'UX / PRODUCT DESIGN CASE STUDY',
    badgeClass: 'badge-gold',
    titleType: 'serif',
    titleLine1: 'Saathi',
    titleLine2Italic: 'Navigate Safely',
    titleLine3: 'Together.',
    description: "A women's safety navigation app that replaces anxiety with community-powered confidence — verified safe routes, real-time support, and a network of trusted saathis.",
    mockupImg: '/assets/saathi_iphone_mockup.png',
    mockupType: 'iphone',
    cardBackground: 'linear-gradient(135deg, #2c1a67 0%, #1c1048 100%)',
    hasWaveBg: true,
    tagClass: '',
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
    category: 'AGRICULTURE DASHBOARD',
    badgeClass: 'badge-green',
    titleType: 'tech',
    titleLine1: 'Unified',
    titleLine2: 'Data &',
    titleLine3Accent: 'Monitoring',
    titleLine4: 'System',
    description: 'A role-based agricultural intelligence dashboard designed to centralize crop health, pest alerts, weather data, and field analytics — replacing scattered tools with one coherent interface.',
    mockupImg: '/assets/agri_dashboard_mockup.png',
    mockupType: 'dashboard',
    cardBackground: 'linear-gradient(135deg, #072a1e 0%, #031710 100%)',
    hasGridBg: true,
    tagClass: 'tag-pill-green',
    tags: [
      'UI/UX Design',
      'Web Design',
      'User Research',
      'Information Architecture'
    ],
    bottomTitleLine1: 'AgroVision:',
    bottomTitleLine2: 'Agriculture Dashboard'
  },
  {
    id: 'goodreads',
    category: 'UX / PRODUCT DESIGN CASE STUDY',
    badgeClass: 'badge-gold',
    titleType: 'serif-gold',
    titleLine1: 'Goodreads Redesign',
    titleLine2Italic: 'Analysis &',
    titleLine3: 'Research Planning',
    description: null,
    mockupImg: null,
    mockupType: 'none',
    cardBackground: "linear-gradient(rgba(20, 10, 5, 0.72), rgba(15, 8, 4, 0.82)), url('/assets/goodreads_bookshelf_clean.png')",
    tagClass: 'tag-pill-gold',
    tags: [
      'Website redesign',
      'User Testing',
      'User Research',
      'Information Architecture'
    ],
    bottomTitleLine1: 'Goodreads Redesign Analysis',
    bottomTitleLine2: '& Research Planning'
  }
]

function Work() {
  const navigate = useNavigate()
  const [projectIndex, setProjectIndex] = useState(0)

  const activeProject = caseStudies[projectIndex]

  const handleNextProject = () => {
    setProjectIndex((prev) => (prev + 1) % caseStudies.length)
  }

  const handlePrevProject = () => {
    setProjectIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }

  return (
    <div className="work-page-container">
      {/* Top Left Corner Interactive Turntable Audio Player */}
      <div className="work-top-left">
        <TurntablePlayer width="90px" />
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
        {/* Floating Left Chevron Navigation Button */}
        <button
          className="nav-chevron-btn prev-btn"
          onClick={handlePrevProject}
          aria-label="Previous Case Study"
        >
          <svg width="28" height="48" viewBox="0 0 28 48" fill="none">
            <path
              d="M24 4L4 24L24 44"
              stroke="#e6428c"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`work-case-study-card ${activeProject.id === 'saathi' ? 'is-clickable' : ''}`}
          style={{ background: activeProject.cardBackground }}
          onClick={() => {
            if (activeProject.id === 'saathi') {
              navigate('/work/saathi')
            }
          }}
          role={activeProject.id === 'saathi' ? 'button' : undefined}
          tabIndex={activeProject.id === 'saathi' ? 0 : undefined}
        >
          {/* Decorative Backgrounds */}
          {activeProject.hasGridBg && <div className="card-grid-bg"></div>}
          {activeProject.hasWaveBg && <div className="card-wave-bg"></div>}

          {/* Left Column Content */}
          <div className={`card-left-content ${activeProject.mockupType === 'none' ? 'full-width' : ''}`}>
            <div className={`case-study-badge ${activeProject.badgeClass}`}>
              {activeProject.category}
            </div>

            {activeProject.titleType === 'serif' && (
              <h1 className="case-study-title">
                {activeProject.titleLine1}
                <br />
                <span className="italic-accent">{activeProject.titleLine2Italic}</span>
                <br />
                {activeProject.titleLine3}
              </h1>
            )}

            {activeProject.titleType === 'serif-gold' && (
              <h1 className="case-study-title gold-serif">
                {activeProject.titleLine1}
                <br />
                <span className="italic-accent-gold">{activeProject.titleLine2Italic}</span>
                <br />
                {activeProject.titleLine3}
              </h1>
            )}

            {activeProject.titleType === 'tech' && (
              <h1 className="case-study-title-tech">
                {activeProject.titleLine1}
                <br />
                {activeProject.titleLine2}{' '}
                <span className="lime-green">{activeProject.titleLine3Accent}</span>
                <br />
                {activeProject.titleLine4}
              </h1>
            )}

            {activeProject.description && (
              <p className="case-study-desc">{activeProject.description}</p>
            )}

            {/* Read Case Study CTA Button for Saathi */}
            {activeProject.id === 'saathi' && (
              <div style={{ marginBottom: '20px' }}>
                <button
                  className="read-case-study-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/work/saathi')
                  }}
                >
                  Read Full Case Study →
                </button>
              </div>
            )}

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
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 0Z"
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
                <span key={tag} className={`tag-pill ${activeProject.tagClass}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column (3D Phone / Dashboard Mockup) */}
          {activeProject.mockupType !== 'none' && (
            <div className="card-right-content">
              {activeProject.mockupType === 'iphone' ? (
                <div className="iphone-mockup-wrapper">
                  <img
                    src={activeProject.mockupImg}
                    alt={activeProject.titleLine1}
                    className="iphone-mockup-img"
                  />
                </div>
              ) : (
                <img
                  src={activeProject.mockupImg}
                  alt={activeProject.titleLine1}
                  className="dashboard-mockup-img"
                />
              )}
            </div>
          )}
        </div>

        {/* Floating Right Chevron Navigation Button */}
        <button
          className="nav-chevron-btn next-btn"
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
