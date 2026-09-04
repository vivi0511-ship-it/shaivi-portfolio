import Header from '../components/Header'
import FeaturedWork from '../components/FeaturedWork'

function Work() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <FeaturedWork />
      </main>
    </div>
  )
}

export default Work
