import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AudioProvider } from './context/AudioContext'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import SaathiCaseStudy from './pages/SaathiCaseStudy'
import AgroVisionCaseStudy from './pages/AgroVisionCaseStudy'
import './App.css'

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/saathi" element={<SaathiCaseStudy />} />
          <Route path="/work/agri" element={<AgroVisionCaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  )
}

export default App
