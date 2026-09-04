import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Column 1 · Identity */}
        <div className="footer-column">
          <span className="footer-title">Identity</span>
          <h3 className="footer-brand-name">Shaivi</h3>
          <p className="footer-tagline">Design to change.</p>
        </div>

        {/* Column 2 · Contact */}
        <div className="footer-column">
          <span className="footer-title">Contact</span>
          <a href="mailto:shaivilavhe@gmail.com" className="footer-link">
            shaivilavhe@gmail.com
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="footer-link"
          >
            Download CV (PDF)
          </a>
        </div>

        {/* Column 3 · Social */}
        <div className="footer-column">
          <span className="footer-title">Social</span>
          <a
            href="https://www.linkedin.com/in/connectwithshaivi/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://www.behance.net/shaivilavhe11"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Behance ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">&copy; 2026 Shaivi</p>
      </div>
    </footer>
  )
}

export default Footer
