import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  ArrowLeft, 
  MapPin, 
  Award, 
  Clock, 
  User,
  ExternalLink,
  MessageCircle,
  Share2,
  CheckCircle2,
  TrendingUp,
  Target
} from 'lucide-react'
import { UserType } from '../App'

interface Influencer {
  id: number;
  name: string;
  handle: string;
  niche: string;
  followers: string;
  followers_raw: number;
  platform: string;
  platforms: string[];
  location: string;
  age_group: string;
  compensation: string;
  comp_tags: string[];
  image: string;
  bio: string;
  socials: {
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
  };
}

interface InfluencerDetailProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
)

const InfluencerDetail = ({ userType, setUserType }: InfluencerDetailProps) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [influencer, setInfluencer] = useState<Influencer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/influencers.json`)
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }
        const data: Influencer[] = await response.json()
        
        const found = data.find(inf => inf.id.toString() === id)
        if (found) {
          setInfluencer(found)
        } else {
          navigate('/influencers')
        }
      } catch (error) {
        console.error("Error fetching influencer details:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!influencer) return null

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: influencer.socials.instagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
    { name: 'TikTok', icon: <TikTokIcon className="w-5 h-5" />, url: influencer.socials.tiktok, color: 'bg-black' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, url: influencer.socials.youtube, color: 'bg-red-600' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: influencer.socials.facebook, color: 'bg-blue-600' },
  ].filter(link => link.url && link.url !== 'nan' && link.url !== '')

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/influencers" 
            className="inline-flex items-center text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Directory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Image & Quick Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white sticky top-32">
                <div className="aspect-[4/5] relative">
                  <img 
                    src={influencer.image} 
                    alt={influencer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-xs font-black uppercase tracking-widest text-gray-900">Verified</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-8 bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-3xl font-black text-gray-900 leading-tight">{influencer.name}</h1>
                      <p className="text-blue-600 font-bold">{influencer.handle}</p>
                    </div>
                    <button className="p-3 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50/50 p-4 rounded-3xl text-center">
                      <p className="text-2xl font-black text-blue-600 leading-none">{influencer.followers}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Total Reach</p>
                    </div>
                    <div className="bg-purple-50/50 p-4 rounded-3xl text-center">
                      <p className="text-2xl font-black text-purple-600 leading-none">High</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Engagement</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href={userType === 'influencer' ? "https://forms.gle/noEwAYMB1KQbmVXi7" : "https://forms.gle/a5MMWkrgXHJ7fuVD7"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center shadow-xl shadow-blue-100"
                    >
                      Collaborate Now
                    </a>
                    <button className="w-full py-4 bg-white text-blue-600 border-2 border-blue-50 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Request Verified Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Socials */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-blue-50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Creator Profile</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {influencer.bio} As a dedicated <span className="text-blue-600 font-bold">{influencer.niche}</span>, 
                  I focus on creating high-quality content that resonates with my audience in <span className="font-bold">{influencer.location}</span>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 shrink-0">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Primary Location</p>
                        <p className="text-gray-900 font-bold">{influencer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 shrink-0">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Audience Age</p>
                        <p className="text-gray-900 font-bold">{influencer.age_group} Years</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 shrink-0">
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Primary Platform</p>
                        <p className="text-gray-900 font-bold">{influencer.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 shrink-0">
                        <Target className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Niche / Category</p>
                        <p className="text-gray-900 font-bold">{influencer.niche}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-blue-50">
                <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Connected Channels</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((social) => (
                      <a 
                        key={social.name}
                        href={social.url.startsWith('http') ? social.url : `https://${social.name.toLowerCase()}.com/${social.url.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100"
                      >
                        <div className={`w-12 h-12 ${social.color} rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg group-hover:scale-110 transition-transform`}>
                          {social.icon}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-black text-gray-900">{social.name}</p>
                          <p className="text-xs text-gray-400 font-medium truncate max-w-[150px]">{social.url}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                      </a>
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center bg-gray-50 rounded-3xl">
                      <p className="text-gray-400 font-medium">No external social links provided.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Compensation Section */}
              <div className="bg-blue-900 rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Award className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <Award className="w-8 h-8 text-blue-400 mr-4" />
                    <h3 className="text-2xl font-black uppercase tracking-widest">Compensation Preferences</h3>
                  </div>
                  <div className="bg-blue-800/50 backdrop-blur-md rounded-3xl p-6 border border-blue-700/50">
                    <p className="text-lg text-blue-100 leading-relaxed italic">
                      "{influencer.compensation}"
                    </p>
                  </div>
                  <p className="mt-6 text-blue-400 text-sm font-bold flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Verified creators usually respond within 24-48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InfluencerDetail
