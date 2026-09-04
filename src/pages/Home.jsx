import Header from '../components/Header'
import { Button } from '@/components/ui/button'

function Home() {
  return (
    <div style={{ minHeight: '200vh', backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Header />
      <main style={{ paddingTop: '100px', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Home</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8', maxWidth: '600px' }}>
          Scroll down to test the fixed Header with subtle backdrop blur effect overlaying the page content beneath it.
        </p>
        <div style={{ marginTop: '500px', padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
          <h2>Scrolled Content Area</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>This content passes under the header with a smooth backdrop blur.</p>
        </div>
      </main>
    </div>
  )
}

export default Home
