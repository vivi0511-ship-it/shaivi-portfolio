import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AudioContext = createContext()

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const webAudioCtxRef = useRef(null)

  // Initialize background audio element
  useEffect(() => {
    const audio = new Audio('/assets/bg_music.mp3')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Web Audio API Synthesizer for Persona 5 Micro UI SFX
  const initWebAudio = () => {
    if (!webAudioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        webAudioCtxRef.current = new AudioCtx()
      }
    }
    if (webAudioCtxRef.current && webAudioCtxRef.current.state === 'suspended') {
      webAudioCtxRef.current.resume()
    }
  }

  const playSfx = (type = 'hover') => {
    try {
      initWebAudio()
      const ctx = webAudioCtxRef.current
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const now = ctx.currentTime

      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'hover') {
        // High-pitched soft Persona 5 menu pop/click
        osc.type = 'sine'
        osc.frequency.setValueAtTime(850, now)
        osc.frequency.exponentialRampToValueAtTime(1350, now + 0.05)

        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

        osc.start(now)
        osc.stop(now + 0.05)
      } else if (type === 'banner') {
        // Angled banner kinetic swoosh / whoosh
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(220, now)
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.12)

        gain.gain.setValueAtTime(0.07, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

        osc.start(now)
        osc.stop(now + 0.12)
      } else if (type === 'click') {
        // Crisp UI click feedback
        osc.type = 'square'
        osc.frequency.setValueAtTime(1100, now)
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.06)

        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

        osc.start(now)
        osc.stop(now + 0.06)
      }
    } catch {
      // Ignore sfx errors if audio context blocked
    }
  }

  // Smooth Fade-In and Fade-Out Audio Transitions
  const togglePlay = () => {
    initWebAudio()
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    const targetVol = isMuted ? 0 : volume

    if (!isPlaying) {
      // Start Playback with 1.0 second smooth fade-in
      audio.volume = 0
      audio.play().then(() => {
        setIsPlaying(true)
        playSfx('click')
        const fadeStep = targetVol / 20
        let currentVol = 0

        fadeIntervalRef.current = setInterval(() => {
          currentVol += fadeStep
          if (currentVol >= targetVol) {
            audio.volume = targetVol
            clearInterval(fadeIntervalRef.current)
          } else {
            audio.volume = currentVol
          }
        }, 50)
      }).catch((err) => {
        console.warn('Audio play blocked:', err)
      })
    } else {
      // Pause Playback with 0.5 second smooth fade-out
      playSfx('click')
      const initialVol = audio.volume
      const fadeStep = initialVol / 10
      let currentVol = initialVol

      fadeIntervalRef.current = setInterval(() => {
        currentVol -= fadeStep
        if (currentVol <= 0) {
          audio.volume = 0
          audio.pause()
          setIsPlaying(false)
          clearInterval(fadeIntervalRef.current)
        } else {
          audio.volume = currentVol
        }
      }, 50)
    }
  }

  const setVolume = (newVol) => {
    setVolumeState(newVol)
    if (audioRef.current && isPlaying && !isMuted) {
      audioRef.current.volume = newVol
    }
  }

  const toggleMute = () => {
    setIsMuted((prev) => {
      const nextMuted = !prev
      if (audioRef.current) {
        audioRef.current.volume = nextMuted ? 0 : volume
      }
      return nextMuted
    })
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        togglePlay,
        setVolume,
        toggleMute,
        playSfx
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  return useContext(AudioContext)
}
