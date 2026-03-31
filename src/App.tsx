import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MountainDivider from './components/MountainDivider'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const SuccessStories = lazy(() => import('./components/SuccessStories'))
const About = lazy(() => import('./components/About'))
const FAQ = lazy(() => import('./components/FAQ'))
const Footer = lazy(() => import('./components/Footer'))

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

const StickyCTA = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-reveal">
      <a 
        href="https://forms.gle/noEwAYMB1KQbmVXi7" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
      >
        <span>Join Now</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <main>
          <Hero />
          <MountainDivider />
          <HowItWorks />
          <div className="bg-gray-50">
            <SuccessStories />
          </div>
          <MountainDivider />
          <About />
          <FAQ />
        </main>
        <Footer />
      </Suspense>
      <StickyCTA />
    </div>
  )
}

export default App
