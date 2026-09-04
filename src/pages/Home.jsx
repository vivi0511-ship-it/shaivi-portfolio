import Header from '../components/Header'
import Hero from '../components/Hero'
import FeaturedWork from '../components/FeaturedWork'
import About from '../components/About'

function Home() {
  return (
    <div style={{ backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Header />
      <Hero />
      <FeaturedWork />
      <About />
    </div>
  )
}

export default Home
