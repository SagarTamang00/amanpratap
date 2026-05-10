import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'

import Hero from './pages/Hero'
import Awards from './pages/Award'
import Project from './pages/Project'
import About from './pages/About'
import Academic from './pages/Academic'
import Footer from './components/Footer'
import News from './pages/News'
import Contact from './pages/Contact'

const Home = () => {
  return (
    <>
      <Hero />
      <Awards />
      <Project />
      <Footer />
    </>
  )
}

const AboutPage = () => {
  return (
    <>
      <About />
      <Academic />
    </>
  )
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} /> 
        </Routes>
      </main>
    </>
  )
}

export default App