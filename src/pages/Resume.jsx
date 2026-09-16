import React, { useState } from 'react'
import TurntablePlayer from '../components/TurntablePlayer'
import P5CornerRadialMenu from '../components/P5CornerRadialMenu'
import './Resume.css'

export default function Resume() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="resume-page-wrapper">
      {/* Background Texture & Paper Overlay */}
      <div className="resume-bg-overlay" />
      <div className="resume-paper-texture" />

      {/* Top Left Corner Floating Turntable Music Player */}
      <div className="resume-turntable-fixed">
        <TurntablePlayer width="95px" />
      </div>

      {/* Top Center Floating 3D Avatar Metallic Head */}
      <div className="resume-floating-avatar-head">
        <img
          src="/assets/head_3d_trans.png"
          alt="3D Metallic Avatar Head"
          className="avatar-head-img"
        />
      </div>

      {/* Top Right Corner P5 Radial Menu */}
      <P5CornerRadialMenu />

      {/* Main Resume Canvas Container */}
      <main className="resume-container">
        <div className="resume-grid">
          
          {/* ================= LEFT COLUMN: PROFILE & BIO ================= */}
          <div className="resume-left-col">
            {/* Cutout & Inflatable 3D Pink Star Balloon Stage */}
            <div className="profile-stage">
              {/* Inflatable glossy 3D pink star balloon */}
              <div className="star-balloon-wrapper">
                <img
                  src="/assets/pink_star_balloon.png"
                  alt="Inflatable Pink Star Balloon"
                  className="star-balloon-img"
                />
              </div>

              {/* High-resolution Cutout of Shaivi wearing glasses, NYC shirt, peace sign */}
              <div className="shaivi-cutout-wrapper">
                <img
                  src="/assets/shaivi_cutout.png"
                  alt="Shaivi Lavhe"
                  className="shaivi-cutout-photo"
                  onError={(e) => {
                    // Fallback to upper body or original photo if cutout is loading
                    e.target.src = '/assets/shaivi_upper_body.png'
                  }}
                />
              </div>
            </div>

            {/* Headline, Title & About Me Section */}
            <div className="bio-content">
              <h1 className="resume-headline">It's Shaivi Lavhe!</h1>
              <h2 className="resume-role-title">UI/UX Designer</h2>

              <div className="about-me-section">
                <h3 className="about-me-heading">About me</h3>
                <p className="about-me-paragraph">
                  A forward-thinking UI/UX Designer blending the principles of spatial design with digital innovation. My expertise lies in user research, detailed information architecture, and leveraging complex user flows and AI to solve modern design challenges. I excel at transforming intricate, multi-layered concepts into engaging, highly accessible interactive experiences.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE SCRAPBOOK BENTO ================= */}
          <div className="resume-right-col">
            
            {/* 1. TOOLS OYSTER SHELL */}
            <div
              className={`scrapbook-item tools-shell-card ${hoveredCard === 'tools' ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard('tools')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="clamshell-container">
                {/* 3D Pearlescent Open Clamshell Image */}
                <img
                  src="/assets/clamshell_3d.png"
                  alt="3D Pearlescent Clamshell"
                  className="clamshell-3d-img"
                />

                {/* Content nested inside clamshell */}
                <div className="clamshell-inner-content">
                  <span className="tools-title-text">Tools</span>

                  <div className="tools-badges-grid">
                    {/* Top Row: Orange Starburst, Illustrator (Ai), Unity */}
                    <div className="tools-row top-row">
                      <div className="tool-badge badge-starburst" title="Creative Design">
                        <div className="starburst-icon">★</div>
                      </div>
                      <div className="tool-badge badge-ai" title="Adobe Illustrator">
                        <span className="badge-text">Ai</span>
                      </div>
                      <div className="tool-badge badge-unity" title="Unity 3D">
                        <div className="unity-cube-icon">
                          <span className="unity-logo-symbol">❖</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: After Effects (Ae), Figma, Photoshop (Ps) */}
                    <div className="tools-row bottom-row">
                      <div className="tool-badge badge-ae" title="Adobe After Effects">
                        <span className="badge-text">Ae</span>
                      </div>
                      <div className="tool-badge badge-figma" title="Figma">
                        <svg className="figma-svg-logo" viewBox="0 0 38 57" fill="none">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                        </svg>
                      </div>
                      <div className="tool-badge badge-ps" title="Adobe Photoshop">
                        <span className="badge-text">Ps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SKILLS NOTEPAD SHEET */}
            <div
              className={`scrapbook-item skills-notepad-card ${hoveredCard === 'skills' ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard('skills')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Pink Translucent Washi Tape at Top-Left */}
              <div className="washi-tape-pink" />

              {/* Lined Notebook Paper Edge & Pattern */}
              <div className="notepad-spiral-holes">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="spiral-hole" />
                ))}
              </div>

              {/* Notepad Heading */}
              <h3 className="notepad-title">Skills</h3>

              {/* Bulleted List of Skills */}
              <ul className="skills-list">
                <li><span className="pink-bullet">•</span> User Experience (UX) Design</li>
                <li><span className="pink-bullet">•</span> User Interface (UI) Design</li>
                <li><span className="pink-bullet">•</span> Information Architecture (IA)</li>
                <li><span className="pink-bullet">•</span> User Flows & Wireframing</li>
                <li><span className="pink-bullet">•</span> Interaction Design</li>
                <li><span className="pink-bullet">•</span> User Research & Persona Building</li>
                <li><span className="pink-bullet">•</span> Usability Testing</li>
              </ul>

              {/* Decorative Y2K Miniature Accessories */}
              {/* Toy Bear at Bottom-Left */}
              <img
                src="/assets/toy_bear_3d.png"
                alt="Miniature Y2K Bear Toy"
                className="y2k-bear-accessory"
              />

              {/* Glossy Heart & Flower Button Accessories at Bottom-Right */}
              <div className="y2k-buttons-group">
                <div className="y2k-glossy-heart" title="Y2K Heart Badge">
                  <div className="heart-shine" />
                </div>
                <div className="y2k-flower-button" title="Flower Button">
                  <div className="button-holes">
                    <span className="hole" />
                    <span className="hole" />
                    <span className="hole" />
                    <span className="hole" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. EDUCATION LANYARD BADGE & LANGUAGES STARBURST */}
            <div className="education-and-languages-group">
              
              {/* Education Lanyard Card */}
              <div
                className={`scrapbook-item education-lanyard-card ${hoveredCard === 'edu' ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard('edu')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Lanyard Fabric Strap from Top Right */}
                <div className="lanyard-strap-ribbon" />
                <div className="lanyard-clip-metal" />

                {/* Translucent Glossy ID Card Holder */}
                <div className="id-card-body">
                  <h3 className="education-card-title">Education</h3>

                  <div className="edu-entry">
                    <h4 className="school-name">Sandipani School</h4>
                    <p className="school-details">2009–2021 | Nagpur</p>
                  </div>

                  <div className="edu-entry">
                    <h4 className="school-name">Symbiosis Institute Of Design</h4>
                    <p className="school-details">2021–2025 | Nagpur</p>
                  </div>
                </div>
              </div>

              {/* Languages Spiky Starburst Sticker */}
              <div
                className={`scrapbook-item languages-starburst-card ${hoveredCard === 'lang' ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard('lang')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="starburst-sticker-body">
                  <h3 className="starburst-title">Languages</h3>
                  <ul className="languages-list">
                    <li>English</li>
                    <li>Hindi</li>
                    <li>Marathi</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* ================= BOTTOM ANGLED CONTACT RIBBON BANNER ================= */}
      <div className="contact-ribbon-wrapper">
        <div className="contact-ribbon-banner">
          <div className="ribbon-content">
            <span className="contact-label">Contact me:</span>

            <a
              href="mailto:shaivilavhe@gmail.com"
              className="ribbon-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>shaivilavhe@gmail.com</span>
            </a>

            <a
              href="https://www.linkedin.com/in/connectwithshaivi"
              className="ribbon-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
              </svg>
              <span>www.linkedin.com/in/connectwithshaivi</span>
            </a>

            <a
              href="https://shaivi-portfolio.vercel.app/"
              className="ribbon-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="ribbon-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>https://shaivi-portfolio.vercel.app/</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
