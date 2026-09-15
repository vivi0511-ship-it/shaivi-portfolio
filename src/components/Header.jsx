import { Link } from 'react-router-dom'
import Nav from './Nav'
import TurntablePlayer from './TurntablePlayer'
import P5CornerRadialMenu from './P5CornerRadialMenu'
import { Button } from '@/components/ui/button'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/" className="brand-link">
          shaivi
        </Link>
        <TurntablePlayer width="55px" />
      </div>
      <div className="header-right">
        <Nav />
        <Button asChild className="book-call-btn">
          <a href="mailto:shaivi0511@gmail.com">Book a call</a>
        </Button>
      </div>

      <P5CornerRadialMenu />
    </header>
  )
}

export default Header
