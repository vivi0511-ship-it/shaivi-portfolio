import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const [activeHoverNode, setActiveHoverNode] = useState(null)

  const radialNodes = [
    {
      id: 'house',
      title: 'HOME',
      path: '/',
      img: '/assets/pod_house_trans.png',
      style: { top: '13.8%', left: '34.5%', transform: 'translate(-50%, -50%)' },
      bannerClip: 'polygon(0% 0%, 64% 0%, 71% 33%, 0% 46%)',
      textPos: { top: '10%', left: '8%', transform: 'rotate(-3deg)' }
    },
    {
      id: 'laptop',
      title: 'WORK',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      style: { top: '41.7%', left: '21.3%', transform: 'translate(-50%, -50%)' },
      bannerClip: 'polygon(0% 20%, 57% 38%, 62% 62%, 0% 82%)',
      textPos: { top: '38%', left: '7%', transform: 'rotate(-4deg)' }
    },
    {
      id: 'resume',
      title: 'RESUME',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      style: { top: '77.9%', left: '33.8%', transform: 'translate(-50%, -50%)' },
      bannerClip: 'polygon(0% 36%, 68% 66%, 52% 100%, 0% 100%)',
      textPos: { top: '54%', left: '9%', transform: 'rotate(-3deg)' }
    },
    {
      id: 'console',
      title: 'HOBBIES',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      style: { top: '85.3%', left: '66.5%', transform: 'translate(-50%, -50%)' },
      bannerClip: 'polygon(0% 36%, 86% 68%, 76% 100%, 0% 100%)',
      textPos: { top: '52%', left: '9%', transform: 'rotate(-4deg)' }
    },
    {
      id: 'avatar',
      title: 'ABOUT ME',
      path: '/about',
      bannerClip: 'polygon(0% 15%, 82% 35%, 75% 72%, 0% 95%)',
      textPos: { top: '35%', left: '10%', transform: 'rotate(-3deg)' }
    }
  ]

  const handleMouseEnter = (nodeId) => {
    setActiveHoverNode(nodeId)
  }

  const handleMouseLeave = () => {
    setActiveHoverNode(null)
  }

  const handleNodeClick = (path) => {
    navigate(path)
  }

  return (
    <main className="persona5-hero-container">
      {/* Zero Gravity Ambient Glows */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-bottom-right"></div>

      {/* Dusky Screen Focus Overlay on Hover */}
      <div className={`dusky-focus-overlay ${activeHoverNode ? 'is-overlay-active' : ''}`}></div>

      {/* Persona 5 Projection Banner Layers */}
      {radialNodes.map((node) => {
        const isActive = activeHoverNode === node.id

        return (
          <div
            key={`banner-${node.id}`}
            className={`p5-projection-banner ${isActive ? 'is-banner-active' : ''}`}
            style={{
              clipPath: node.bannerClip
            }}
          >
            <div className="banner-shine-overlay"></div>

            {/* Snappy Persona 5 Kinetic Title */}
            <div
              className={`p5-banner-text-wrapper ${isActive ? 'is-text-entered' : ''}`}
              style={node.textPos}
            >
              <h1 className="p5-banner-title">{node.title}</h1>
            </div>
          </div>
        )
      })}

      {/* Main Layout Grid */}
      <div className={`p5-hero-content ${activeHoverNode ? 'is-screen-focused' : ''}`}>
        {/* Left Column: Default Bio Text Layout */}
        <div className="left-bio-column">
          <div className="floating-turntable" title="Shaivi's Music & Design Studio">
            <img
              src="/assets/turntable_transparent.png"
              alt="Floating Record Player"
              className="turntable-img"
            />
          </div>

          <div className="bio-text-group">
            <h1 className="pixel-hi" aria-label="hi!">
              <img src="/assets/hi_font_white.svg" alt="hi!" className="pixel-hi-img" />
            </h1>

            <div className="headline-group">
              <h2 className="main-headline">I am Shaivi,</h2>
              <h2 className="main-headline">I am a UI/UX designer.</h2>
            </div>

            <p className="bio-paragraph">
              I love to research, get to the bottom of the problems and make stuff that actually works.
            </p>
          </div>
        </div>

        {/* Right Column: Radial Menu Nodes around 3D Bronze Head */}
        <div className="right-radial-column">
          <div className="radial-wrapper">
            {/* 3D Purple Donut Ring Background */}
            <div className="radial-ring-wrapper">
              <img
                src="/assets/purple_ring_3d.png"
                alt="3D Purple Ring"
                className="radial-ring-img"
              />
            </div>

            {/* Central 3D Bronze Female Head (Interactive ABOUT ME Trigger) */}
            <div
              className={`central-head-wrapper ${
                activeHoverNode === 'avatar' ? 'is-avatar-hovered' : ''
              }`}
              onMouseEnter={() => handleMouseEnter('avatar')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleNodeClick('/about')}
              role="button"
              tabIndex={0}
              aria-label="Navigate to ABOUT ME"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNodeClick('/about')
                }
              }}
            >
              <img
                src="/assets/head_3d_clean.png"
                alt="Shaivi 3D Bronze Character"
                className="central-head-img"
              />
            </div>

            {/* 4 Radial Menu Nodes */}
            {radialNodes
              .filter((node) => node.id !== 'avatar')
              .map((node) => {
                const isHovered = activeHoverNode === node.id
                const isDimmed = activeHoverNode !== null && !isHovered

                return (
                  <div
                    key={node.id}
                    className={`radial-node-item ${isHovered ? 'is-node-hovered' : ''} ${
                      isDimmed ? 'is-node-dimmed' : ''
                    }`}
                    style={node.style}
                    onMouseEnter={() => handleMouseEnter(node.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleNodeClick(node.path)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${node.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleNodeClick(node.path)
                      }
                    }}
                  >
                    <div className="radial-node-bubble">
                      <img src={node.img} alt={node.title} className="node-icon-img" />
                      <div className="node-glass-ring"></div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomeHero
