import Nav from '../components/Nav'
import { Button } from '@/components/ui/button'

function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030a1e', color: '#ffffff' }}>
      <Nav />
      <main style={{ padding: '3rem 2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Home</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </main>
    </div>
  )
}

export default Home
