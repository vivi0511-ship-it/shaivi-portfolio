import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './Avatar3DCanvas.css'

export default function Avatar3DCanvas({ activeCategory, onEarringClick }) {
  const mountRef = useRef(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [activeMode, setActiveMode] = useState('Studio Gloss')

  // Refs to share state with animation loop without re-renders
  const stateRef = useRef({
    activeCategory: activeCategory || null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    isHovered: false,
    isEarringHovered: false,
    wobble: { rotX: 0, rotY: 0, rotZ: 0, velX: 0, velY: 0, velZ: 0 },
    earringScale: 1,
    earringEmissive: 0.4,
    earringSpin: 0,
    earringSpinVel: 0,
    nudge: { x: 0, y: 0, z: 0 }
  })

  // Update active category ref when prop changes
  useEffect(() => {
    stateRef.current.activeCategory = activeCategory

    // Calculate category nudge offset
    const n = stateRef.current.nudge
    switch (activeCategory) {
      case 'product-design':
        n.x = -0.28
        n.y = 0
        n.z = 0.05
        break
      case 'ux-research':
        n.x = 0.05
        n.y = -0.38
        n.z = 0.1
        break
      case 'ui-design':
        n.x = 0.05
        n.y = 0.38
        n.z = -0.1
        break
      case 'digital-spatial':
        n.x = 0.32
        n.y = 0
        n.z = -0.05
        break
      case 'contact-left':
        n.x = 0.05
        n.y = -0.35
        n.z = 0.08
        break
      case 'contact-right':
        n.x = 0.05
        n.y = 0.35
        n.z = -0.08
        break
      case 'chapter-left':
        n.x = 0.02
        n.y = -0.32
        n.z = 0.06
        break
      case 'chapter-right':
        n.x = 0.02
        n.y = 0.32
        n.z = -0.06
        break
      default:
        n.x = 0
        n.y = 0
        n.z = 0
        break
    }
  }, [activeCategory])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5.5)

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // 3. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.4)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)

    // Cobalt Blue Rim Light
    const rimLight = new THREE.PointLight(0x0066ff, 2.5, 10)
    rimLight.position.set(-3, 2, -2)
    scene.add(rimLight)

    // Dynamic Earring Specular Flare Light
    const earringLight = new THREE.PointLight(0x3399ff, 0.8, 5)
    earringLight.position.set(0.85, 0.15, 0.5)
    scene.add(earringLight)

    // 4. Main 3D Head Group
    const headGroup = new THREE.Group()
    scene.add(headGroup)

    // Load Avatar Texture
    const textureLoader = new THREE.TextureLoader()
    const avatarTexture = textureLoader.load('/assets/head_3d_trans.png')
    avatarTexture.colorSpace = THREE.SRGBColorSpace

    // Create 3D Avatar Mesh (Curved plane for organic 3D depth)
    const headGeo = new THREE.PlaneGeometry(1.65, 1.76, 16, 16)
    
    // Add subtle vertex curvature for real 3D depth
    const pos = headGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i)
      const vy = pos.getY(i)
      const distFromCenter = Math.sqrt(vx * vx + vy * vy)
      pos.setZ(i, Math.cos(distFromCenter * 0.8) * 0.15)
    }
    headGeo.computeVertexNormals()

    const headMat = new THREE.MeshStandardMaterial({
      map: avatarTexture,
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.DoubleSide
    })

    const headMesh = new THREE.Mesh(headGeo, headMat)
    headMesh.name = 'avatar_head_mesh'
    headGroup.add(headMesh)

    // 5. INTERACTIVE COBALT-BLUE EARRING / FEATURE HOTSPOT (SUB-MESH ATTACHED TO HEAD)
    const earringGroup = new THREE.Group()
    // Position near the side of the head / ear area relative to head center
    earringGroup.position.set(0.54, -0.05, 0.12)
    headGroup.add(earringGroup)

    // Outer Cobalt Glossy Ring
    const earringRingGeo = new THREE.TorusGeometry(0.11, 0.038, 24, 48)
    const earringRingMat = new THREE.MeshPhysicalMaterial({
      color: 0x0055ff,
      emissive: 0x0033bb,
      emissiveIntensity: 0.4,
      roughness: 0.08,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0
    })
    const earringRingMesh = new THREE.Mesh(earringRingGeo, earringRingMat)
    earringRingMesh.name = 'cobalt_earring_ring'
    earringGroup.add(earringRingMesh)

    // Inner Metallic Specular Gem Core
    const gemGeo = new THREE.SphereGeometry(0.055, 20, 20)
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x88ddff,
      roughness: 0.05,
      metalness: 0.95
    })
    const gemMesh = new THREE.Mesh(gemGeo, gemMat)
    gemMesh.name = 'cobalt_earring_gem'
    earringGroup.add(gemMesh)

    // Specular Halo Flare Ring behind Earring
    const flareGeo = new THREE.RingGeometry(0.12, 0.18, 32)
    const flareMat = new THREE.MeshBasicMaterial({
      color: 0x3388ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    })
    const flareMesh = new THREE.Mesh(flareGeo, flareMat)
    flareMesh.position.z = -0.02
    earringGroup.add(flareMesh)

    // 6. Raycasting for Earring Sub-mesh
    const raycaster = new THREE.Raycaster()
    const mouseVec = new THREE.Vector2(-999, -999)

    const updateMousePos = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)

      mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1

      stateRef.current.mouse.targetX = mouseVec.x
      stateRef.current.mouse.targetY = mouseVec.y
    }

    const handlePointerMove = (e) => {
      updateMousePos(e)
    }

    const handlePointerDown = (e) => {
      updateMousePos(e)
      raycaster.setFromCamera(mouseVec, camera)
      const intersects = raycaster.intersectObjects([earringRingMesh, gemMesh], true)

      if (intersects.length > 0) {
        // Trigger Snappy Wobble & Spin Physics Reaction!
        stateRef.current.earringSpinVel = 22.0
        stateRef.current.wobble.velX = (Math.random() - 0.5) * 0.8
        stateRef.current.wobble.velY = (Math.random() - 0.5) * 0.8
        stateRef.current.wobble.velZ = 0.6

        const modes = ['Studio Gloss', 'Cyber Neon', 'Specular Blue', 'Golden Glow']
        const nextMode = modes[(Math.floor(Math.random() * modes.length))]
        setActiveMode(nextMode)

        setToastMessage(`✨ Cobalt Earring Hotspot Triggered! Switched to ${nextMode} Mode 🎉`)
        setTimeout(() => setToastMessage(null), 3500)

        if (onEarringClick) {
          onEarringClick(nextMode)
        }
      }
    }

    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)

    // 7. Window Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // 8. Animation & Physics Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = Math.min(clock.getDelta(), 0.1)
      const time = clock.getElapsedTime()
      const st = stateRef.current

      // A. Smooth Mouse Position Interpolation (Spring Ease)
      st.mouse.x += (st.mouse.targetX - st.mouse.x) * 0.08
      st.mouse.y += (st.mouse.targetY - st.mouse.y) * 0.08

      // B. Raycasting for Earring Hover Detection
      raycaster.setFromCamera(mouseVec, camera)
      const intersects = raycaster.intersectObjects([earringRingMesh, gemMesh], true)
      const isEarringHovered = intersects.length > 0

      if (isEarringHovered !== st.isEarringHovered) {
        st.isEarringHovered = isEarringHovered
        document.body.style.cursor = isEarringHovered ? 'pointer' : 'default'
      }

      // C. Earring Hover Spring Physics & Specular Flare Feedback
      const targetScale = isEarringHovered ? 1.35 : 1.0
      const targetEmissive = isEarringHovered ? 2.2 : 0.4
      const targetFlareOpacity = isEarringHovered ? 0.75 : 0.25

      st.earringScale += (targetScale - st.earringScale) * 0.15
      st.earringEmissive += (targetEmissive - st.earringEmissive) * 0.15

      earringGroup.scale.set(st.earringScale, st.earringScale, st.earringScale)
      earringRingMat.emissiveIntensity = st.earringEmissive + Math.sin(time * 6) * (isEarringHovered ? 0.5 : 0.1)
      flareMat.opacity = targetFlareOpacity + Math.sin(time * 8) * (isEarringHovered ? 0.2 : 0.05)

      // D. Earring Click Spin Physics & Secondary Wobble
      st.earringSpin += st.earringSpinVel * delta
      st.earringSpinVel *= 0.92 // Friction dampening
      earringGroup.rotation.y = st.earringSpin + Math.sin(time * 2) * 0.1
      earringGroup.rotation.z = Math.cos(time * 2.5) * 0.08

      // E. Head Cursor-Tracking Physics & Category Reactive Nudge
      const idleSwayX = Math.sin(time * 1.5) * 0.04
      const idleSwayY = Math.cos(time * 1.2) * 0.03

      // Target Rotations
      const baseTargetRotY = st.mouse.x * 0.42 + st.nudge.y
      const baseTargetRotX = -st.mouse.y * 0.32 + st.nudge.x
      const baseTargetRotZ = -st.mouse.x * 0.12 + st.nudge.z

      // Spring acceleration & velocity dampening for Head Wobble
      st.wobble.velX += (baseTargetRotX - st.wobble.rotX) * 0.1
      st.wobble.velY += (baseTargetRotY - st.wobble.rotY) * 0.1
      st.wobble.velZ += (baseTargetRotZ - st.wobble.rotZ) * 0.1

      st.wobble.velX *= 0.85
      st.wobble.velY *= 0.85
      st.wobble.velZ *= 0.85

      st.wobble.rotX += st.wobble.velX
      st.wobble.rotY += st.wobble.velY
      st.wobble.rotZ += st.wobble.velZ

      headGroup.rotation.x = st.wobble.rotX + idleSwayX
      headGroup.rotation.y = st.wobble.rotY + idleSwayY
      headGroup.rotation.z = st.wobble.rotZ

      // Gentle floating position animation
      headGroup.position.y = Math.sin(time * 1.8) * 0.06

      // F. Render Scene
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', handleResize)
      document.body.style.cursor = 'default'

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      headGeo.dispose()
      headMat.dispose()
      avatarTexture.dispose()
      earringRingGeo.dispose()
      earringRingMat.dispose()
      gemGeo.dispose()
      gemMat.dispose()
      flareGeo.dispose()
      flareMat.dispose()
      renderer.dispose()
    }
  }, [onEarringClick])

  return (
    <div className="avatar-3d-canvas-container" ref={mountRef}>
      {toastMessage && (
        <div className="avatar-easter-egg-toast">
          {toastMessage}
        </div>
      )}
      <div className="avatar-interaction-hint">
        <span className="hint-dot" />
        <span>Click Cobalt Earring Hotspot for Physics Easter Egg ({activeMode})</span>
      </div>
    </div>
  )
}
