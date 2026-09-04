import Header from '../components/Header'
import FeaturedWork from '../components/FeaturedWork'
import Footer from '../components/Footer'

function Work() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030a1e', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Header />
        <main style={{ paddingTop: '80px' }}>
          <FeaturedWork />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Work
