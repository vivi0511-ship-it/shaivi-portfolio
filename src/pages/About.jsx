import Nav from '../components/Nav'

function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Nav />
      <main style={{ padding: '3rem 2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '0.05em' }}>About</h1>
      </main>
    </div>
  )
}

export default About
