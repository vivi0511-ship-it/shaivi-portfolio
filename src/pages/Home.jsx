import Header from '../components/Header'
import Hero from '../components/Hero'
import FeaturedWork from '../components/FeaturedWork'

function Home() {
  return (
    <div style={{ backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Header />
      <Hero />
      <FeaturedWork />
    </div>
  )
}

export default Home
