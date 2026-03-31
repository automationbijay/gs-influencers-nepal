import InfluencerDirectory from '../components/InfluencerDirectory'
import { UserType } from '../App'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface InfluencerPageProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const InfluencerPage = ({ userType, setUserType }: InfluencerPageProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (userType === 'influencer') {
      navigate('/')
    }
  }, [userType, navigate])

  if (userType === 'influencer') return null;

  return (
    <div className="min-h-screen bg-white">
      <main>
        <InfluencerDirectory isFullPage={true} />
      </main>
    </div>
  )
}

export default InfluencerPage
