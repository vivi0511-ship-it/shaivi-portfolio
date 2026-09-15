import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const [activeTooltip, setActiveTooltip] = useState('')

  const floatingPods = [
    {
      id: 'house',
      label: 'Home',
      path: '/',
      img: '/assets/pod_house_trans.png',
      className: 'pod-house',
      style: { top: '3%', left: '46%' }
    },
    {
      id: 'laptop',
      label: 'Selected Work',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      className: 'pod-laptop',
      style: { top: '15%', left: '76%' }
    },
    {
      id: 'camera',
      label: 'Visuals & Media',
      path: '/work#visuals',
      img: '/assets/pod_camera_trans.png',
      className: 'pod-camera',
      style: { top: '12%', left: '16%' }
    },
    {
      id: 'resume',
      label: 'About Shaivi',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      className: 'pod-resume',
      style: { top: '42%', left: '85%' }
    },
    {
      id: 'console',
      label: 'Get in Touch',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      className: 'pod-console',
      style: { top: '70%', left: '74%' }
    },
    {
      id: 'book',
      label: 'Research & Books',
      path: '/about#research',
      img: '/assets/pod_book_trans.png',
      className: 'pod-book',
      style: { top: '78%', left: '44%' }
    },
    {
      id: 'shapes',
      label: 'Design Systems',
      path: '/work#systems',
      img: '/assets/pod_shapes_trans.png',
      className: 'pod-shapes',
      style: { top: '65%', left: '14%' }
    }
  ]

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
            {floatingPods.map((pod) => (
              <div
                key={pod.id}
                className={`glass-pod-item ${pod.className}`}
                style={pod.style}
                onMouseEnter={() => setActiveTooltip(pod.label)}
                onMouseLeave={() => setActiveTooltip('')}
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
                <div className="pod-glass-capsule">
                  <img src={pod.img} alt={pod.label} className="pod-icon-img" />
                  <div className="pod-specular-reflection"></div>
                </div>

                {activeTooltip === pod.label && (
                  <div className="pod-tooltip-badge">{pod.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomeHero
