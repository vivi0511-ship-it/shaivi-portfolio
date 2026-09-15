import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeHero.css'

function HomeHero() {
  const navigate = useNavigate()
  const [activeNode, setActiveNode] = useState(null)
  const [spinRotation, setSpinRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [hubText, setHubText] = useState('YOU MANIFESTED THIS. READY TO PICK UP?')
  const dialRef = useRef(null)

  const menuNodes = [
    {
      id: 'house',
      code: '01',
      label: 'HOME',
      subLabel: 'Main Entrance & Hero',
      path: '/',
      img: '/assets/pod_house_trans.png',
      angle: 58,
      x: 68.55,
      y: 79.68,
      spinToAngle: 232 // degrees clockwise to reach finger stop (~290°)
    },
    {
      id: 'laptop',
      code: '02',
      label: 'SELECTED WORK',
      subLabel: 'View Portfolio Projects',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      angle: 20,
      x: 82.89,
      y: 61.97,
      spinToAngle: 270
    },
    {
      id: 'resume',
      code: '03',
      label: 'ABOUT SHAIVI',
      subLabel: 'Bio & Background',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      angle: -18,
      x: 83.29,
      y: 39.18,
      spinToAngle: 308
    },
    {
      id: 'console',
      code: '04',
      label: 'GET IN TOUCH',
      subLabel: 'Contact & Socials',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      angle: -55,
      x: 70.08,
      y: 21.33,
      spinToAngle: 345
    },
    {
      id: 'camera',
      code: '05',
      label: 'VISUALS & MEDIA',
      subLabel: 'Graphics & Photography',
      path: '/work#visuals',
      img: '/assets/pod_camera_trans.png',
      angle: -92,
      x: 48.78,
      y: 15.02,
      spinToAngle: 22
    },
    {
      id: 'book',
      code: '06',
      label: 'RESEARCH & BOOKS',
      subLabel: 'UX & Interaction Notes',
      path: '/about#research',
      img: '/assets/pod_book_trans.png',
      angle: -129,
      x: 27.97,
      y: 22.80,
      spinToAngle: 59
    },
    {
      id: 'shapes',
      code: '07',
      label: 'DESIGN SYSTEMS',
      subLabel: 'UI Architecture & Motion',
      path: '/work#systems',
      img: '/assets/pod_shapes_trans.png',
      angle: -166,
      x: 16.04,
      y: 41.53,
      spinToAngle: 96
    },
    {
      id: 'turntable',
      code: '08',
      label: 'STUDIO & MUSIC',
      subLabel: 'Audio & Creative Space',
      path: '/about#music',
      img: '/assets/turntable_transparent.png',
      angle: -203,
      x: 17.78,
      y: 63.68,
      spinToAngle: 133
    }
  ]

  // Synthetic Mechanical Rotary Sound Effect
  const playRotarySound = (isStop = false) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      
      if (isStop) {
        // Metallic clack sound at finger stop
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(240, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12)
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.13)
      } else {
        // Soft mechanical tick
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(150, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.06)
      }
    } catch (e) {
      // Audio fallback
    }
  }

  const handleNodeMouseEnter = (node) => {
    if (isSpinning) return
    setActiveNode(node)
    setHubText(`DIALING [${node.code}] ${node.label}`)
    playRotarySound(false)
  }

  const handleNodeMouseLeave = () => {
    if (isSpinning) return
    setActiveNode(null)
    setHubText('YOU MANIFESTED THIS. READY TO PICK UP?')
  }

  // Rotary Dial Spin Physics & Navigation Trigger
  const handleNodeClick = (node) => {
    if (isSpinning) return
    setIsSpinning(true)
    setActiveNode(node)
    setHubText(`CONNECTING TO ${node.label}...`)
    
    // Phase 1: Clockwise spin to finger stop
    const targetDeg = node.spinToAngle || 180
    setSpinRotation(targetDeg)
    playRotarySound(false)

    // Phase 2: Metallic stop sound at peak spin
    setTimeout(() => {
      playRotarySound(true)
    }, 450)

    // Phase 3: Elastic spring return back to 0°
    setTimeout(() => {
      setSpinRotation(0)
    }, 700)

    // Phase 4: Navigate to target route
    setTimeout(() => {
      setIsSpinning(false)
      setActiveNode(null)
      setHubText('YOU MANIFESTED THIS. READY TO PICK UP?')
      navigate(node.path)
    }, 1250)
  }

  return (
    <main className="vintage-rotary-hero-container">
      {/* Zero Gravity Soft Ambient Glows */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-bottom-right"></div>

      <div className="rotary-hero-content">
        {/* Left Column: Bio Text Glass Card */}
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

        {/* Right Column: Vintage Pink Glass Rotary Dial Phone Wheel */}
        <div className="right-rotary-column">
          <div className="rotary-phone-wrapper" ref={dialRef}>
            {/* Outer Rotatable Dial Disc Assembly */}
            <div
              className={`rotary-dial-disc ${isSpinning ? 'is-spinning' : ''}`}
              style={{
                transform: `rotate(${spinRotation}deg)`
              }}
            >
              <img
                src="/assets/rotary_dial_pink_glass.png"
                alt="Vintage Pink Glass Rotary Phone Dial"
                className="rotary-dial-img"
              />

              {/* 8 Porthole Menu Nodes around Rotary Disc Perimeter */}
              {menuNodes.map((node) => {
                const isActive = activeNode?.id === node.id

                return (
                  <div
                    key={node.id}
                    className={`rotary-porthole-node ${isActive ? 'is-active-node' : ''}`}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      /* Counter-rotate icon contents so they remain upright as dial spins */
                      transform: `translate(-50%, -50%) rotate(${-spinRotation}deg) scale(${
                        isActive ? 1.25 : 1
                      })`
                    }}
                    onMouseEnter={() => handleNodeMouseEnter(node)}
                    onMouseLeave={handleNodeMouseLeave}
                    onClick={() => handleNodeClick(node)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Dial ${node.label}`}
                  >
                    {/* Glass Porthole Bubble Shell */}
                    <div className="porthole-glass-shell">
                      <img src={node.img} alt={node.label} className="porthole-icon-img" />
                      <div className="porthole-glass-flare"></div>
                    </div>

                    {/* Sleek Glass Capsule Badge Reveal */}
                    {isActive && (
                      <div className="rotary-glass-pill-badge">
                        <div className="pill-badge-highlight"></div>
                        <div className="pill-title-row">
                          <span className="pill-code">{node.code}</span>
                          <span className="pill-title">{node.label}</span>
                        </div>
                        <span className="pill-sub">{node.subLabel}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Central Cream Glass Hub (Stationary) */}
            <div className="central-rotary-hub">
              <div className="hub-glass-bevel"></div>
              <div className="hub-content">
                <p className="hub-manifesto-text">{hubText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HomeHero
