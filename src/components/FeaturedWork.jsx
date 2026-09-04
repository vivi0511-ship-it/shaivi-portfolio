import { Link } from 'react-router-dom'
import './FeaturedWork.css'

const projects = [
  {
    id: '01',
    title: 'Saathi womens safety app',
    description: 'Womens safety app which prioratizes safety over efficiency.',
    image: '/work/01.jpg',
    link: '/work',
  },
  {
    id: '02',
    title: 'Agriculture dashboard',
    description: 'Agriuclture monitering dashboard for the agriculture department which helps to asily understand data',
    image: '/work/02.jpg',
    link: '/work',
  },
  {
    id: '03',
    title: 'Heuristic annalysis and redesign and user testing of goodreads',
    description: 'heuristic analysis of goodreads, then redisigning it nad conductinfg user testing.',
    image: '/work/03.jpg',
    link: '/work',
  },
]

function FeaturedWork() {
  return (
    <section className="featured-work-section">
      <div className="featured-work-container">
        <h2 className="section-title">Selected work</h2>
        <div className="work-grid">
          {projects.map((project) => (
            <Link key={project.id} to={project.link} className="work-card">
              <div className="card-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
