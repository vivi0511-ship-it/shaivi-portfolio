import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import './AvatarMenu.css'

function AvatarMenu({ size = '110px', className = '' }) {
  const navigate = useNavigate()
  const { playSfx } = useAudio()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    { label: 'HOME', path: '/', icon: '/assets/pod_house_trans.png' },
    { label: 'WORK', path: '/work', icon: '/assets/pod_laptop_trans.png' },
    { label: 'ABOUT ME', path: '/about', icon: '/assets/pod_resume_trans.png' },
    { label: 'HOBBIES', path: '/contact', icon: '/assets/pod_console_trans.png' }
  ]

  const handleToggle = (e) => {
    e.stopPropagation()
    playSfx('click')
    setIsOpen((prev) => !prev)
  }

  const handleItemClick = (path) => {
    playSfx('click')
    setIsOpen(false)
    navigate(path)
  }

  return (
    <div
      ref={containerRef}
      className={`avatar-menu-container ${isOpen ? 'is-open' : ''} ${className}`}
    >
      {/* 3D Avatar Trigger Button */}
      <button
        className="avatar-trigger-btn"
        onClick={handleToggle}
        title="Shaivi - Navigation Menu"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <img
          src="/assets/head_3d_clean.png"
          alt="Shaivi 3D Character"
          className="avatar-corner-img"
          style={{ width: size }}
        />
      </button>

      {/* Frosted Pink Glass Dropdown Menu */}
      <div className="avatar-dropdown-menu">
        <div className="menu-header-label">Navigation</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="avatar-menu-item"
            onMouseEnter={() => playSfx('hover')}
            onClick={() => handleItemClick(item.path)}
            role="button"
            tabIndex={0}
          >
            <img src={item.icon} alt={item.label} className="menu-item-icon" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvatarMenu
