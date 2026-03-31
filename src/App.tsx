import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MountainDivider from './components/MountainDivider'

// Lazy load components
const Hero = lazy(() => import('./components/Hero'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const SuccessStories = lazy(() => import('./components/SuccessStories'))
const InfluencerDirectory = lazy(() => import('./components/InfluencerDirectory'))
const About = lazy(() => import('./components/About'))
const FAQ = lazy(() => import('./components/FAQ'))
const Footer = lazy(() => import('./components/Footer'))

export type UserType = 'influencer' | 'business';

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

const StickyCTA = ({ userType }: { userType: UserType }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  const link = userType === 'influencer' 
    ? "https://forms.gle/noEwAYMB1KQbmVXi7" 
    : "https://forms.gle/a5MMWkrgXHJ7fuVD7";

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-reveal">
      <a 
        href={link}
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
      >
        <span>{userType === 'influencer' ? 'Join as Influencer' : 'Register Business'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  )
}

function App() {
  const [userType, setUserType] = useState<UserType>('influencer');

  return (
    <div className="min-h-screen bg-white">
      <Navbar userType={userType} setUserType={setUserType} />
      <Suspense fallback={<Loading />}>
        <main>
          <Hero userType={userType} />
          <MountainDivider />
          <div className="py-12 bg-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Flexible <span className="gradient-text">Pricing</span></h2>
                  <p className="text-gray-600 text-lg">
                    {userType === 'influencer' 
                      ? 'Monetize your content with deals ranging from' 
                      : 'Launch impactful campaigns with budgets from'}
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <div className="flex items-baseline justify-center md:justify-end space-x-2">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Starting at</span>
                    <span className="text-5xl font-black text-blue-600 tracking-tighter">Rs. 200</span>
                  </div>
                  <p className="text-gray-500 mt-2 font-medium italic text-sm">Scalable up to Rs. 5,00,000 for mega-campaigns</p>
                </div>
              </div>
            </div>
          </div>
          <HowItWorks userType={userType} />
          <div className="bg-gray-50">
            <SuccessStories />
          </div>
          <InfluencerDirectory />
          <MountainDivider />
          <About />
          <FAQ />
        </main>
        <Footer />
      </Suspense>
      <StickyCTA userType={userType} />
    </div>
  )
}

export default App
