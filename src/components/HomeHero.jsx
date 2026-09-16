import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import TurntablePlayer from './TurntablePlayer'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const { playSfx } = useAudio()
  const [isHovered, setIsHovered] = useState(false)
  const [activePod, setActivePod] = useState(null)

  const pods = [
    {
      id: 'house',
      title: 'HOME',
      path: '/',
      img: '/assets/pod_house_trans.png',
      className: 'pod-house'
    },
    {
      id: 'laptop',
      title: 'WORK',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      className: 'pod-laptop'
    },
    {
      id: 'resume',
      title: 'RESUME',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      className: 'pod-resume'
    },
    {
      id: 'console',
      title: 'HOBBIES',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      className: 'pod-console'
    }
  ]

  const handleMouseEnterHead = () => {
    setIsHovered(true)
    playSfx('hover')
  }

  const handleMouseLeaveHead = () => {
    setIsHovered(false)
  }

  const handlePodMouseEnter = (podId) => {
    setActivePod(podId)
    playSfx('hover')
  }

  const handlePodMouseLeave = () => {
    setActivePod(null)
  }

  const handlePodClick = (path) => {
    playSfx('click')
    navigate(path)
  }

  return (
    <main className="home-hero-page">
      {/* Top Left Floating Turntable Player */}
      <div className="hero-turntable-container" title="Shaivi's Music Studio">
        <TurntablePlayer width="110px" className="hero-turntable-player" />
      </div>

      {/* Main Glassmorphic Hero Card */}
      <div 
        className={`hero-glass-card ${isHovered ? 'is-card-hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Text Bio Group */}
        <div className="card-bio-content">
          <div className="pixel-hi-wrapper">
            <img src="/assets/hi_font_white.svg" alt="hi!" className="pixel-hi-img" />
          </div>

          <div className="headline-text-group">
            <h1 className="headline-line">I am Shaivi,</h1>
            <h1 className="headline-line">I am a UI/UX designer.</h1>
          </div>

          <p className="bio-subtext">
            I love to research, get to the bottom of the problems and make stuff that actually works.
          </p>
        </div>

        {/* Right Avatar & Hover Menu Pods Section */}
        <div className="card-avatar-section">
          {/* Translucent Donut Ring Backdrop */}
          <div className={`avatar-ring-backdrop ${isHovered ? 'is-visible' : ''}`}>
            <img
              src="/assets/purple_ring_translucent.png"
              alt="Translucent Ring"
              className="avatar-ring-img"
            />
          </div>

          {/* Central 3D Avatar Head */}
          <div
            className="avatar-head-wrapper"
            onMouseEnter={handleMouseEnterHead}
            onClick={() => handlePodClick('/about')}
            role="button"
            tabIndex={0}
            aria-label="About Shaivi"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handlePodClick('/about')
              }
            }}
          >
            <img
              src="/assets/head_3d_clean.png"
              alt="Shaivi 3D Avatar"
              className="avatar-head-img"
            />
          </div>

          {/* 4 Interactive Hover Menu Pods */}
          <div className={`hover-pods-container ${isHovered ? 'is-visible' : ''}`}>
            {pods.map((pod) => {
              const isPodActive = activePod === pod.id

              return (
                <div
                  key={pod.id}
                  className={`menu-pod-item ${pod.className} ${isPodActive ? 'is-pod-active' : ''}`}
                  onMouseEnter={() => handlePodMouseEnter(pod.id)}
                  onMouseLeave={handlePodMouseLeave}
                  onClick={() => handlePodClick(pod.path)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Navigate to ${pod.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePodClick(pod.path)
                    }
                  }}
                >
                  <div className="pod-bubble">
                    <img src={pod.img} alt={pod.title} className="pod-icon-img" />
                    <div className="pod-shine-ring"></div>
                  </div>
                  <span className="pod-tooltip-label">{pod.title}</span>
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

