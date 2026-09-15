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
      subTitle: 'ABOUT ME',
      path: '/',
      img: '/assets/pod_house_trans.png',
      style: { top: '8%', left: '68%' },
      // Clip path trapezoid expanding from top-right origin to full left side
      bannerClip: 'polygon(0% 0%, 100% 0%, 100% 65%, 0% 90%)',
      bannerGradient: 'linear-gradient(135deg, #f7a2c2 0%, #f38cb3 100%)',
      textPos: { top: '22%', left: '12%' }
    },
    {
      id: 'laptop',
      title: 'WORK',
      subTitle: 'PORTFOLIO',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      style: { top: '34%', left: '55%' },
      bannerClip: 'polygon(0% 12%, 100% 32%, 100% 82%, 0% 100%)',
      bannerGradient: 'linear-gradient(135deg, #f8a6c5 0%, #f48fb6 100%)',
      textPos: { top: '48%', left: '14%' }
    },
    {
      id: 'resume',
      title: 'RESUME',
      subTitle: 'EXPERIENCE',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      style: { top: '64%', left: '62%' },
      bannerClip: 'polygon(0% 25%, 100% 55%, 100% 98%, 0% 92%)',
      bannerGradient: 'linear-gradient(135deg, #f69ebd 0%, #f286ad 100%)',
      textPos: { top: '56%', left: '12%' }
    },
    {
      id: 'console',
      title: 'HOBBIES',
      subTitle: 'CONTACT & PLAY',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      style: { top: '76%', left: '79%' },
      bannerClip: 'polygon(0% 40%, 100% 72%, 100% 100%, 0% 100%)',
      bannerGradient: 'linear-gradient(135deg, #f7a0c0 0%, #f388b0 100%)',
      textPos: { top: '68%', left: '15%' }
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
      {/* Background Soft Ambient Light */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-bottom-right"></div>

      {/* Persona 5 Projection Banner Layers */}
      {radialNodes.map((node) => {
        const isActive = activeHoverNode === node.id

        return (
          <div
            key={`banner-${node.id}`}
            className={`p5-projection-banner ${isActive ? 'is-banner-active' : ''}`}
            style={{
              clipPath: node.bannerClip,
              background: node.bannerGradient
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
              <img src="/assets/hi_font.svg" alt="hi!" className="pixel-hi-img" />
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
            {/* Background Arc Accent Circle */}
            <div className="radial-arc-bg"></div>

            {/* Central 3D Bronze Female Head */}
            <div className="central-head-wrapper">
              <img
                src="/assets/head_3d_trans.png"
                alt="Shaivi 3D Bronze Character"
                className="central-head-img"
              />
            </div>

            {/* 4 Radial Menu Nodes */}
            {radialNodes.map((node) => {
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
