import { useState } from 'react'
import AboutSection from '../components/About'
import P5CornerRadialMenu from '../components/P5CornerRadialMenu'
import Avatar3DCanvas from '../components/Avatar3DCanvas'
import Footer from '../components/Footer'

function About() {
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <div className="about-page-wrapper" style={{ minHeight: '100vh', backgroundColor: '#FDFCFB', color: '#111111' }}>
      {/* Avatar radial menu (same as Work page) */}
      <P5CornerRadialMenu />

      {/* FIXED 3D AVATAR CANVAS CENTERPIECE — pinned to viewport center */}
      <div className="avatar-fixed-overlay">
        <Avatar3DCanvas activeCategory={activeCategory} />
      </div>

      <main>
        <AboutSection
          onHoverCategory={setActiveCategory}
          onLeaveCategory={() => setActiveCategory(null)}
        />
      </main>
      <Footer />
    </div>
  )
}

export default About
