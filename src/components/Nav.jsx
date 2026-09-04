import { NavLink } from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <header className="nav-header">
      <div className="nav-brand">SHAIVI.DESIGN</div>
      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/work"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Work
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  )
}

export default Nav
