import InfluencerDirectory from '../components/InfluencerDirectory'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { UserType } from '../App'
import { useEffect } from 'react'

interface InfluencerPageProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const InfluencerPage = ({ userType, setUserType }: InfluencerPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar userType={userType} setUserType={setUserType} />
      <main>
        <InfluencerDirectory isFullPage={true} />
      </main>
      <Footer />
    </div>
  )
}

export default InfluencerPage
