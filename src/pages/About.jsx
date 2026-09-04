import Header from '../components/Header'
import AboutSection from '../components/About'
import Footer from '../components/Footer'

function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030a1e', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Header />
        <main style={{ paddingTop: '80px' }}>
          <AboutSection />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default About
