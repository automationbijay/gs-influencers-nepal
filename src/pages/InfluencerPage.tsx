import InfluencerDirectory from '../components/InfluencerDirectory'
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
      <main>
        <InfluencerDirectory isFullPage={true} />
      </main>
    </div>
  )
}

export default InfluencerPage
