import { Link } from 'react-router-dom'
import Nav from './Nav'
import { Button } from '@/components/ui/button'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-left">
        <Link to="/" className="brand-link">
          shaivi
        </Link>
      </div>
      <div className="header-right">
        <Nav />
        <Button asChild className="book-call-btn">
          <a href="mailto:shaivi0511@gmail.com">Book a call</a>
        </Button>
      </div>
    </header>
  )
}

export default Header
