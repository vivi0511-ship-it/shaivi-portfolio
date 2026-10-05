import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import P5CornerRadialMenu from '../components/P5CornerRadialMenu'
import TurntablePlayer from '../components/TurntablePlayer'
import './Hobbies.css'

/*
  Data Structure:
  Includes the 4 user-supplied assets for item-1:
  - vendingMysteryImage (Image 1: mystery item in vending machine)
  - catalogueMysteryImage (Image 2: mystery item catalogue card on the side)
  - modalCardImage (Image 3: mystery item acquired card modal)
  - catalogueUnlockedImage (Image 4: acquired item catalogue card on the side)
  With clean placeholders and SVG/real photo fallbacks for all other creations.
*/
export const INITIAL_CREATIONS = [
  {
    id: 'item-1',
    name: 'Chill Capyboy!',
    // User-provided assets
    vendingMysteryImage: '/assets/mystery-capy.png',
    catalogueMysteryImage: '/assets/catalogue-mystery-capy.png',
    modalCardImage: '/assets/modal-capy-card.png',
    catalogueUnlockedImage: '/assets/catalogue-unlocked-capy.png',
    unlockedImage: '/assets/real-capy.png',
    silhouetteShape: 'urn',
    color: '#fed6ee',
    stroke: '#be188d',
    isRect: false,
    path: 'M 35,14 C 42,8 58,8 65,14 C 70,22 66,36 65,48 C 74,56 86,68 84,78 C 82,88 70,88 60,86 C 50,84 40,86 32,86 C 22,86 16,84 14,78 C 12,68 24,56 33,48 C 32,36 28,22 35,14 Z',
    targetX: 20,
    targetDepth: 180,
    windowStyle: { left: '8%', bottom: '24%', width: '25%', height: '40%', zIndex: 4 },
  },
  {
    id: 'item-2',
    name: 'Sleepy Bear',
    unlockedImage: '/assets/real-bear.png',
    silhouetteShape: 'purple-blob',
    color: '#be4cb3',
    stroke: '#7d1170',
    isRect: false,
    path: 'M 42,12 C 55,8 70,10 78,20 C 85,30 82,45 74,54 C 80,64 82,75 74,84 C 65,92 48,90 36,86 C 24,82 18,72 22,58 C 25,48 20,38 25,26 C 29,15 35,14 42,12 Z',
    targetX: 14,
    targetDepth: 250,
    windowStyle: { left: '4%', bottom: '0', width: '22%', height: '39%', zIndex: 5 },
  },
  {
    id: 'item-3',
    name: 'Retro Camera',
    unlockedImage: '/assets/real-camera.png',
    silhouetteShape: 'rect-wide',
    color: '#fed6ee',
    stroke: '#be188d',
    isRect: true,
    rectProps: { x: 8, y: 22, width: 84, height: 56, rx: 9 },
    targetX: 52,
    targetDepth: 210,
    windowStyle: { left: '33%', bottom: '18%', width: '38%', height: '37%', zIndex: 2 },
  },
  {
    id: 'item-4',
    name: 'Berry Bunny',
    unlockedImage: '/assets/real-bunny.png',
    silhouetteShape: 'pink-blob',
    color: '#ee65d6',
    stroke: '#be188d',
    isRect: false,
    path: 'M 36,20 C 48,14 64,16 74,22 C 84,28 86,44 85,60 C 84,74 78,82 66,84 C 52,86 38,84 28,82 C 16,80 12,70 14,56 C 16,42 24,40 28,30 C 30,24 32,22 36,20 Z',
    targetX: 45,
    targetDepth: 260,
    windowStyle: { left: '35%', bottom: '0', width: '21%', height: '35%', zIndex: 7 },
  },
  {
    id: 'item-5',
    name: 'Ghosty Friend',
    unlockedImage: '/assets/real-ghost.png',
    silhouetteShape: 'tall-pale',
    color: '#fff1f9',
    stroke: '#be188d',
    isRect: false,
    path: 'M 42,14 C 50,8 60,8 68,16 C 74,24 72,36 68,46 C 74,56 76,68 74,80 C 72,88 58,86 50,82 C 42,86 28,88 26,80 C 24,68 28,54 34,44 C 30,34 32,22 42,14 Z',
    targetX: 29,
    targetDepth: 260,
    windowStyle: { left: '20%', bottom: '0', width: '19%', height: '37%', zIndex: 6 },
  },
  {
    id: 'item-6',
    name: 'Starry Bloom',
    unlockedImage: '/assets/real-star.png',
    silhouetteShape: 'pale-splash',
    color: '#fce7f5',
    stroke: '#be188d',
    isRect: false,
    path: 'M 48,14 C 62,10 76,14 84,26 C 88,34 82,46 76,54 C 74,64 72,74 65,82 C 58,88 44,88 38,82 C 30,72 32,60 26,50 C 20,40 14,32 20,24 C 26,16 38,16 48,14 Z',
    targetX: 63,
    targetDepth: 260,
    windowStyle: { left: '52%', bottom: '0', width: '22%', height: '39%', zIndex: 8 },
  },
  {
    id: 'item-7',
    name: 'Golden Bear',
    unlockedImage: '/assets/toy_bear_3d.png',
    silhouetteShape: 'rect-square',
    color: '#ea82dc',
    stroke: '#be188d',
    isRect: true,
    rectProps: { x: 14, y: 14, width: 72, height: 72, rx: 12 },
    targetX: 80,
    targetDepth: 260,
    windowStyle: { left: '68%', bottom: '0', width: '28%', height: '34%', zIndex: 5 },
  },
]

function HobbiesPage() {
  // State persistence via localStorage
  const [unlockedIds, setUnlockedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('shaivi_unlocked_creations')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Claw animation coordinates & state
  const [clawX, setClawX] = useState(26) // Percentage across window
  const [clawDepth, setClawDepth] = useState(0) // Pixel vertical extension
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [heldItem, setHeldItem] = useState(null)
  const [chuteItem, setChuteItem] = useState(null)
  const [modalItem, setModalItem] = useState(null)

  // Track items still inside the pile (unlocked items remain removed from the pile)
  const pileItems = INITIAL_CREATIONS.filter(
    item => !unlockedIds.includes(item.id) && heldItem?.id !== item.id
  )

  // Sync unlockedIds to localStorage
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
    setClawX(prev => Math.max(14, prev - 5))
  }, [isAnimating])

  const moveRight = useCallback(() => {
    if (isAnimating) return
    setClawX(prev => Math.min(84, prev + 5))
  }, [isAnimating])

  /*
    Multi-stage Grab & Pickup Sequence:
    1. Lowers claw directly over item
    2. Prongs close around mystery item
    3. Claw lifts item up to top elevation (Image 2)
    4. Claw travels left towards drop chute
    5. Claw opens and drops item straight down into chute box (Image 3)
    6. Modal opens with revealed photo & title (Image 4)
    7. Right gallery collection updates to unlocked photo (Image 5)
  */
  const triggerGrab = useCallback(() => {
    if (isAnimating) return

    // Find available item closest to current clawX position
    const available = INITIAL_CREATIONS.filter(item => !unlockedIds.includes(item.id))
    if (available.length === 0) {
      setIsAnimating(true)
      setClawDepth(120)
      setTimeout(() => {
        setIsGrabbing(true)
        setTimeout(() => {
          setClawDepth(0)
          setIsGrabbing(false)
          setIsAnimating(false)
        }, 500)
      }, 600)
      return
    }

    // Pick closest item based on targetX
    let closestItem = available[0]
    let minDiff = Math.abs(clawX - available[0].targetX)
    for (let i = 1; i < available.length; i++) {
      const diff = Math.abs(clawX - available[i].targetX)
      if (diff < minDiff) {
        minDiff = diff
        closestItem = available[i]
      }
    }

    setIsAnimating(true)

    // Step 1: Smoothly nudge claw to targetX & lower claw shaft
    setClawX(closestItem.targetX)
    setTimeout(() => {
      setClawDepth(closestItem.targetDepth)

      // Step 2: Claw arrives at item, closes prongs around it
      setTimeout(() => {
        setIsGrabbing(true)
        setHeldItem(closestItem)

        // Step 3: Lift claw & item back up to top elevation
        setTimeout(() => {
          setClawDepth(0)

          // Step 4: Claw glides left to position directly over drop chute
          setTimeout(() => {
            setClawX(6) // Directly over left drop chute

            // Step 5: Claw opens prongs and releases item into chute
            setTimeout(() => {
              setIsGrabbing(false)
              const dropped = closestItem
              setHeldItem(null)
              setChuteItem(dropped)

              // Step 6: Item drops down into chute box -> Trigger Modal & Reveal
              setTimeout(() => {
                setModalItem(dropped)
                setUnlockedIds(prev => (prev.includes(dropped.id) ? prev : [...prev, dropped.id]))
                setIsAnimating(false)

                // Return claw to rest position
                setTimeout(() => {
                  setClawX(26)
                }, 400)
              }, 700)
            }, 600)
          }, 800)
        }, 600)
      }, 700)
    }, 200)
  }, [clawX, isAnimating, unlockedIds])

  // Keyboard navigation
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
      } else if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        triggerGrab()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [moveLeft, moveRight, triggerGrab, modalItem])

  // Helper to render mystery item in machine, claw, and chute
  const renderItemMystery = (item) => {
    if (item.vendingMysteryImage) {
      return (
        <img
          src={item.vendingMysteryImage}
          alt={item.name}
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
        />
      )
    }
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {item.isRect ? (
          <rect
            {...item.rectProps}
            fill={item.color}
            stroke={item.stroke}
            strokeWidth="2.5"
          />
        ) : (
          <path
            d={item.path}
            fill={item.color}
            stroke={item.stroke}
            strokeWidth="2.5"
          />
        )}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontSize="30"
          fill={item.stroke}
          fontWeight="bold"
          fontFamily="Georgia, 'Playfair Display', serif"
        >
          ?
        </text>
      </svg>
    )
  }

  return (
    <div className="hobbies-page relative min-h-screen w-full flex items-center justify-center overflow-x-hidden select-none">
      {/* SVG Grain filter for subtle mottled paper texture */}
      <svg className="hobbies-grain-overlay pointer-events-none absolute inset-0 w-full h-full opacity-65 z-1" aria-hidden="true">
        <filter id="hobbies-grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hobbies-grain-filter)" />
      </svg>

      {/* Floating turntable player in top-left */}
      <div className="hobbies-turntable-slot fixed top-6 left-8 z-50">
        <TurntablePlayer width="88px" />
      </div>

      {/* 3D Avatar menu in top-right */}
      <div className="fixed top-6 right-8 z-50">
        <P5CornerRadialMenu />
      </div>

      {/* Main Two-Column Layout */}
      <main className="hobbies-main-container relative z-10 flex flex-row items-center justify-center gap-16 w-full max-w-[1240px] px-8 py-10">
        {/* ===================== LEFT COLUMN: CLAW MACHINE ===================== */}
        <div className="claw-machine-column flex flex-col items-center justify-center flex-shrink-0">
          <div className="claw-machine-cabinet w-[480px] flex flex-col items-center">
            {/* Framed arcade claw machine glass display box with thick neutral grey frame */}
            <div className="machine-window relative w-[480px] h-[450px] bg-[#faebf4] border-[14px] border-[#808080] overflow-hidden">
              {/* ===== CONTROLLABLE MECHANICAL CLAW ===== */}
              <motion.div
                className="claw-assembly absolute top-0 z-20 flex flex-col items-center pointer-events-none"
                style={{ left: `${clawX}%` }}
                animate={{
                  left: `${clawX}%`,
                  y: clawDepth,
                }}
                transition={{
                  left: { type: 'spring', stiffness: 200, damping: 24 },
                  y: { duration: 0.6, ease: 'easeInOut' },
                }}
              >
                {/* Ceiling slider mount */}
                <div className="claw-ceiling-mount w-11 h-4 bg-[#efa8dc] border-2 border-[#be188d] border-t-0 rounded-b-[10px]" />

                {/* Vertical magenta rod */}
                <div
                  className="claw-shaft w-2 bg-[#be188d] transition-all"
                  style={{ height: `${28 + clawDepth * 0.4}px` }}
                />

                {/* Circular pivot joint */}
                <div className="claw-pivot w-7 h-7 bg-[#f5cbe7] border-[2.5px] border-[#be188d] rounded-full flex items-center justify-center -mt-0.5 z-10">
                  <div className="claw-pivot-center w-3 h-3 bg-[#fae8f3] border-2 border-[#be188d] rounded-full" />
                </div>

                {/* Mechanical Y-shaped claw prongs */}
                <div className="claw-arms-container relative w-[140px] h-[78px] -mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 140 80">
                    <motion.path
                      d={
                        isGrabbing
                          ? 'M 70,6 L 46,44 L 46,64'
                          : 'M 70,6 L 22,46 L 22,64'
                      }
                      fill="none"
                      stroke="#be188d"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{
                        d: isGrabbing
                          ? 'M 70,6 L 46,44 L 46,64'
                          : 'M 70,6 L 22,46 L 22,64',
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d={
                        isGrabbing
                          ? 'M 70,6 L 94,44 L 94,64'
                          : 'M 70,6 L 118,46 L 118,64'
                      }
                      fill="none"
                      stroke="#be188d"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{
                        d: isGrabbing
                          ? 'M 70,6 L 94,44 L 94,64'
                          : 'M 70,6 L 118,46 L 118,64',
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    />
                  </svg>
                </div>

                {/* Item held in claw while lifting and moving (Image 2) */}
                {heldItem && (
                  <motion.div
                    className="held-claw-item absolute top-[62px] w-[100px] h-[100px] pointer-events-none z-15 flex items-center justify-center p-1"
                    initial={{ scale: 0.9, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {renderItemMystery(heldItem)}
                  </motion.div>
                )}
              </motion.div>

              {/* ===== MYSTERY ITEM SILHOUETTES PILE AT THE BOTTOM (Image 1) ===== */}
              <div className="claw-prizes-pile absolute inset-x-0 bottom-0 h-full pointer-events-none">
                {pileItems.map((item) => (
                  <div
                    key={item.id}
                    className="prize-item absolute flex items-end justify-center pointer-events-auto cursor-pointer"
                    style={item.windowStyle}
                    onClick={() => {
                      if (!isAnimating) {
                        setClawX(item.targetX)
                        setTimeout(triggerGrab, 200)
                      }
                    }}
                    title={`Grab ${item.name}`}
                  >
                    {renderItemMystery(item)}
                  </div>
                ))}
              </div>
            </div>

            {/* ===== LOWER CONTROLS BELOW THE BOX ===== */}
            <div className="claw-console w-[480px] h-[142px] bg-[#f2a8d6] flex items-center justify-between px-11">
              {/* Square drop chute on the left with item falling/landing animation (Image 3) */}
              <div className="console-chute relative w-[105px] h-[94px] bg-white border-[2.5px] border-[#d563be] rounded-[14px] flex items-center justify-center overflow-visible shadow-sm">
                <AnimatePresence>
                  {chuteItem && (
                    <motion.div
                      key={chuteItem.id}
                      className="absolute inset-0 w-full h-full flex items-center justify-center p-1"
                      initial={{ y: -220, opacity: 0, scale: 0.85 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, ease: 'bounceOut' }}
                    >
                      {renderItemMystery(chuteItem)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Circular directional D-pad on the right */}
              <div className="console-dpad relative w-[126px] h-[126px] bg-white border-[2.5px] border-[#d563be] rounded-full shadow-sm">
                <button
                  className="dpad-key dpad-up"
                  onClick={triggerGrab}
                  disabled={isAnimating}
                  aria-label="Drop Claw"
                >
                  <span className="dpad-arrow">↑</span>
                </button>
                <button
                  className="dpad-key dpad-left"
                  onClick={moveLeft}
                  disabled={isAnimating}
                  aria-label="Move Left"
                >
                  <span className="dpad-arrow">←</span>
                </button>
                <button
                  className="dpad-key dpad-right"
                  onClick={moveRight}
                  disabled={isAnimating}
                  aria-label="Move Right"
                >
                  <span className="dpad-arrow">→</span>
                </button>
                <button
                  className="dpad-key dpad-down"
                  onClick={triggerGrab}
                  disabled={isAnimating}
                  aria-label="Drop Claw"
                >
                  <span className="dpad-arrow">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== RIGHT COLUMN: UNLOCK ALL MY CREATIONS ===================== */}
        <div className="unlock-gallery-column flex flex-col items-start justify-center pb-5">
          <h1 className="unlock-heading font-['Pixelify_Sans',_sans-serif] text-[38px] font-bold text-[#be188d] leading-[1.25] tracking-wide mb-8">
            Unlock All My<br />Creations!
          </h1>

          {/* Grid of locked collection cards showing mystery silhouettes or revealed creations */}
          <div className="cards-grid grid grid-cols-3 gap-4">
            {INITIAL_CREATIONS.map((item) => {
              const isUnlocked = unlockedIds.includes(item.id)
              return (
                <motion.div
                  key={item.id}
                  className={`creation-card relative w-[105px] h-[105px] rounded-[20px] flex items-center justify-center cursor-pointer shadow-sm overflow-hidden ${
                    item.id === 'item-7' ? 'col-start-2' : ''
                  } ${
                    // If custom full-card graphics are supplied, remove redundant default borders
                    (isUnlocked && item.catalogueUnlockedImage) || (!isUnlocked && item.catalogueMysteryImage)
                      ? 'bg-transparent border-none p-0'
                      : 'bg-white border-2 border-[#d563be] p-2'
                  }`}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    if (isUnlocked) {
                      setModalItem(item)
                    } else {
                      // Guide claw to this item
                      setClawX(item.targetX)
                      setTimeout(triggerGrab, 200)
                    }
                  }}
                  title={isUnlocked ? `View ${item.name}` : `Locked — Guide claw to catch!`}
                >
                  {isUnlocked ? (
                    item.catalogueUnlockedImage ? (
                      /* Image 4: Acquired item on the side */
                      <motion.img
                        src={item.catalogueUnlockedImage}
                        alt={item.name}
                        className="w-full h-full object-contain select-none"
                        initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      />
                    ) : (
                      <motion.div
                        className="w-full h-full flex items-center justify-center"
                        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      >
                        <img
                          src={item.unlockedImage}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </motion.div>
                    )
                  ) : item.catalogueMysteryImage ? (
                    /* Image 2: Mystery item catalogue on the side */
                    <img
                      src={item.catalogueMysteryImage}
                      alt="Mystery Item"
                      className="w-full h-full object-contain select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {renderItemMystery(item)}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Reset collection button for replayability */}
          {unlockedIds.length > 0 && (
            <motion.button
              className="mt-6 text-xs text-[#be188d]/70 hover:text-[#be188d] underline transition-colors"
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

      {/* ===================== POP-UP MODAL (Image 3: Acquired Card Modal) ===================== */}
      <AnimatePresence>
        {modalItem && (
          <div
            className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/25 backdrop-blur-[2px]"
            onClick={() => {
              setModalItem(null)
              setChuteItem(null)
            }}
          >
            {modalItem.modalCardImage ? (
              /* Image 3: Exact mystery item acquired card graphic */
              <motion.div
                className="relative w-[340px] max-w-[90vw] select-none cursor-default"
                initial={{ scale: 0.7, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.75, y: 15, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalItem.modalCardImage}
                  alt={modalItem.name}
                  className="w-full h-auto drop-shadow-2xl rounded-[32px] pointer-events-none"
                />

                {/* Clickable button over the 'X' icon at top-right */}
                <button
                  className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center cursor-pointer rounded-full opacity-0 hover:opacity-15 bg-black transition-opacity"
                  onClick={() => {
                    setModalItem(null)
                    setChuteItem(null)
                  }}
                  aria-label="Close Modal"
                />
              </motion.div>
            ) : (
              <motion.div
                className="relative w-[340px] max-w-[90vw] bg-white border-[3px] border-[#be188d] rounded-[32px] px-8 py-7 flex flex-col items-center shadow-2xl cursor-default"
                initial={{ scale: 0.7, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.75, y: 15, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-5 text-xl font-bold text-[#be188d] hover:scale-125 transition-transform cursor-pointer leading-none"
                  onClick={() => {
                    setModalItem(null)
                    setChuteItem(null)
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>

                <div className="w-[200px] h-[200px] flex items-center justify-center my-3">
                  <img
                    src={modalItem.unlockedImage}
                    alt={modalItem.name}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                  />
                </div>

                <h2 className="modal-creation-title font-['Pixelify_Sans',_'Fredoka',_sans-serif] text-[28px] font-bold text-[#be188d] text-center leading-tight mt-1 mb-2">
                  {modalItem.name.includes(' ') ? (
                    <>
                      {modalItem.name.split(' ')[0]}
                      <br />
                      {modalItem.name.split(' ').slice(1).join(' ')}
                    </>
                  ) : (
                    modalItem.name
                  )}
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
