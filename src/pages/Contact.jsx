import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from '@/components/ui/button'

function Contact() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030a1e', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Header />
        <main style={{ paddingTop: '120px', paddingLeft: '2.5rem', paddingRight: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '1rem' }}>Contact</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Let's collaborate on spatial interfaces, interaction design, or digital products.
          </p>
          <Button asChild className="book-call-btn">
            <a href="mailto:shaivilavhe@gmail.com">Send an email &rarr;</a>
          </Button>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
