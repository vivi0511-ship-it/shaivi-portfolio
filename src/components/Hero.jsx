import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <span className="hero-badge">PORTFOLIO</span>
          <h1 className="hero-headline">
            UI/UX Designer &amp; Researcher.
          </h1>
          <p className="hero-subhead">
            Focused on multi-platform experiences, interaction architecture, and spatial computing interfaces.
          </p>
          <Button asChild className="hero-cta">
            <Link to="/work">See selected work &rarr;</Link>
          </Button>
        </div>
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img
              src="/hero.jpg"
              alt="Shaivi - UI/UX Designer & Researcher"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
