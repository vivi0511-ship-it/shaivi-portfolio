import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TurntablePlayer from '../components/TurntablePlayer'
import MarqueeBanner from '../components/MarqueeBanner'
import Footer from '../components/Footer'
import './SaathiCaseStudy.css'

function SaathiCaseStudy() {
  const navigate = useNavigate()
  const [isImageHovered, setIsImageHovered] = useState(false)

  const contentsNav = [
    { href: '#sec-process', label: '01 Design Process' },
    { href: '#sec-problem', label: '02 Problem Statement' },
    { href: '#sec-comp', label: '03 Competitive Analysis' },
    { href: '#sec-interviews', label: '04 User Interviews' },
    { href: '#sec-insights', label: '05 Questionnaire Insights' },
    { href: '#sec-personas', label: '06 User Personas' },
    { href: '#sec-journey', label: '07 Journey Map' },
    { href: '#sec-stakeholders', label: '08 Stakeholders' },
    { href: '#sec-solution', label: '09 Proposed Solution' },
    { href: '#sec-identity', label: '10 Visual Identity' },
    { href: '#sec-screens', label: '11 High-Fidelity Screens' },
    { href: '#sec-testing', label: '12 User Testing' },
    { href: '#sec-iteration', label: '13 Iteration & Improvements' }
  ]

  return (
    <div className="saathi-page-container">
      {/* Top Floating Navigation Header */}
      <header className="saathi-nav-header">
        <button className="back-work-btn" onClick={() => navigate('/work')}>
          ← Back to Case Studies
        </button>

        <div className="header-right-tools">
          <TurntablePlayer width="50px" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="saathi-hero-section">
        <div className="saathi-hero-left">
          <div className="hero-badge">UX / Product Design Case Study</div>
          <h1 className="saathi-hero-title">
            Saathi
            <br />
            <span className="italic-accent">Navigate Safely</span>
            <br />
            Together.
          </h1>
          <p className="saathi-hero-tagline">
            A women's safety navigation app that replaces anxiety with community-powered confidence — verified safe routes, real-time support, and a network of trusted saathis.
          </p>

          <div className="hero-tags-row">
            <span className="hero-tag">Mobile App Design</span>
            <span className="hero-tag">User Testing</span>
            <span className="hero-tag">User Research</span>
            <span className="hero-tag">Information Architecture</span>
            <span className="hero-tag">Safety Tech</span>
            <span className="hero-tag">Inclusive Design</span>
          </div>
        </div>

        <div
          className="saathi-hero-right"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <img
            src="/assets/saathi_iphone_mockup.png"
            alt="Saathi iPhone App Mockup"
            className="hero-iphone-img"
          />
        </div>
      </section>

      {/* Continuous 20s Right-to-Left Marquee Bar (Pauses when hovering over Hero Image above) */}
      <div className="sticky-marquee-wrapper" style={{ position: 'sticky', top: '70px', zIndex: 90 }}>
        <MarqueeBanner items={contentsNav} isPaused={isImageHovered} />
      </div>

      {/* Main Body Content */}
      <div className="saathi-body-content">
        {/* 01 Methodology - Design Process */}
        <section id="sec-process" className="cs-section">
          <div className="cs-section-label">01 Methodology</div>
          <h2 className="cs-section-title">Design Process</h2>

          <div className="methodology-grid">
            <div className="methodology-card">
              <div className="stage-tag">Stage 01</div>
              <div className="stage-title">Research & Analysis</div>
              <ul className="stage-list">
                <li>• Secondary Research</li>
                <li>• Competitive Audits</li>
                <li>• 27 User Interviews</li>
                <li>• Survey Formulation</li>
                <li>• Stakeholder Mapping</li>
              </ul>
            </div>

            <div className="methodology-card">
              <div className="stage-tag">Stage 02</div>
              <div className="stage-title">Ideation & Strategy</div>
              <ul className="stage-list">
                <li>• User Persona Synthesis</li>
                <li>• User Journey Mapping</li>
                <li>• Feature Priority IA</li>
                <li>• Task Metric Scenarios</li>
              </ul>
            </div>

            <div className="methodology-card">
              <div className="stage-tag">Stage 03</div>
              <div className="stage-title">Visual Design</div>
              <ul className="stage-list">
                <li>• Brand Pin Philosophy</li>
                <li>• Typography Specimen</li>
                <li>• Color Swatch Systems</li>
                <li>• Interface Mockups</li>
              </ul>
            </div>

            <div className="methodology-card">
              <div className="stage-tag">Stage 04</div>
              <div className="stage-title">Testing & Refinement</div>
              <ul className="stage-list">
                <li>• 8 User Moderated Tests</li>
                <li>• Discoverability Audits</li>
                <li>• Elderly Simplified Mode</li>
                <li>• Multilingual Framework</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 02 Problem Statement */}
        <section id="sec-problem" className="cs-section">
          <div className="cs-section-label">02 Problem Statement</div>
          <h2 className="cs-section-title">Maps show the fastest route. Not the safest one.</h2>

          <div className="problem-box">
            <p>
              Existing navigation tools efficiently map routes but overlook the nuanced safety concerns of women — frequently directing solo travelers into poorly lit or isolated areas. This lack of situational awareness causes significant anxiety and can lead to genuinely dangerous encounters in unfamiliar territory.
            </p>

            <blockquote className="quote-block">
              "When women walk through Indian cities, they aren't just moving from point A to B — they're navigating stares, dimly lit streets, empty metro stations, and the constant calculus of risk."
              <footer className="quote-author">— Outlook Traveller</footer>
            </blockquote>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">91%</div>
              <div className="stat-desc">of women in India feel public transport is unsafe</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">38%</div>
              <div className="stat-desc">of urban women faced harassment in public spaces in 2024</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">29%</div>
              <div className="stat-desc">faced harassment on public transport far exceeding recorded cases</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">7%</div>
              <div className="stat-desc">felt safe in their own neighborhoods</div>
            </div>
          </div>
        </section>

        {/* 03 Secondary Research - Competitive Analysis */}
        <section id="sec-comp" className="cs-section">
          <div className="cs-section-label">03 Secondary Research</div>
          <h2 className="cs-section-title">Learning from existing solutions</h2>

          <div className="comp-grid">
            <div className="comp-card">
              <div className="comp-header">⚡ Epowar</div>
              <ul className="stage-list">
                <li>• Biometric monitoring via Apple Watch / Wear OS</li>
                <li>• Low battery alerts to emergency contacts</li>
                <li>• Auto arrival confirmation ("Arrived Safe")</li>
                <li>• Cloud evidence streaming (GPS + audio during incidents)</li>
              </ul>
            </div>

            <div className="comp-card">
              <div className="comp-header">🚩 Safecity (Red Dot Foundation)</div>
              <ul className="stage-list">
                <li>• Anonymous crowdsourced harassment reporting</li>
                <li>• Interactive incident heatmaps by location</li>
                <li>• Safety trend analysis by time, type, and area</li>
                <li>• Open data access for citizens & local authorities</li>
              </ul>
            </div>

            <div className="comp-card">
              <div className="comp-header">📍 Safetypin</div>
              <ul className="stage-list">
                <li>• 9-parameter safety audit (lighting, visibility, openness)</li>
                <li>• Neighborhood safety scores for travel planning</li>
                <li>• Safest route navigation security over speed</li>
                <li>• Gender Diversity Index measuring women's presence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 04 Primary Research - User Interviews */}
        <section id="sec-interviews" className="cs-section">
          <div className="cs-section-label">04 Primary Research</div>
          <h2 className="cs-section-title">27 women. Three distinct safety profiles.</h2>

          <div className="methodology-grid">
            <div className="methodology-card">
              <div className="stage-tag">Young Adults (18–35)</div>
              <ul className="stage-list">
                <li>• Rely on Google Maps + safety apps; fear battery death & network loss</li>
                <li>• Share live location; carry pepper spray</li>
                <li>• Use scarves for anonymity and sense of protection</li>
                <li>• Paranoid about ride share route deviations</li>
              </ul>
            </div>

            <div className="methodology-card">
              <div className="stage-tag">Middle Aged (35–60)</div>
              <ul className="stage-list">
                <li>• Prefer vehicle-based GPS; favor manual text updates over live sharing</li>
                <li>• Prioritise contacting local friends when traveling alone</li>
                <li>• Seek hard info: hotel addresses, police station proximity</li>
                <li>• Consciously choose longer, well-lit, populated paths</li>
              </ul>
            </div>

            <div className="methodology-card">
              <div className="stage-tag">Elderly (60+)</div>
              <ul className="stage-list">
                <li>• Tech averse; rarely use smartphones for navigation</li>
                <li>• Navigate by asking locals; stay near trusted individuals</li>
                <li>• Actively minimise walking distance; avoid unfamiliar terrain</li>
                <li>• Significant difficulty with stairs, slopes, or uneven pavement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 05 Questionnaire Insights */}
        <section id="sec-insights" className="cs-section">
          <div className="cs-section-label">05 Questionnaire Insights</div>
          <h2 className="cs-section-title">The data speaks clearly</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">73.8%</div>
              <div className="stat-desc">want real-time location sharing as their most-valued feature</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">60.7%</div>
              <div className="stat-desc">want a safe route planner that avoids high risk areas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">68.4%</div>
              <div className="stat-desc">avoid late night travel as their primary safety practice</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">82%</div>
              <div className="stat-desc">want automatic last known location sent when battery drops below 5%</div>
            </div>
          </div>
        </section>

        {/* 06 User Personas */}
        <section id="sec-personas" className="cs-section">
          <div className="cs-section-label">06 User Personas</div>
          <h2 className="cs-section-title">Two women, two realities</h2>

          <div className="persona-grid">
            <div className="persona-card">
              <h3 className="persona-name">Zoya Malik</h3>
              <div className="persona-role">Freelance Graphic Designer, 26 — Visiting Nagpur</div>
              <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'rgba(246, 237, 255, 0.85)' }}>
                <strong>Context:</strong> Arrives at Nagpur Railway Station late at night, battery at 7%, needs an auto across the city. Station exit is crowded; signage is confusing. She grips her pepper spray, terrified her phone will die mid-ride.
              </p>
            </div>

            <div className="persona-card">
              <h3 className="persona-name">Dr. Sunita Deshmukh</h3>
              <div className="persona-role">Senior Healthcare Consultant, 48 — Business Traveler</div>
              <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'rgba(246, 237, 255, 0.85)' }}>
                <strong>Context:</strong> Checks out of her hotel at 8:30 PM with a 2-hour wait before a delayed flight. Doesn't want to wait in a male-dominated transit hub. Finds it mentally draining to manually check each space for safety cues, CCTV, and women's presence.
              </p>
            </div>
          </div>
        </section>

        {/* 09 Proposed Solution */}
        <section id="sec-solution" className="cs-section">
          <div className="cs-section-label">09 Proposed Solution — Feature Set</div>
          <h2 className="cs-section-title">Seven features. One community safety net.</h2>

          <div className="features-grid">
            <div className="feature-item-card">
              <h3 className="feature-title">1. Intelligence-Driven Routing</h3>
              <p className="feature-text">Safest Path engine using real-time lighting, crowd density, and historical safety scores.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">2. Verified Safe Havens</h3>
              <p className="feature-text">Interactive map of community-verified locations (tailors, pharmacies) where women can seek refuge.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">3. Incident Heatmaps</h3>
              <p className="feature-text">Dynamic visualisations of crowdsourced and official incident data for hyper-local situational awareness.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">4. Offline Functionality</h3>
              <p className="feature-text">Maintains access to maps and emergency protocols even during network failures.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">5. Voice-Activated SOS</h3>
              <p className="feature-text">Hands-free, discreet emergency trigger during high-stress situations.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">6. Safe-Check Automations</h3>
              <p className="feature-text">Automatic check-ins and live location sharing keeping social circles informed without manual effort.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">7. Saathi Companion</h3>
              <p className="feature-text">Secure, verified matching system to find a travel companion for high-risk solo transit.</p>
            </div>
          </div>
        </section>

        {/* 10 Visual Identity */}
        <section id="sec-identity" className="cs-section">
          <div className="cs-section-label">10 Visual Identity</div>
          <h2 className="cs-section-title">A brand that protects and connects</h2>

          <div className="problem-box">
            <h3 style={{ margin: '0 0 12px 0', color: '#ffffff' }}>Logo Philosophy</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              The Saathi logo integrates a traditional location pin with two interlocking hands symbolising a GPS tool rooted in community support and human connection. Its fluid, enveloping design suggests a protective shield.
            </p>

            <h4 style={{ margin: '20px 0 8px 0', color: '#e1c3ff' }}>Color Palette Swatches:</h4>
            <div className="color-swatches-row">
              <div className="swatch-box" style={{ background: '#362061' }}>#362061</div>
              <div className="swatch-box" style={{ background: '#6B4DD1' }}>#6B4DD1</div>
              <div className="swatch-box" style={{ background: '#E1C3FF', color: '#201040' }}>#E1C3FF</div>
              <div className="swatch-box" style={{ background: '#F6EDFF', color: '#201040' }}>#F6EDFF</div>
            </div>
          </div>
        </section>

        {/* 13 Iteration & Improvements */}
        <section id="sec-iteration" className="cs-section">
          <div className="cs-section-label">13 Iteration & Improvements</div>
          <h2 className="cs-section-title">Four changes. Grounded in evidence.</h2>

          <div className="features-grid">
            <div className="feature-item-card">
              <h3 className="feature-title">01. Onboarding Flow</h3>
              <p className="feature-text">Sequential introduction screens now define Safety Scores, Safe Spaces, and the Saathi Finder before users enter the main interface.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">02. Simplified Mode</h3>
              <p className="feature-text">A dedicated toggle for elderly users with extra large buttons, high contrast colours, and streamlined navigation paths.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">03. Redesigned Icons</h3>
              <p className="feature-text">Location Share and Saathi Profile icons replaced with universally recognisable symbols.</p>
            </div>

            <div className="feature-item-card">
              <h3 className="feature-title">04. Multilingual Support</h3>
              <p className="feature-text">Multiple language options added to make Saathi accessible across age groups and regions throughout India.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default SaathiCaseStudy
