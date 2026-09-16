import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import TurntablePlayer from './TurntablePlayer'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const { playSfx } = useAudio()
  const [isHovered, setIsHovered] = useState(false)
  const [activePod, setActivePod] = useState(null)

  // lerp 0.08 micro-head tracking cursor state
  const [headRot, setHeadRot] = useState({ rx: 0, ry: 0 })
  const targetRot = useRef({ rx: 0, ry: 0 })
  const currentRot = useRef({ rx: 0, ry: 0 })
  const animFrameId = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const nx = (clientX / innerWidth - 0.5) * 2
      const ny = (clientY / innerHeight - 0.5) * 2
      targetRot.current = {
        rx: -ny * 12,
        ry: nx * 18
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const updateLerp = () => {
      currentRot.current.rx += (targetRot.current.rx - currentRot.current.rx) * 0.08
      currentRot.current.ry += (targetRot.current.ry - currentRot.current.ry) * 0.08
      setHeadRot({
        rx: currentRot.current.rx,
        ry: currentRot.current.ry
      })
      animFrameId.current = requestAnimationFrame(updateLerp)
    }
    animFrameId.current = requestAnimationFrame(updateLerp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [])

  const pods = [
    {
      id: 'house',
      title: 'HOME',
      path: '/',
      img: '/assets/pod_house_trans.png',
      className: 'pod-house',
      clipPath: 'polygon(0% 0%, 82% 0%, 78% 24%, 0% 46%)',
      textStyle: { top: '10%', left: '8%', transform: 'rotate(-5deg)' }
    },
    {
      id: 'laptop',
      title: 'WORK',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      className: 'pod-laptop',
      clipPath: 'polygon(0% 16%, 66% 28%, 60% 64%, 0% 78%)',
      textStyle: { top: '38%', left: '8%', transform: 'rotate(-4deg)' }
    },
    {
      id: 'resume',
      title: 'RESUME',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      className: 'pod-resume',
      clipPath: 'polygon(0% 25%, 62% 52%, 58% 84%, 0% 95%)',
      textStyle: { top: '52%', left: '8%', transform: 'rotate(-3deg)' }
    },
    {
      id: 'console',
      title: 'HOBBIES',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      className: 'pod-console',
      clipPath: 'polygon(0% 38%, 76% 68%, 72% 100%, 0% 100%)',
      textStyle: { top: '64%', left: '8%', transform: 'rotate(-4deg)' }
    },
    {
      id: 'avatar',
      title: 'ABOUT ME',
      path: '/about',
      clipPath: 'polygon(0% 12%, 74% 24%, 68% 76%, 0% 98%)',
      textStyle: { top: '44%', left: '8%', transform: 'rotate(-4deg)' }
    }
  ]

  const handlePodMouseEnter = (podId) => {
    setActivePod(podId)
    setIsHovered(true)
    playSfx('hover')
    playSfx('banner')
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

      {/* Main Interaction Zone */}
      <div 
        className={`hero-interaction-zone ${isHovered ? 'is-zone-hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setActivePod(null)
        }}
      >
        {/* Base Glassmorphic Bio Card (z-index: 1) */}
        <div className="hero-glass-card">
          <div className={`card-bio-content ${activePod ? 'is-dimmed' : ''}`}>
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
        </div>

        {/* Background Dimming Overlay (z-index: 5) */}
        <div className={`bg-dimming-overlay ${activePod ? 'is-active' : ''}`}></div>

        {/* 3D Avatar Head (z-index: 10 when inactive, z-index: 30 when active) */}
        <div
          className={`avatar-head-wrapper ${activePod ? 'is-dimmed' : ''} ${
            activePod === 'avatar' ? 'is-avatar-active' : ''
          }`}
          style={{
            transform: `perspective(600px) rotateX(${headRot.rx}deg) rotateY(${headRot.ry}deg)`
          }}
          onMouseEnter={() => handlePodMouseEnter('avatar')}
          onMouseLeave={handlePodMouseLeave}
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

        {/* Angled Pink Projector Banners Layer (z-index: 20) */}
        {pods.map((bannerItem) => {
          const isActiveBanner = activePod === bannerItem.id

          return (
            <div
              key={`home-banner-${bannerItem.id}`}
              className={`home-projector-banner ${isActiveBanner ? 'is-active' : ''}`}
              style={{ clipPath: bannerItem.clipPath }}
            >
              <div className="projector-banner-shine"></div>
              <div
                className={`banner-kinetic-wrapper ${isActiveBanner ? 'is-entered' : ''}`}
                style={bannerItem.textStyle}
              >
                <h1 className="banner-kinetic-title">{bannerItem.title}</h1>
              </div>
            </div>
          )
        })}

        {/* Arc Circular Menu Pods (z-index: 10 for inactive, z-index: 30 for active) */}
        <div className={`hover-pods-container ${isHovered ? 'is-visible' : ''}`}>
          {pods
            .filter((p) => p.id !== 'avatar')
            .map((pod) => {
              const isPodActive = activePod === pod.id
              const isOtherPodActive = activePod && activePod !== pod.id

              return (
                <div
                  key={pod.id}
                  className={`menu-pod-item ${pod.className} ${
                    isPodActive ? 'is-pod-active' : ''
                  } ${isOtherPodActive ? 'is-pod-dimmed' : ''}`}
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
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )
}

export default HomeHero
