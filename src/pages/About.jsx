import Header from '../components/Header'
import AboutSection from '../components/About'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="about-page-wrapper" style={{ minHeight: '100vh', backgroundColor: '#FDFCFB', color: '#111111' }}>
      {/* FIXED AVATAR — rendered at page level, outside any flex/overflow context */}
      <div className="avatar-fixed-overlay">
        <img
          src="/assets/head_3d_clean.png"
          alt="Shaivi 3D Avatar"
          className="avatar-fixed-img"
        />
      </div>

      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

export default About
