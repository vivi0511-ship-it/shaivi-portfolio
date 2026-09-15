import './MarqueeBanner.css'

function MarqueeBanner({ items = [], isPaused = false, className = '' }) {
  if (!items || items.length === 0) return null

  return (
    <div className={`marquee-banner-container ${isPaused ? 'is-marquee-paused' : ''} ${className}`}>
      <div className="marquee-track">
        {/* Render group twice for 100% seamless infinite looping */}
        <div className="marquee-group">
          {items.map((item, index) => {
            const isLink = typeof item === 'object' && item.href
            const text = typeof item === 'object' ? item.label : item
            const href = isLink ? item.href : null

            return (
              <span key={`group1-${index}`} className="marquee-item-wrapper">
                {isLink ? (
                  <a href={href} className="marquee-item is-link">
                    {text}
                  </a>
                ) : (
                  <span className="marquee-item">{text}</span>
                )}
                <span className="terracotta-diamond">◆</span>
              </span>
            )
          })}
        </div>

        <div className="marquee-group" aria-hidden="true">
          {items.map((item, index) => {
            const isLink = typeof item === 'object' && item.href
            const text = typeof item === 'object' ? item.label : item
            const href = isLink ? item.href : null

            return (
              <span key={`group2-${index}`} className="marquee-item-wrapper">
                {isLink ? (
                  <a href={href} className="marquee-item is-link">
                    {text}
                  </a>
                ) : (
                  <span className="marquee-item">{text}</span>
                )}
                <span className="terracotta-diamond">◆</span>
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MarqueeBanner
