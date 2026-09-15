import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const [activeTooltip, setActiveTooltip] = useState('')

  const navNodes = [
    {
      id: 'home',
      label: 'Home',
      path: '/',
      style: { top: '3.5%', left: '27.5%', width: '22%', height: '18.5%' }
    },
    {
      id: 'work',
      label: 'Selected Work',
      path: '/work',
      style: { top: '36%', left: '7.5%', width: '22%', height: '18.5%' }
    },
    {
      id: 'about',
      label: 'About Shaivi',
      path: '/about',
      style: { top: '69%', left: '24%', width: '22%', height: '18.5%' }
    },
    {
      id: 'contact',
      label: 'Get in Touch',
      path: '/contact',
      style: { top: '78%', left: '68%', width: '22%', height: '18.5%' }
    }
  ]

  return (
    <main className="home-hero-container">
      {/* Top Left Floating Turntable */}
      <div className="turntable-wrapper" title="Shaivi's Music & Design Studio">
        <img
          src="/assets/turntable_transparent.png"
          alt="Record Player Turntable"
          className="turntable-img"
        />
      </div>

      {/* Main Content Layout */}
      <div className="hero-content">
        {/* Left Column: Typography */}
        <div className="text-column">
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

        {/* Right Column: Rotary Dial Wheel */}
        <div className="dial-column">
          <div className="dial-wrapper">
            <img
              src="/assets/dial_pink_glass.png"
              alt="Interactive Pink Glass Navigation Dial & Shaivi 3D Avatar"
              className="dial-img"
            />

            {/* Interactive Node Hotspots */}
            {navNodes.map((node) => (
              <div
                key={node.id}
                className={`dial-hotspot node-${node.id}`}
                style={node.style}
                onMouseEnter={() => setActiveTooltip(node.label)}
                onMouseLeave={() => setActiveTooltip('')}
                onClick={() => navigate(node.path)}
                role="button"
                tabIndex={0}
                aria-label={`Navigate to ${node.label}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(node.path)
                  }
                }}
              >
                <div className="hotspot-ring"></div>
                {activeTooltip === node.label && (
                  <div className="node-tooltip">{node.label}</div>
                )}
              </div>
            ))}

            {/* Avatar Center Hotspot */}
            <Link
              to="/about"
              className="avatar-hotspot"
              style={{ top: '16%', left: '41%', width: '56%', height: '58%' }}
              onMouseEnter={() => setActiveTooltip('About Me')}
              onMouseLeave={() => setActiveTooltip('')}
              aria-label="Shaivi Avatar - About Me"
            >
              {activeTooltip === 'About Me' && (
                <div className="avatar-tooltip">About Shaivi</div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomeHero
