import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-left">
          <div className="about-photo-wrapper">
            <img
              src="/about.jpg"
              alt="Shaivi - UI/UX Designer & Researcher"
              className="about-photo"
            />
          </div>
        </div>
        <div className="about-right">
          <div className="about-text-content">
            <h2 className="about-heading">About me</h2>
            <p className="about-bio">
              A forward-thinking UI/UX Designer blending the principles of spatial design with digital innovation. My expertise lies in user research, detailed information architecture, and leveraging complex user flows and AI to solve modern design challenges. I excel at transforming intricate, multi-layered concepts into engaging, highly accessible interactive experiences.
            </p>
            <Link to="/about" className="about-story-link">
              Read the full story <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
