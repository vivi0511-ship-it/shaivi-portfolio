import Header from '../components/Header'
import Hero from '../components/Hero'
import FeaturedWork from '../components/FeaturedWork'
import About from '../components/About'
import Footer from '../components/Footer'

function Home() {
  return (
    <div style={{ backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Header />
      <Hero />
      <FeaturedWork />
      <About />
      <Footer />
    </div>
  )
}

export default Home
