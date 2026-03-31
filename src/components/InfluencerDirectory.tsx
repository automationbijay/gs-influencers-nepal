import { useState, useEffect } from 'react'
import { Search, User, ExternalLink, Filter } from 'lucide-react'

interface Influencer {
  id: number;
  name: string;
  handle: string;
  niche: string;
  followers: string;
  platform: string;
  image: string;
  bio: string;
}

const InfluencerDirectory = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [searchTerm, setSearchBar] = useState('')
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In Vite, assets in public/ are served at root
        const response = await fetch('/gs-influencers-nepal/data/influencers.json')
        if (!response.ok) {
          // Fallback if base path is different in dev
          const devResponse = await fetch('/data/influencers.json')
          const data = await devResponse.json()
          setInfluencers(data)
          setFilteredInfluencers(data)
        } else {
          const data = await response.json()
          setInfluencers(data)
          setFilteredInfluencers(data)
        }
      } catch (error) {
        console.error("Error fetching influencers:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = influencers.filter(inf => 
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.handle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredInfluencers(filtered)
  }, [searchTerm, influencers])

  return (
    <section id="directory" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-4 border border-blue-100">
            <User className="w-4 h-4 mr-2" />
            Creator Network
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            Influencer <span className="gradient-text italic">Directory</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Browse and discover top Nepali creators across all niches. 
            Find the perfect voice for your next campaign.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-5 py-5 bg-white border-2 border-gray-100 rounded-[2rem] leading-5 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 focus:shadow-2xl transition-all text-lg shadow-sm"
              placeholder="Search by name, niche or handle (e.g. 'Artist', '@maya')"
              value={searchTerm}
              onChange={(e) => setSearchBar(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
              <Filter className="h-5 w-5 text-gray-300" />
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500 font-medium">
            <span>Popular:</span>
            <button onClick={() => setSearchBar('Art')} className="hover:text-blue-600">#Art</button>
            <button onClick={() => setSearchBar('Fitness')} className="hover:text-blue-600">#Fitness</button>
            <button onClick={() => setSearchBar('Food')} className="hover:text-blue-600">#Food</button>
            <button onClick={() => setSearchBar('Tech')} className="hover:text-blue-600">#Tech</button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredInfluencers.map((inf, index) => (
              <div 
                key={inf.id} 
                className="group animate-reveal bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${(index % 4) * 0.1}s` }}
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                  <img 
                    src={inf.image} 
                    alt={inf.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-full shadow-sm">
                      {inf.platform}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-black text-xl leading-tight">{inf.name}</p>
                    <p className="text-blue-200 text-sm font-medium">{inf.handle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{inf.niche}</span>
                    <div className="text-right">
                      <p className="text-blue-600 font-black text-lg leading-none">{inf.followers}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Reach</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 italic mb-6 leading-relaxed">
                    "{inf.bio}"
                  </p>
                  <button className="w-full py-3 bg-gray-50 text-gray-900 rounded-2xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center group/btn">
                    View Profile
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-all transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredInfluencers.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No creators found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            <button 
              onClick={() => setSearchBar('')}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default InfluencerDirectory
