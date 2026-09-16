import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import './P5CornerRadialMenu.css'

function P5CornerRadialMenu() {
  const navigate = useNavigate()
  const { playSfx } = useAudio()
  const [isContainerHovered, setIsContainerHovered] = useState(false)
  const [activeHoverNode, setActiveHoverNode] = useState(null)

  const radialNodes = [
    {
      id: 'house',
      title: 'HOME',
      path: '/',
      img: '/assets/pod_house_trans.png',
      style: { top: '15px', right: '185px' },
      bannerClip: 'polygon(38% 0%, 90% 8%, 86% 40%, 40% 68%)',
      textPos: { top: '22%', left: '50%', transform: 'rotate(-12deg)' }
    },
    {
      id: 'laptop',
      title: 'WORK',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      style: { top: '105px', right: '220px' },
      bannerClip: 'polygon(40% 12%, 88% 30%, 84% 62%, 44% 82%)',
      textPos: { top: '34%', left: '50%', transform: 'rotate(-12deg)' }
    },
    {
      id: 'resume',
      title: 'RESUME',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      style: { top: '195px', right: '175px' },
      bannerClip: 'polygon(42% 25%, 86% 45%, 82% 76%, 45% 95%)',
      textPos: { top: '42%', left: '50%', transform: 'rotate(-12deg)' }
    },
    {
      id: 'console',
      title: 'HOBBIES',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      style: { top: '225px', right: '70px' },
      bannerClip: 'polygon(42% 35%, 92% 55%, 88% 85%, 45% 100%)',
      textPos: { top: '48%', left: '50%', transform: 'rotate(-12deg)' }
    },
    {
      id: 'avatar',
      title: 'ABOUT ME',
      path: '/about',
      bannerClip: 'polygon(38% 10%, 92% 18%, 88% 50%, 42% 78%)',
      textPos: { top: '32%', left: '48%', transform: 'rotate(-12deg)' }
    }
  ]

  const handleContainerMouseEnter = () => {
    setIsContainerHovered(true)
    playSfx('hover')
  }

  const handleContainerMouseLeave = () => {
    setIsContainerHovered(false)
    setActiveHoverNode(null)
  }

  const handleNodeMouseEnter = (nodeId) => {
    setActiveHoverNode(nodeId)
    playSfx('hover')
    playSfx('banner')
  }

  const handleNodeMouseLeave = () => {
    setActiveHoverNode(null)
  }

  const handleNodeClick = (path) => {
    playSfx('click')
    navigate(path)
  }

  return (
    <>
      {/* Persona 5 Projection Banner Layers shooting across screen on hover */}
      {radialNodes.map((node) => {
        const isActive = isContainerHovered && activeHoverNode === node.id

        return (
          <div
            key={`banner-${node.id}`}
            className={`p5-corner-banner ${isActive ? 'is-banner-active' : ''}`}
            style={{ clipPath: node.bannerClip }}
          >
            <div className="corner-banner-shine"></div>

            {/* Snappy Persona 5 Kinetic Title */}
            <div
              className={`p5-corner-banner-text ${isActive ? 'is-text-entered' : ''}`}
              style={node.textPos}
            >
              <h1 className="corner-banner-title">{node.title}</h1>
            </div>
          </div>
        )
      })}

      {/* Top Right Radial Menu Container */}
      <div
        className={`p5-corner-menu-container ${isContainerHovered ? 'is-expanded' : ''}`}
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
      >
        {/* Translucent Donut Ring Background (Visible on Hover) */}
        <div className="corner-ring-wrapper">
          <img
            src="/assets/purple_ring_translucent.png"
            alt="Translucent Ring"
            className="corner-ring-img"
          />
        </div>

        {/* Central 3D Bronze Female Head (Default Avatar Trigger & ABOUT ME) */}
        <div
          className={`corner-head-wrapper ${activeHoverNode === 'avatar' ? 'is-hovered' : ''}`}
          onMouseEnter={() => handleNodeMouseEnter('avatar')}
          onMouseLeave={handleNodeMouseLeave}
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
            className="corner-head-img"
          />
        </div>

        {/* 4 Radial Menu Nodes (Visible on Hover) */}
        {radialNodes
          .filter((node) => node.id !== 'avatar')
          .map((node) => {
            const isHovered = activeHoverNode === node.id

            return (
              <div
                key={node.id}
                className={`corner-node-item ${isHovered ? 'is-hovered' : ''}`}
                style={node.style}
                onMouseEnter={() => handleNodeMouseEnter(node.id)}
                onMouseLeave={handleNodeMouseLeave}
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
                <div className="corner-node-bubble">
                  <img src={node.img} alt={node.title} className="corner-node-icon" />
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default P5CornerRadialMenu
