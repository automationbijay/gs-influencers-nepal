import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
const InfluencerPage = lazy(() => import('./pages/InfluencerPage'))
const InfluencerDetail = lazy(() => import('./pages/InfluencerDetail'))

export type UserType = 'influencer' | 'business';

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
)

const Home = ({ userType }: { userType: UserType }) => {
  return (
    <>
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
                <span className="text-5xl font-black text-blue-600 tracking-tighter">Rs. 500</span>
              </div>
              <p className="text-gray-500 mt-2 font-medium italic text-sm">Scalable up to Rs. 5,00,000 for mega-campaigns</p>
            </div>
          </div>
        </div>
      </div>
      <HowItWorks userType={userType} />
      <div className="bg-gray-50">
        <SuccessStories userType={userType} />
      </div>
      {userType === 'business' && <InfluencerDirectory isFullPage={false} />}
      <MountainDivider />
      <About userType={userType} />
      <FAQ userType={userType} />
    </>
  )
}

function App() {
  const [userType, setUserType] = useState<UserType>('influencer');

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-white">
        <Navbar userType={userType} setUserType={setUserType} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home userType={userType} />} />
            <Route path="/influencers" element={<InfluencerPage userType={userType} setUserType={setUserType} />} />
            <Route path="/influencer/:id" element={<InfluencerDetail userType={userType} setUserType={setUserType} />} />
          </Routes>
          <Footer userType={userType} />
        </Suspense>
      </div>
    </Router>
  )
}

export default App
