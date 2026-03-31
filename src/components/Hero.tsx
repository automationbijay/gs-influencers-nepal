import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-white bg-grid-pattern">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 animate-reveal">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-100 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Empowering Nepal's Digital Creators
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-gray-900">
              Your Gateway to <br />
              <span className="gradient-text italic">Impactful</span> <br />
              Collaborations
            </h1>
            
            <p className="text-gray-600 mb-10 text-xl leading-relaxed max-w-lg">
              We bridge the gap between niche Nepali talent and local businesses. 
              Grow your brand authentically through meaningful partnerships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a 
                href="https://forms.gle/noEwAYMB1KQbmVXi7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
              >
                Join as Influencer
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://forms.gle/a5MMWkrgXHJ7fuVD7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-md active:scale-95"
              >
                Register Business
              </a>
            </div>

            <div className="mt-12 flex items-center space-x-6 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Trusted by <span className="text-gray-900 font-bold">100+</span> creators & businesses</p>
            </div>
          </div>

          <div className="hidden md:block relative z-10 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[3rem] transform rotate-3" />
              <img 
                src="https://res.cloudinary.com/makegharghaderi/image/upload/v1738067875/influencer_marketing_nepal_2_rmnqiy.png"
                alt="Influencer Marketing Nepal"
                className="relative z-10 w-full h-auto rounded-[2.5rem] shadow-2xl border-8 border-white transform transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 animate-bounce">
                <div className="text-center">
                  <p className="text-3xl font-black text-blue-600 leading-none">75K+</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">NPR / Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
