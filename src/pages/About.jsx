import Header from '../components/Header'
import AboutSection from '../components/About'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="about-page-wrapper" style={{ minHeight: '100vh', backgroundColor: '#FDFCFB', color: '#111111', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Header />
        <main>
          <AboutSection />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default About
