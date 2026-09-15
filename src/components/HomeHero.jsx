import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const [activePodId, setActivePodId] = useState(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const floatingPods = [
    {
      id: 'house',
      code: '01',
      label: 'HOME',
      subLabel: 'Main Entrance & Hero',
      path: '/',
      img: '/assets/pod_house_trans.png',
      className: 'pod-house',
      x: 46,
      y: 3
    },
    {
      id: 'laptop',
      code: '02',
      label: 'SELECTED WORK',
      subLabel: 'View Portfolio Projects',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      className: 'pod-laptop',
      x: 76,
      y: 15
    },
    {
      id: 'camera',
      code: '03',
      label: 'VISUALS & MEDIA',
      subLabel: 'Graphics & Photography',
      path: '/work#visuals',
      img: '/assets/pod_camera_trans.png',
      className: 'pod-camera',
      x: 16,
      y: 12
    },
    {
      id: 'resume',
      code: '04',
      label: 'ABOUT SHAIVI',
      subLabel: 'Bio & Experience',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      className: 'pod-resume',
      x: 85,
      y: 42
    },
    {
      id: 'console',
      code: '05',
      label: 'GET IN TOUCH',
      subLabel: 'Contact & Socials',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      className: 'pod-console',
      x: 74,
      y: 70
    },
    {
      id: 'book',
      code: '06',
      label: 'RESEARCH & BOOKS',
      subLabel: 'UX & Interaction Notes',
      path: '/about#research',
      img: '/assets/pod_book_trans.png',
      className: 'pod-book',
      x: 44,
      y: 78
    },
    {
      id: 'shapes',
      code: '07',
      label: 'DESIGN SYSTEMS',
      subLabel: 'UI Components & Motion',
      path: '/work#systems',
      img: '/assets/pod_shapes_trans.png',
      className: 'pod-shapes',
      x: 14,
      y: 65
    }
  ]

  // Compute magnetic tilt effect when cursor moves inside hovered pod
  const handleMouseMove = (e, podId) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2
    
    // Magnetic pull sensitivity
    const tiltX = (mouseY / (rect.height / 2)) * -18
    const tiltY = (mouseX / (rect.width / 2)) * 18
    
    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseEnter = (podId) => {
    setActivePodId(podId)
  }

  const handleMouseLeave = () => {
    setActivePodId(null)
    setTilt({ x: 0, y: 0 })
  }

  // Calculate antigravity repulsion offset for adjacent non-hovered pods
  const getRepulsionStyle = (pod) => {
    if (!activePodId) return {}
    
    const activePod = floatingPods.find((p) => p.id === activePodId)
    if (!activePod || activePod.id === pod.id) return {}

    // Vector from active pod to this pod
    const dx = pod.x - activePod.x
    const dy = pod.y - activePod.y
    const distance = Math.sqrt(dx * dx + dy * dy) || 1

    // Antigravity push strength (strongest for close pods)
    const pushFactor = Math.max(0, 45 - distance) / 45
    const pushDistance = pushFactor * 32 // 32px max repulsion shift

    const pushX = (dx / distance) * pushDistance
    const pushY = (dy / distance) * pushDistance

    return {
      transform: `translate(${pushX}px, ${pushY}px) scale(${1 - pushFactor * 0.08})`,
      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }

  return (
    <main className="antigravity-hero-container">
      {/* Zero Gravity Ambient Glows */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-bottom-right"></div>

      <div className="antigravity-hero-content">
        {/* Left Column: Bio Text Inside Large Glass Panel */}
        <div className="left-glass-panel-wrapper">
          <div className="floating-turntable" title="Shaivi's Music & Design Studio">
            <img
              src="/assets/turntable_transparent.png"
              alt="Floating Record Player"
              className="turntable-img"
            />
          </div>

          <div className="bio-glass-panel">
            <div className="glass-panel-highlight"></div>

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

        {/* Right Column: Zero Gravity Cloud around 3D Bronze Head */}
        <div className="right-zerog-cloud-container">
          <div className="zerog-cloud-wrapper">
            {/* Central 3D Bronze Female Head */}
            <div className="central-head-wrapper">
              <img
                src="/assets/head_3d_trans.png"
                alt="Shaivi 3D Bronze Character"
                className="central-head-img"
              />
              <div className="head-aura"></div>
            </div>

            {/* 7 Floating Pink Glass Pod Capsules */}
            {floatingPods.map((pod) => {
              const isActive = activePodId === pod.id
              const repulsionStyle = getRepulsionStyle(pod)

              return (
                <div
                  key={pod.id}
                  className={`glass-pod-item ${pod.className} ${isActive ? 'is-active-hover' : ''}`}
                  style={{
                    top: `${pod.y}%`,
                    left: `${pod.x}%`,
                    ...repulsionStyle
                  }}
                  onMouseEnter={() => handleMouseEnter(pod.id)}
                  onMouseMove={(e) => handleMouseMove(e, pod.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => navigate(pod.path)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Navigate to ${pod.label}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(pod.path)
                    }
                  }}
                >
                  {/* Glass Capsule Pod Container with 3D Magnetic Tilt */}
                  <div
                    className="pod-glass-capsule"
                    style={
                      isActive
                        ? { transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.28)` }
                        : {}
                    }
                  >
                    <img src={pod.img} alt={pod.label} className="pod-icon-img" />
                    <div className="pod-specular-reflection"></div>
                    <div className="pod-chromatic-flare"></div>
                  </div>

                  {/* Persona 5 Strikers Kinetic Glass Capsule Label Reveal */}
                  {isActive && (
                    <div className="persona-glass-pill-label">
                      <div className="persona-pill-highlight"></div>
                      
                      <div className="persona-title-row">
                        <span className="persona-code">{pod.code}</span>
                        <div className="persona-title-text">
                          {pod.label.split('').map((char, index) => (
                            <span
                              key={index}
                              className="persona-char"
                              style={{ animationDelay: `${index * 0.022}s` }}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="persona-sublabel-row">{pod.subLabel}</div>
                    </div>
                  )}
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
