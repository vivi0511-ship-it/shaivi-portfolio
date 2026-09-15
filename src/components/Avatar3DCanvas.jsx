import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './Avatar3DCanvas.css'

export default function Avatar3DCanvas({ activeCategory }) {
  const mountRef = useRef(null)

  // Refs to share state with animation loop without re-renders
  const stateRef = useRef({
    activeCategory: activeCategory || null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    wobble: { rotX: 0, rotY: 0, rotZ: 0, velX: 0, velY: 0, velZ: 0 },
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.3)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xeef4ff, 0.6)
    fillLight.position.set(-4, 2, 4)
    scene.add(fillLight)

    // 4. Main 3D Head Group
    const headGroup = new THREE.Group()
    scene.add(headGroup)

    // Load Avatar Texture
    const textureLoader = new THREE.TextureLoader()
    const avatarTexture = textureLoader.load('/assets/head_3d_trans.png')
    avatarTexture.colorSpace = THREE.SRGBColorSpace

    // Create 3D Avatar Mesh (Curved plane for organic 3D depth)
    const headGeo = new THREE.PlaneGeometry(1.75, 1.96, 16, 16)


    
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
      metalness: 0.08,
      side: THREE.DoubleSide
    })

    const headMesh = new THREE.Mesh(headGeo, headMat)
    headMesh.name = 'avatar_head_mesh'
    headGroup.add(headMesh)

    // 5. Mouse Position Tracking
    const updateMousePos = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)

      const mouseX = ((clientX - rect.left) / rect.width) * 2 - 1
      const mouseY = -((clientY - rect.top) / rect.height) * 2 + 1

      stateRef.current.mouse.targetX = mouseX
      stateRef.current.mouse.targetY = mouseY
    }

    const handlePointerMove = (e) => {
      updateMousePos(e)
    }

    window.addEventListener('mousemove', handlePointerMove)

    // 6. Window Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // 7. Animation & Physics Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      const st = stateRef.current

      // A. Smooth Mouse Position Interpolation (Spring Ease)
      st.mouse.x += (st.mouse.targetX - st.mouse.x) * 0.08
      st.mouse.y += (st.mouse.targetY - st.mouse.y) * 0.08

      // B. Head Cursor-Tracking Physics & Category Reactive Nudge
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

      // C. Render Scene
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('resize', handleResize)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      headGeo.dispose()
      headMat.dispose()
      avatarTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="avatar-3d-canvas-container" ref={mountRef} />
  )
}
