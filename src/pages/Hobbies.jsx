import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import P5CornerRadialMenu from '../components/P5CornerRadialMenu'
import TurntablePlayer from '../components/TurntablePlayer'
import './Hobbies.css'

export const CREATIONS = [
  {
    id: 'miss-rosy-cheeks',
    title: 'Miss Rosy Cheeks!',
    name: 'Miss Rosy Cheeks!',
    mysteryImage: '/assets/mystery-kitty-silhouette.png',
    unlockedImage: '/assets/miss-rosy-cheeks.png',
    lockedCard: '/assets/hobbies/card-rosy-cheeks-locked.png',
    unlockedCard: '/assets/miss-rosy-cheeks.png',
    silhouette: '/assets/mystery-kitty-silhouette.png',
    modalImage: '/assets/modal-kitty-card.png',
    targetX: 18,
    targetDepth: 155,
    style: { left: '5.7%', top: '4.4%', width: '23.6%', height: '62.0%', zIndex: 6 },
  },
  {
    id: 'me-right-now',
    title: 'Me Right Now!',
    name: 'Me Right Now!',
    subtitle: '(I wish)',
    mysteryImage: '/assets/mystery-rectangle-silhouette.png',
    unlockedImage: '/assets/me-right-now.png',
    lockedCard: '/assets/hobbies/card-me-right-now-locked.png',
    unlockedCard: '/assets/me-right-now.png',
    silhouette: '/assets/mystery-rectangle-silhouette.png',
    modalImage: '/assets/modal-me-right-now-card.png',
    targetX: 10,
    targetDepth: 230,
    style: { left: '1.3%', top: '49.3%', width: '17.9%', height: '49.3%', zIndex: 4 },
  },
  {
    id: 'mister-romantic',
    title: 'Mister Romantic!',
    name: 'Mister Romantic!',
    mysteryImage: '/assets/mister-romantic-silhouette-transparent.png',
    mysteryImagePool: '/assets/mister-romantic-silhouette-transparent.png',
    mysteryImageGrid: '/assets/mister-romantic-silhouette-card.png',
    unlockedImage: '/assets/mister-romantic-unlocked.png',
    lockedCard: '/assets/mister-romantic-silhouette-card.png',
    unlockedCard: '/assets/mister-romantic-unlocked.png',
    silhouette: '/assets/mister-romantic-silhouette-transparent.png',
    modalImage: '/assets/modal-mister-romantic-card.png',
    targetX: 52,
    targetDepth: 145,
    style: { left: '34.1%', top: '5.5%', width: '36.6%', height: '52.9%', zIndex: 5 },
  },
  {
    id: 'undead-kitty',
    title: 'Undead Kitty!',
    name: 'Undead Kitty!',
    mysteryImage: '/assets/mystery-square-kitty-silhouette.png',
    unlockedImage: '/assets/undead-kitty-tapestry.jpg',
    lockedCard: '/assets/hobbies/card-undead-kitty-locked.png',
    unlockedCard: '/assets/undead-kitty.png',
    silhouette: '/assets/mystery-square-kitty-silhouette.png',
    modalImage: '/assets/modal-undead-kitty-card.png',
    targetX: 43,
    targetDepth: 235,
    style: { left: '32.8%', top: '60.2%', width: '20.3%', height: '40.1%', zIndex: 4 },
  },
  {
    id: 'soul-eater',
    title: 'Soul Eater!',
    name: 'Soul Eater!',
    mysteryImage: '/assets/mystery-tall-soul-eater-silhouette.png',
    unlockedImage: '/assets/soul-eater.jpg',
    lockedCard: '/assets/hobbies/card-soul-eater-locked.png',
    unlockedCard: '/assets/soul-eater.jpg',
    silhouette: '/assets/mystery-tall-soul-eater-silhouette.png',
    modalImage: '/assets/modal-soul-eater-card.png',
    targetX: 27,
    targetDepth: 230,
    style: { left: '20.5%', top: '50.4%', width: '13.3%', height: '49.3%', zIndex: 3 },
  },
  {
    id: 'angry-unc-axolotl',
    title: 'Angry Unc Axolotl!',
    name: 'Angry Unc Axolotl!',
    mysteryImage: '/assets/mystery-axolotl-silhouette.png',
    unlockedImage: '/assets/angry-unc-axolotl.png',
    lockedCard: '/assets/hobbies/card-6.png',
    unlockedCard: '/assets/angry-unc-axolotl.png',
    silhouette: '/assets/mystery-axolotl-silhouette.png',
    modalImage: '/assets/modal-axolotl-card.png',
    targetX: 61,
    targetDepth: 230,
    style: { left: '52.0%', top: '47.4%', width: '19.2%', height: '51.1%', zIndex: 4 },
  },
  {
    id: 'chill-capyboy',
    title: 'Chill Capyboy!',
    name: 'Chill Capyboy!',
    mysteryImage: '/assets/hobbies/silhouette-1.png',
    unlockedImage: '/assets/hobbies/card-1-unlocked.png',
    lockedCard: '/assets/hobbies/card-1.png',
    unlockedCard: '/assets/hobbies/card-1-unlocked.png',
    silhouette: '/assets/hobbies/silhouette-1.png',
    modalImage: '/assets/modal-capy-card.png',
    targetX: 83,
    targetDepth: 230,
    style: { left: '69.3%', top: '46.7%', width: '29.3%', height: '52.6%', zIndex: 3 },
  },
]

function HobbiesPage() {
  const [unlockedIds, setUnlockedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('shaivi_unlocked_creations')
      if (!stored) return []
      const parsed = JSON.parse(stored)
      // Migrate legacy IDs
      return parsed.map((id) => {
        if (id === 'item-6') return 'angry-unc-axolotl'
        if (id === 'item-2') return 'miss-rosy-cheeks'
        if (id === 'item-7') return 'me-right-now'
        if (id === 'item-3') return 'mister-romantic'
        if (id === 'item-1') return 'chill-capyboy'
        if (id === 'item-4') return 'undead-kitty'
        if (id === 'item-5') return 'soul-eater'
        return id
      })
    } catch {
      return []
    }
  })

  // Claw animation states
  const [clawX, setClawX] = useState(24) // % across window
  const [clawDepth, setClawDepth] = useState(0) // px down from top
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [heldItem, setHeldItem] = useState(null)
  const [chuteItem, setChuteItem] = useState(null)
  const [modalItem, setModalItem] = useState(null)

  // Persist unlocks
  useEffect(() => {
    try {
      localStorage.setItem('shaivi_unlocked_creations', JSON.stringify(unlockedIds))
    } catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
  }, [unlockedIds])

  // Movement controls
  const moveLeft = useCallback(() => {
    if (isAnimating) return
    setClawX((prev) => Math.max(8, prev - 6))
  }, [isAnimating])

  const moveRight = useCallback(() => {
    if (isAnimating) return
    setClawX((prev) => Math.min(84, prev + 6))
  }, [isAnimating])

  // Fire celebratory confetti burst
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.72, x: 0.32 },
        colors: ['#ff69b4', '#be188d', '#ffb6c1', '#ffffff', '#ffd700'],
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Core Grab Sequence
  const triggerGrab = useCallback(
    (specificItem = null) => {
      if (isAnimating) return

      // Choose target item: either the requested item or the closest available to clawX
      const available = CREATIONS.filter((item) => !unlockedIds.includes(item.id))
      if (available.length === 0) {
        // Empty machine idle drop
        setIsAnimating(true)
        setClawDepth(140)
        setTimeout(() => {
          setIsGrabbing(true)
          setTimeout(() => {
            setIsGrabbing(false)
            setClawDepth(0)
            setIsAnimating(false)
          }, 500)
        }, 600)
        return
      }

      let target =
        specificItem && !unlockedIds.includes(specificItem.id) ? specificItem : null
      if (!target) {
        let minDiff = 9999
        for (const item of available) {
          const diff = Math.abs(clawX - item.targetX)
          if (diff < minDiff) {
            minDiff = diff
            target = item
          }
        }
      }

      setIsAnimating(true)

      // Stage 1: Move claw directly over target item
      setClawX(target.targetX)

      setTimeout(() => {
        // Stage 2: Lower claw shaft down to target depth
        setClawDepth(target.targetDepth)

        setTimeout(() => {
          // Stage 3: Clamp prongs around target item
          setIsGrabbing(true)
          setHeldItem(target)

          setTimeout(() => {
            // Stage 4: Lift claw and item up back to ceiling
            setClawDepth(0)

            setTimeout(() => {
              // Stage 5: Move claw horizontally all the way to chute (far left)
              setClawX(3)

              setTimeout(() => {
                // Stage 6: Release prongs — item falls into chute!
                setIsGrabbing(false)
                const dropped = target
                setHeldItem(null)
                setChuteItem(dropped)

                setTimeout(() => {
                  // Stage 7: Item lands in chute box -> Confetti + Unlock + Modal
                  triggerConfetti()
                  setUnlockedIds((prev) =>
                    prev.includes(dropped.id) ? prev : [...prev, dropped.id]
                  )
                  setModalItem(dropped)
                  setIsAnimating(false)

                  // Return claw to default rest position
                  setTimeout(() => {
                    setClawX(24)
                  }, 400)
                }, 600)
              }, 550)
            }, 700)
          }, 600)
        }, 650)
      }, 250)
    },
    [clawX, isAnimating, unlockedIds, triggerConfetti]
  )

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalItem) {
        if (e.key === 'Escape') {
          setModalItem(null)
          setChuteItem(null)
        }
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        moveLeft()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        moveRight()
      } else if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === ' ' ||
        e.key === 'Enter'
      ) {
        e.preventDefault()
        triggerGrab()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveLeft, moveRight, triggerGrab, modalItem])

  return (
    <div className="hobbies-page relative min-h-screen w-full flex items-center justify-center overflow-x-hidden select-none">
      {/* Turntable Player in Top-Left (matching image angle and placement) */}
      <div className="hobbies-turntable-slot fixed top-5 left-7 z-50">
        <TurntablePlayer width="90px" />
      </div>

      {/* 3D Avatar menu in Top-Right */}
      <div className="fixed top-5 right-7 z-50">
        <P5CornerRadialMenu />
      </div>

      {/* Main Two-Column Layout */}
      <main className="hobbies-main-container relative z-10 flex flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-[1240px] px-6 py-8">
        {/* ===================== LEFT COLUMN: CLAW MACHINE ===================== */}
        <div className="claw-machine-column relative flex flex-col items-center justify-center flex-shrink-0">
          {/* Vertical light-pink column band behind machine */}
          <div className="machine-vertical-stripe" aria-hidden="true" />

          {/* Machine Cabinet Container */}
          <div className="machine-cabinet relative w-[460px] h-[687px]">
            {/* Base Cabinet Graphic */}
            <img
              src="/assets/hobbies/claw-machine-empty.png"
              alt="Arcade Claw Machine"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0"
            />

            {/* ================= WINDOW INTERIOR ================= */}
            <div className="machine-window absolute left-[4.95%] top-[8.6%] w-[89.8%] h-[66.0%] overflow-hidden z-10">
              {/* Mechanical Claw Assembly */}
              <motion.div
                className="claw-assembly absolute top-0 z-20 flex flex-col items-center pointer-events-none"
                style={{ left: `${clawX}%` }}
                animate={{
                  left: `${clawX}%`,
                  y: clawDepth,
                }}
                transition={{
                  left: { type: 'spring', stiffness: 220, damping: 26 },
                  y: { duration: 0.65, ease: 'easeInOut' },
                }}
              >
                {/* Vertical shaft cord stretching down from ceiling */}
                <div
                  className="claw-cord w-[8px] bg-[#be188d] transition-all"
                  style={{ height: `${Math.max(0, clawDepth * 0.9)}px` }}
                />

                {/* Claw Sprite Frame */}
                <motion.div
                  className="claw-sprite-box relative w-[138px] h-[140px] -mt-1 flex items-center justify-center"
                  animate={{
                    scale: isGrabbing ? [1, 0.94, 1] : 1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src="/assets/hobbies/claw-sprite.png"
                    alt="Claw"
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
                  />

                  {/* Silhouette carried inside the prongs */}
                  {heldItem && (
                    <motion.div
                      className="held-silhouette absolute bottom-1 left-1/2 -translate-x-1/2 w-[72px] h-[72px] flex items-center justify-center pointer-events-none z-15"
                      initial={{ scale: 0.75, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <img
                        src={heldItem.mysteryImage || heldItem.silhouette}
                        alt={heldItem.title || heldItem.name}
                        className="w-full h-full object-contain filter drop-shadow select-none"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Mystery Item Pile at the Bottom of the Window */}
              <div className="machine-pile-container absolute inset-x-0 bottom-0 h-[40.5%] pointer-events-none">
                {CREATIONS.map((item) => {
                  const isUnlocked = unlockedIds.includes(item.id)
                  const isHeld = heldItem?.id === item.id
                  if (isHeld) return null

                  const silhouetteSrc = item.mysteryImage || item.silhouette

                  return (
                    <motion.div
                      key={item.id}
                      className="pile-item-hotspot absolute pointer-events-auto cursor-pointer"
                      style={item.style}
                      onClick={() => triggerGrab(item)}
                      whileHover={{ scale: isUnlocked ? 1 : 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      title={
                        isUnlocked
                          ? `${item.title || item.name} (Unlocked)`
                          : `Grab ${item.title || item.name}!`
                      }
                    >
                      <img
                        src={silhouetteSrc}
                        alt={item.title || item.name}
                        className={`w-full h-full object-contain select-none transition-opacity duration-300 ${
                          isUnlocked ? 'opacity-20 grayscale' : 'opacity-100'
                        }`}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* ================= PRIZE CHUTE BOX ON CONSOLE ================= */}
            <div className="machine-chute-box absolute left-[5.4%] top-[82.5%] w-[30.9%] h-[14.0%] flex items-center justify-center overflow-visible z-20 pointer-events-none">
              <AnimatePresence>
                {chuteItem && (
                  <motion.div
                    key={chuteItem.id}
                    className="w-[84px] h-[84px] flex items-center justify-center p-1"
                    initial={{ y: -260, opacity: 0, scale: 0.7 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.55, ease: 'bounceOut' }}
                  >
                    <img
                      src={chuteItem.mysteryImage || chuteItem.silhouette}
                      alt={chuteItem.title || chuteItem.name}
                      className="w-full h-full object-contain filter drop-shadow-md select-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= D-PAD CONTROLLER ON CONSOLE ================= */}
            <div className="machine-dpad-controller absolute left-[34.8%] top-[80.8%] w-[28.0%] h-[18.8%] z-20">
              {/* Up button */}
              <button
                className="dpad-hotspot dpad-up"
                onClick={() => triggerGrab()}
                disabled={isAnimating}
                aria-label="Drop Claw"
                title="Drop Claw (↓ / Space)"
              />
              {/* Left button */}
              <button
                className="dpad-hotspot dpad-left"
                onClick={moveLeft}
                disabled={isAnimating}
                aria-label="Move Claw Left"
                title="Move Left (←)"
              />
              {/* Right button */}
              <button
                className="dpad-hotspot dpad-right"
                onClick={moveRight}
                disabled={isAnimating}
                aria-label="Move Claw Right"
                title="Move Right (→)"
              />
              {/* Down button */}
              <button
                className="dpad-hotspot dpad-down"
                onClick={() => triggerGrab()}
                disabled={isAnimating}
                aria-label="Drop Claw"
                title="Drop Claw (↓ / Space)"
              />
            </div>
          </div>
        </div>

        {/* ===================== RIGHT COLUMN: CREATIONS GALLERY ===================== */}
        <div className="unlock-creations-column flex flex-col items-start justify-center pb-2">
          {/* Title from Provided Graphic */}
          <div className="unlock-title-wrapper mb-6 select-none">
            <h1 className="sr-only">Unlock All My Creations!</h1>
            <img
              src="/assets/hobbies/mock-title-trans.png"
              alt="Unlock All My Creations!"
              className="unlock-title-image h-[110px] w-auto object-contain filter drop-shadow-sm pointer-events-none"
            />
          </div>

          {/* 3-Column Collection Cards Grid */}
          <div className="creations-cards-grid grid grid-cols-3 gap-4 sm:gap-5">
            {CREATIONS.map((item) => {
              const isUnlocked = unlockedIds.includes(item.id)
              const cardImage = isUnlocked
                ? item.unlockedImage || item.unlockedCard
                : item.lockedCard || item.mysteryImage

              return (
                <motion.div
                  key={item.id}
                  className={`creation-card-tile relative w-[105px] h-[105px] sm:w-[116px] sm:h-[116px] cursor-pointer ${
                    item.id === 'item-7' ? 'col-start-2' : ''
                  }`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isUnlocked) {
                      setModalItem(item)
                    } else {
                      triggerGrab(item)
                    }
                  }}
                  title={
                    isUnlocked
                      ? `View ${item.title || item.name}`
                      : `Locked — Click to Catch ${item.title || item.name}!`
                  }
                >
                  <img
                    src={cardImage}
                    alt={isUnlocked ? item.title || item.name : 'Mystery Creation'}
                    className="w-full h-full object-contain select-none filter drop-shadow-sm transition-all"
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Reset Collection Replay Button */}
          {unlockedIds.length > 0 && (
            <motion.button
              className="mt-6 text-xs font-semibold text-[#be188d]/80 hover:text-[#be188d] underline transition-colors cursor-pointer"
              onClick={() => {
                if (window.confirm('Reset all unlocked creations to replay the claw machine?')) {
                  setUnlockedIds([])
                  setChuteItem(null)
                  setModalItem(null)
                  try {
                    localStorage.removeItem('shaivi_unlocked_creations')
                  } catch (e) {
                    console.error(e)
                  }
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ↻ Reset Collection ({unlockedIds.length}/7 Unlocked)
            </motion.button>
          )}
        </div>
      </main>

      {/* ===================== CELEBRATION MODAL ===================== */}
      <AnimatePresence>
        {modalItem && (
          <div
            className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
            onClick={() => {
              setModalItem(null)
              setChuteItem(null)
            }}
          >
            {modalItem.modalImage ? (
              /* User-Provided Modal Card Graphic (for Capyboy & Angry Unc Axolotl) */
              <motion.div
                className="relative w-[340px] max-w-[90vw] select-none cursor-default"
                initial={{ scale: 0.7, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.75, y: 15, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalItem.modalImage}
                  alt={modalItem.title || modalItem.name}
                  className="w-full h-auto drop-shadow-2xl rounded-[32px] pointer-events-none"
                />

                {/* Invisible button over top-right close cross */}
                <button
                  className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center cursor-pointer rounded-full opacity-0 hover:opacity-10 bg-black transition-opacity"
                  onClick={() => {
                    setModalItem(null)
                    setChuteItem(null)
                  }}
                  aria-label="Close Modal"
                />
              </motion.div>
            ) : (
              /* Identically styled Card Modal for other creations */
              <motion.div
                className="relative w-[340px] max-w-[90vw] bg-white border-[3.5px] border-[#be188d] rounded-[32px] px-7 py-7 flex flex-col items-center shadow-2xl cursor-default"
                initial={{ scale: 0.7, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.75, y: 15, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button '✕' */}
                <button
                  className="absolute top-4 right-5 text-2xl font-bold text-[#be188d] hover:scale-125 transition-transform cursor-pointer leading-none"
                  onClick={() => {
                    setModalItem(null)
                    setChuteItem(null)
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Unlocked Photo */}
                <div className="w-[200px] h-[200px] flex items-center justify-center my-3">
                  <img
                    src={modalItem.unlockedImage || modalItem.unlockedCard}
                    alt={modalItem.title || modalItem.name}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                  />
                </div>

                {/* Creation Title */}
                <h2 className="modal-creation-title font-['Pixelify_Sans',_'Fredoka',_sans-serif] text-[28px] font-bold text-[#be188d] text-center leading-tight mt-1 mb-2">
                  {modalItem.title || modalItem.name}
                </h2>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HobbiesPage
