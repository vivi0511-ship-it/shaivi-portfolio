import { useAudio } from '../context/AudioContext'
import './TurntablePlayer.css'

function TurntablePlayer({ width = '100px', className = '' }) {
  const { isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute, playSfx } = useAudio()

  const handleTurntableClick = (e) => {
    e.stopPropagation()
    togglePlay()
  }

  return (
    <div
      className={`turntable-player-container ${isPlaying ? 'is-playing' : 'is-paused'} ${className}`}
      style={{ width }}
      onClick={handleTurntableClick}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          togglePlay()
        }
      }}
    >
      {/* Translucent Sound Wave Ripples when Playing */}
      {isPlaying && (
        <div className="sound-ripple-container">
          <div className="sound-ripple-ring ring-1"></div>
          <div className="sound-ripple-ring ring-2"></div>
          <div className="sound-ripple-ring ring-3"></div>
        </div>
      )}

      {/* Main Turntable Body */}
      <div className="turntable-pod-body">
        <img
          src="/assets/turntable_transparent.png"
          alt="Turntable Audio Player"
          className="turntable-img-base"
          style={{ width: '100%' }}
        />

        {/* Animated Vinyl Disc Center Overlay */}
        <div className="vinyl-disc-overlay">
          <div className="vinyl-grooves-shine"></div>
          <div className="vinyl-center-label">
            <div className="vinyl-center-hole"></div>
          </div>
        </div>

        {/* Animated Tonearm Pivot */}
        <div className="tonearm-pivot-wrapper">
          <div className="tonearm-pivot-base"></div>
          <div className="tonearm-rod">
            <div className="tonearm-cartridge"></div>
          </div>
        </div>
      </div>

      {/* Frosted Pink Glass Hover Tooltip */}
      <div className="turntable-glass-tooltip">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </div>

      {/* Hover Volume & Mute Controls */}
      <div className="turntable-volume-popover" onClick={(e) => e.stopPropagation()}>
        <button
          className="volume-mute-btn"
          onClick={(e) => {
            e.stopPropagation()
            playSfx('click')
            toggleMute()
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            e.stopPropagation()
            setVolume(parseFloat(e.target.value))
          }}
          className="volume-slider-input"
          title="Adjust Volume"
          aria-label="Adjust Volume"
        />
      </div>
    </div>
  )
}

export default TurntablePlayer
