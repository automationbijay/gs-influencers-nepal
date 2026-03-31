import { Rocket, Users, Target, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Users,
    title: "Smart Matching",
    description: "Connecting the right creators with the perfect brands using AI",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Target,
    title: "Authentic Growth",
    description: "Focus on genuine engagement and real results that matter",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Sustainable Earnings",
    description: "Help creators build lasting and scalable income streams",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Rocket,
    title: "Future Ready",
    description: "Evolving with the digital marketing landscape in Nepal",
    color: "from-orange-500 to-red-600"
  }
]

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-bold mb-4 border border-purple-100">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Our Mission & Vision
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">Why We <span className="gradient-text italic">Exist</span></h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-reveal">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
              <p className="text-gray-600 leading-relaxed text-xl mb-6">
                We built this platform to solve a disconnect: Nepal's creators drown in self-promotion while businesses burn budgets on mismatched influencers.
              </p>
              <p className="text-blue-600 font-black text-2xl leading-tight mb-6">
                Our answer? A bridge built on trust and data.
              </p>
              <p className="text-gray-600 leading-relaxed text-xl">
                Using smart algorithms, we pair hidden creative talent with brands that genuinely align with their audience, cutting out middlemen and guesswork.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                <Rocket className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Fixing the Economy</h4>
                <p className="text-blue-700 font-medium">One meaningful collaboration at a time. 🚀</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="relative group animate-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500`} />
                  <div className="relative p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                    <div className={`mt-6 flex items-center text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                      hoveredIndex === index ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      Learn More
                      <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                        hoveredIndex === index ? 'translate-x-2' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
