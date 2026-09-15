import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TurntablePlayer from '../components/TurntablePlayer'
import MarqueeBanner from '../components/MarqueeBanner'
import Footer from '../components/Footer'
import './AgroVisionCaseStudy.css'

function AgroVisionCaseStudy() {
  const navigate = useNavigate()
  const [isImageHovered, setIsImageHovered] = useState(false)

  const contentsNav = [
    { href: '#sec-overview', label: '01 Overview' },
    { href: '#sec-problem', label: '02 Problem Statement' },
    { href: '#sec-research', label: '03 Primary Research' },
    { href: '#sec-survey', label: '04 Survey Insights' },
    { href: '#sec-comp', label: '05 Competitive Analysis' },
    { href: '#sec-persona', label: '06 User Research' },
    { href: '#sec-journey', label: '07 Journey Map' },
    { href: '#sec-identity', label: '08 Visual Identity' },
    { href: '#sec-screens', label: '09 Final Screens' }
  ]

  return (
    <div className="agri-page-container">
      {/* Top Floating Navigation Header */}
      <header className="agri-nav-header">
        <button className="back-work-btn-green" onClick={() => navigate('/work')}>
          ← Back to Case Studies
        </button>

        <div className="header-right-tools">
          <TurntablePlayer width="50px" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="agri-hero-section">
        <div className="agri-hero-left">
          <div className="hero-badge-green">AGRICULTURE DASHBOARD</div>
          <h1 className="agri-hero-title">
            Unified
            <br />
            Data &
            <br />
            <span className="lime-accent">Monitoring</span>
            <br />
            System
          </h1>
          <p className="agri-hero-tagline">
            A role-based agricultural intelligence dashboard designed to centralize crop health, pest alerts, weather data, and field analytics — replacing scattered tools with one coherent interface.
          </p>

          <div className="hero-tags-row">
            <span className="hero-tag-green">UI/UX Design</span>
            <span className="hero-tag-green">Web Design</span>
            <span className="hero-tag-green">User Research</span>
            <span className="hero-tag-green">Information Architecture</span>
          </div>
        </div>

        <div
          className="agri-hero-right"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <img
            src="/assets/agri_dashboard_mockup.png"
            alt="AgroVision Dashboard Mockup"
            className="hero-dashboard-img"
          />
        </div>
      </section>

      {/* Sticky Table of Contents Marquee Bar */}
      <div className="agri-contents-bar" style={{ position: 'sticky', top: '70px', zIndex: 90 }}>
        <MarqueeBanner items={contentsNav} isPaused={isImageHovered} />
      </div>

      {/* Main Body Content */}
      <div className="agri-body-content">
        {/* 01 Project Overview */}
        <section id="sec-overview" className="agri-cs-section">
          <div className="agri-section-label">01 Project Overview</div>
          <h2 className="agri-section-title">Why AgroVision?</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.65', color: 'rgba(206, 228, 216, 0.88)', marginBottom: '32px' }}>
            Agricultural data is siloed across phone calls, spreadsheets, government portals, and manual reports. Officers spend more time hunting information than acting on it.
          </p>

          <div className="agri-overview-grid">
            <div className="agri-metric-card">
              <div className="agri-metric-num">10</div>
              <div className="agri-metric-title">Departments</div>
              <div className="agri-metric-desc">Plant Breeding, Entomology, Pathology, Horticulture, Agronomy and more — each managing data in isolation.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">6+</div>
              <div className="agri-metric-title">User Roles</div>
              <div className="agri-metric-desc">Officers, Professors, Co-ops, Scientists, Assistants, Researchers — each needing different data access levels.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">1</div>
              <div className="agri-metric-title">Unified Interface</div>
              <div className="agri-metric-desc">One CRUD-based, role-aware dashboard replacing scattered tools with clear, actionable intelligence.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">50%</div>
              <div className="agri-metric-title">Want Pest Alerts</div>
              <div className="agri-metric-desc">Survey-backed priority: pest and disease monitoring ranked as the single most-needed dashboard feature.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">45%</div>
              <div className="agri-metric-title">Real-time Gap</div>
              <div className="agri-metric-desc">Nearly half of surveyed users said data is not updated in real time — the most critical pain point identified.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">3</div>
              <div className="agri-metric-title">Case Studies</div>
              <div className="agri-metric-desc">MyAgriGuru, AGRIVI 360, and Agtuall benchmarked to inform design patterns and feature priorities.</div>
            </div>
          </div>
        </section>

        {/* 02 Problem Statement */}
        <section id="sec-problem" className="agri-cs-section">
          <div className="agri-section-label">02 Problem Statement</div>
          <h2 className="agri-section-title">The Fragmentation Problem</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.65', color: 'rgba(206, 228, 216, 0.88)', marginBottom: '28px' }}>
            Agricultural officers and researchers face a system that wasn't designed to help them — only to record data.
          </p>

          <div className="agri-overview-grid">
            <div className="agri-metric-card">
              <div className="agri-metric-title">📊 Scattered Data</div>
              <div className="agri-metric-desc">Information spread across phone calls, paper registers, Excel sheets, and government portals with no single source of truth.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-title">⏱️ Reactive, Not Proactive</div>
              <div className="agri-metric-desc">Pest and disease alerts arrive through manual reports — by the time action is taken, crop damage has already begun.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-title">🔗 No Correlation View</div>
              <div className="agri-metric-desc">Weather, soil, crop, and pest data live in separate systems — impossible to see relationships that enable smarter decisions.</div>
            </div>
          </div>
        </section>

        {/* 03 Primary Research */}
        <section id="sec-research" className="agri-cs-section">
          <div className="agri-section-label">03 Primary Research</div>
          <h2 className="agri-section-title">What We Heard in the Field</h2>
          <div className="agri-problem-box">
            <p style={{ fontSize: '14.5px', lineHeight: '1.7', color: 'rgba(206, 228, 216, 0.9)' }}>
              Interviews with an active Agriculture Officer informed the real-world structure, complaint flow, and daily workflows our design needed to support.
            </p>
            <ul style={{ lineHeight: '1.8', fontSize: '13.5px', color: '#cee4d8', marginTop: '16px' }}>
              <li>• The team had insider access: one member's father is a working Agriculture Officer, giving us authentic process knowledge that surveys alone couldn't surface.</li>
              <li>• We mapped the full farmer complaint redressal flow: Agriculture Assistant → Mandal Officer → Taluka Officer → University Scientist → Agriculture Minister. Each handoff is a potential point of data loss.</li>
              <li>• Officers currently rely on Crop-SAP (Crop Pest Surveillance and Advisory Project) mobile app to send advisories, but it doesn't help with centralized data analysis.</li>
            </ul>
          </div>
        </section>

        {/* 04 Survey Insights */}
        <section id="sec-survey" className="agri-cs-section">
          <div className="agri-section-label">04 Survey Insights</div>
          <h2 className="agri-section-title">Data-Backed Priorities</h2>

          <div className="agri-overview-grid">
            <div className="agri-metric-card">
              <div className="agri-metric-num">50%</div>
              <div className="agri-metric-title">Pest Outbreaks & Disease Alerts</div>
              <div className="agri-metric-desc">Top monitored metric alongside weather warnings.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">45%</div>
              <div className="agri-metric-title">Data Not Updated in Real Time</div>
              <div className="agri-metric-desc">Primary daily challenge faced by field officers.</div>
            </div>

            <div className="agri-metric-card">
              <div className="agri-metric-num">25%</div>
              <div className="agri-metric-title">Information Overload</div>
              <div className="agri-metric-desc">Too much scattered information without clear context.</div>
            </div>
          </div>
        </section>

        {/* 05 Competitive Analysis */}
        <section id="sec-comp" className="agri-cs-section">
          <div className="agri-section-label">05 Competitive Analysis</div>
          <h2 className="agri-section-title">Learning from Existing Solutions</h2>

          <div className="agri-comp-grid">
            <div className="agri-comp-card">
              <h3 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 14px 0' }}>MyAgriGuru</h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(206, 228, 216, 0.85)', paddingLeft: '16px' }}>
                <li>• Integrates weather, pest, and market data in one place</li>
                <li>• Localized real-time info in Hindi and English</li>
                <li>• Community-based knowledge sharing</li>
                <li><strong>Takeaway:</strong> Combine diverse agri insights, use clean visuals, enable collaboration.</li>
              </ul>
            </div>

            <div className="agri-comp-card">
              <h3 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 14px 0' }}>AGRIVI 360</h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(206, 228, 216, 0.85)', paddingLeft: '16px' }}>
                <li>• Centralized data monitoring for enterprise farms</li>
                <li>• Automation and real-time crop analytics</li>
                <li>• Data-driven decisions for better yield</li>
                <li><strong>Takeaway:</strong> Multi data-point dashboard, visual insights, real-time updates for fast field decisions.</li>
              </ul>
            </div>

            <div className="agri-comp-card">
              <h3 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 14px 0' }}>Agtuall</h3>
              <ul style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(206, 228, 216, 0.85)', paddingLeft: '16px' }}>
                <li>• Built with Syngenta Foundation for Madhya Pradesh</li>
                <li>• Climate risk assessment and crop monitoring</li>
                <li>• Multi-level access: farmers, NGOs, institutions</li>
                <li><strong>Takeaway:</strong> Location-based maps, climate risk tools, multi-persona design with impact tracking.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 06 User Research Persona */}
        <section id="sec-persona" className="agri-cs-section">
          <div className="agri-section-label">06 User Research</div>
          <h2 className="agri-section-title">Who We're Designing For</h2>

          <div className="agri-persona-box">
            <h3 style={{ fontSize: '24px', color: '#ffffff', margin: '0 0 6px 0' }}>Rajesh Kumar</h3>
            <div style={{ fontSize: '13px', color: '#acdc54', marginBottom: '20px' }}>Regional Agricultural Officer, GreenHarvest Co-op | Age 42</div>

            <div className="agri-overview-grid">
              <div>
                <strong style={{ color: '#ffffff' }}>Tech:</strong> Moderate (uses Crop-SAP, Excel)
                <br /><br />
                <strong style={{ color: '#ffffff' }}>Goal:</strong> Proactive pest management, real-time field data, simple tools.
              </div>

              <div>
                <strong style={{ color: '#ffffff' }}>Pain:</strong> Fragmented reports, reactive workflows, no centralized view.
                <br /><br />
                <strong style={{ color: '#ffffff' }}>Feels:</strong> Responsible for farmer livelihoods, pressured by inaccurate forecasts.
              </div>
            </div>
          </div>
        </section>

        {/* 08 Visual Identity */}
        <section id="sec-identity" className="agri-cs-section">
          <div className="agri-section-label">08 Visual Identity</div>
          <h2 className="agri-section-title">Design Language</h2>

          <div className="agri-problem-box">
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              The visual system is grounded in the land — deep greens, luminous lime, and soft mint create a palette that feels both technical and alive.
            </p>

            <h4 style={{ margin: '20px 0 8px 0', color: '#acdc54' }}>Color Palette Swatches:</h4>
            <div className="agri-swatches-row">
              <div className="agri-swatch-box" style={{ background: '#000000' }}>#000000</div>
              <div className="agri-swatch-box" style={{ background: '#032314' }}>#032314</div>
              <div className="agri-swatch-box" style={{ background: '#ACDC54', color: '#032314' }}>#ACDC54</div>
              <div className="agri-swatch-box" style={{ background: '#CEE4D8', color: '#032314' }}>#CEE4D8</div>
              <div className="agri-swatch-box" style={{ background: '#FFFFFF', color: '#032314' }}>#FFFFFF</div>
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="agri-cs-section">
          <div className="agri-section-label">The Team</div>
          <h2 className="agri-section-title">Designed with purpose, built on real insight.</h2>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar-circle">SL</div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>Shaivi Lavhe</div>
                <div style={{ fontSize: '12px', color: '#acdc54' }}>UX Research · Wireframing</div>
              </div>
            </div>

            <div className="team-card">
              <div className="team-avatar-circle">AB</div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>Arnavi Bhagat</div>
                <div style={{ fontSize: '12px', color: '#acdc54' }}>Visual Design · Wireframing</div>
              </div>
            </div>

            <div className="team-card">
              <div className="team-avatar-circle">RM</div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '700' }}>Rachel Mishra</div>
                <div style={{ fontSize: '12px', color: '#acdc54' }}>Information Architecture · Prototyping</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default AgroVisionCaseStudy
