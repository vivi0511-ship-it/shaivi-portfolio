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
      style: { top: '18px', right: '175px' },
      bannerClip: 'polygon(0% 0%, 100% 0%, 100% 65%, 0% 35%)',
      textPos: { top: '35px', left: '15%', transform: 'rotate(-3deg)' }
    },
    {
      id: 'laptop',
      title: 'WORK',
      path: '/work',
      img: '/assets/pod_laptop_trans.png',
      style: { top: '105px', right: '210px' },
      bannerClip: 'polygon(0% 12%, 100% 25%, 100% 82%, 0% 55%)',
      textPos: { top: '45px', left: '15%', transform: 'rotate(-4deg)' }
    },
    {
      id: 'resume',
      title: 'RESUME',
      path: '/about',
      img: '/assets/pod_resume_trans.png',
      style: { top: '190px', right: '165px' },
      bannerClip: 'polygon(0% 25%, 100% 48%, 100% 95%, 0% 72%)',
      textPos: { top: '65px', left: '16%', transform: 'rotate(-3deg)' }
    },
    {
      id: 'console',
      title: 'HOBBIES',
      path: '/contact',
      img: '/assets/pod_console_trans.png',
      style: { top: '220px', right: '65px' },
      bannerClip: 'polygon(0% 35%, 100% 60%, 100% 100%, 0% 85%)',
      textPos: { top: '75px', left: '16%', transform: 'rotate(-4deg)' }
    },
    {
      id: 'avatar',
      title: 'ABOUT ME',
      path: '/about',
      bannerClip: 'polygon(0% 10%, 100% 0%, 100% 65%, 0% 45%)',
      textPos: { top: '40px', left: '12%', transform: 'rotate(-3deg)' }
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
