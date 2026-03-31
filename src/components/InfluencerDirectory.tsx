import { useState, useEffect } from 'react'
import { Search, User, ExternalLink, MapPin, Award, Clock, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

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

interface DirectoryProps {
  isFullPage?: boolean;
}

const InfluencerDirectory = ({ isFullPage = false }: DirectoryProps) => {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [searchTerm, setSearchBar] = useState('')
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Advanced Filters
  const [selectedPlatform, setPlatform] = useState('All')
  const [selectedLocation, setLocation] = useState('All')
  const [selectedNiche, setNiche] = useState('All')
  const [selectedComp, setComp] = useState('All')
  const [minFollowers, setMinFollowers] = useState(0)
  const [maxFollowers, setMaxFollowers] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/influencers.json`)
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }
        const data = await response.json()
        setInfluencers(data)
      } catch (error) {
        console.error("Error fetching influencers:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = influencers.filter(inf => 
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inf.niche && inf.niche.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inf.handle && inf.handle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inf.compensation && inf.compensation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inf.bio && inf.bio.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    if (selectedPlatform !== 'All') {
      filtered = filtered.filter(inf => 
        (inf.platforms || [inf.platform]).some(p => p && p.toLowerCase() === selectedPlatform.toLowerCase())
      )
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(inf => 
        inf.location && inf.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    if (selectedNiche !== 'All') {
      filtered = filtered.filter(inf => 
        inf.niche && inf.niche.toLowerCase().includes(selectedNiche.toLowerCase())
      )
    }

    if (selectedComp !== 'All') {
      filtered = filtered.filter(inf => 
        (inf.comp_tags || []).some(t => t && t.toLowerCase() === selectedComp.toLowerCase())
      )
    }

    if (minFollowers > 0) {
      filtered = filtered.filter(inf => (inf.followers_raw || 0) >= minFollowers)
    }

    if (maxFollowers > 0) {
      filtered = filtered.filter(inf => (inf.followers_raw || 0) <= maxFollowers)
    }

    setFilteredInfluencers(filtered)
  }, [searchTerm, influencers, selectedPlatform, selectedLocation, selectedNiche, selectedComp, minFollowers, maxFollowers])

  const displayInfluencers = isFullPage ? filteredInfluencers : filteredInfluencers.slice(0, 8);

  const platforms = ['All', 'Instagram', 'TikTok', 'YouTube', 'Facebook']
  const locations = Array.from(new Set(influencers.map(i => i.location))).filter(l => l && l !== 'nan').sort()
  const niches = Array.from(new Set(influencers.map(i => i.niche))).filter(n => n && n !== 'nan').sort()
  const compTypes = Array.from(new Set(influencers.flatMap(i => i.comp_tags || []))).filter(c => c && c !== 'nan').sort()

  return (
    <section id="directory" className={`${isFullPage ? 'pt-32 pb-24' : 'py-24'} bg-white relative`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-4 border border-blue-100">
            <User className="w-4 h-4 mr-2" />
            {isFullPage ? 'Nepal Verified Creator Network' : 'Featured Creators'}
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            {isFullPage ? 'Complete Influencer' : 'Creator'} <span className="gradient-text italic">Directory</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {isFullPage 
              ? 'Use advanced filters to find exactly the right creators for your niche and budget.' 
              : 'Browse our growing community of Nepali creators. Click any card to see their full profile.'}
          </p>
        </div>

        {/* Full page advanced filters */}
        {isFullPage ? (
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 mb-16 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <div className="xl:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Search</label>
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium"
                    placeholder="Name, niche, bio..."
                    value={searchTerm}
                    onChange={(e) => setSearchBar(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Platform</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium appearance-none cursor-pointer"
                    value={selectedPlatform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="All">All Platforms</option>
                    {platforms.filter(p => p !== 'All').map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Reach (Min)</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium appearance-none cursor-pointer"
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(Number(e.target.value))}
                  >
                    <option value="0">Min Reach</option>
                    <option value="1000">1K+</option>
                    <option value="10000">10K+</option>
                    <option value="50000">50K+</option>
                    <option value="100000">100K+</option>
                    <option value="500000">500K+</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Reach (Max)</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium appearance-none cursor-pointer"
                    value={maxFollowers}
                    onChange={(e) => setMaxFollowers(Number(e.target.value))}
                  >
                    <option value="0">Max Reach</option>
                    <option value="5000">Up to 5K</option>
                    <option value="20000">Up to 20K</option>
                    <option value="100000">Up to 100K</option>
                    <option value="500000">Up to 500K</option>
                    <option value="1000000">Up to 1M</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Compensation</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-medium appearance-none cursor-pointer"
                    value={selectedComp}
                    onChange={(e) => setComp(e.target.value)}
                  >
                    <option value="All">Any Method</option>
                    {compTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400 self-center mr-2">Niche:</span>
              {['All', ...niches.slice(0, 10)].map(n => (
                <button
                  key={n}
                  onClick={() => setNiche(n)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedNiche === n ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mb-16 animate-reveal">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                className="w-full pl-12 pr-5 py-5 bg-white border-2 border-gray-100 rounded-full focus:border-blue-600 transition-all outline-none font-medium shadow-sm hover:shadow-md"
                placeholder="Search for influencers..."
                value={searchTerm}
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayInfluencers.map((inf, index) => (
                <Link 
                  key={inf.id} 
                  to={`/influencer/${inf.id}`}
                  className="group animate-reveal bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
                  style={{ animationDelay: `${(index % 4) * 0.1}s` }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 shrink-0">
                    <img 
                      src={inf.image} 
                      alt={inf.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                      {(inf.platforms || []).map(p => (
                        <span key={p} className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-full shadow-sm">
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white font-black text-xl leading-tight">{inf.name}</p>
                      <p className="text-blue-200 text-sm font-medium">{inf.handle}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        <MapPin className="w-3 h-3 mr-1" /> {inf.location}
                      </div>
                      <div className="flex items-center text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3 mr-1" /> {inf.age_group}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{inf.niche}</span>
                      <div className="text-right">
                        <p className="text-blue-600 font-black text-lg leading-none">{inf.followers}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Reach</p>
                      </div>
                    </div>
                    
                    <div className="mb-6 p-3 bg-gray-50 rounded-2xl italic text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                      <Award className="w-3 h-3 inline mr-1 text-yellow-500" />
                      {inf.compensation}
                    </div>

                    <div className="space-y-3 mt-auto">
                      <div className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-100 group-hover:bg-blue-700">
                        View Profile
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {!isFullPage && filteredInfluencers.length > 8 && (
              <div className="mt-16 text-center animate-reveal">
                <Link 
                  to="/influencers"
                  className="inline-flex items-center bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
                >
                  View All {filteredInfluencers.length} Influencers
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </div>
            )}
          </>
        )}

        {isFullPage && !isLoading && filteredInfluencers.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 animate-reveal">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No creators matched your search</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
            <button 
              onClick={() => {setSearchBar(''); setPlatform('All'); setLocation('All'); setMinFollowers(0); setNiche('All');}} 
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default InfluencerDirectory
