import { UserType } from '../App'

const influencerTestimonials = [
  {
    name: "Anika Sharma",
    role: "Artist",
    quote: "I never liked promoting myself, but Influencers Nepal connected me with brands that loved my art. Now, I earn ₹50k/month painting from home!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    name: "Raj Thapa",
    role: "Fitness Coach",
    quote: "I just posted workouts for fun until the platform matched me with sportswear brands. Game-changer for my career!",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80"
  },
  {
    name: "Priya Gurung",
    role: "Educator",
    quote: "My STEM videos went from passion projects to a sustainable career after partnering with startups through the platform!",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  }
]

const businessTestimonials = [
  {
    name: "Sandesh KC",
    role: "Cafe Owner",
    quote: "Finding food bloggers was a nightmare until I used the directory. We saw a 30% uptick in foot traffic after our first collaboration!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh"
  },
  {
    name: "Deepa Rai",
    role: "Boutique Owner",
    quote: "I needed niche fashion creators for my New Year sale. The direct contact links made it so easy to finalize deals in minutes.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepa"
  },
  {
    name: "Bishal Gurung",
    role: "Tech Startup",
    quote: "ROI was our main concern. We found tech reviewers who actually understood our product and reached our target audience effectively.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bishal"
  }
]

const SuccessStories = ({ userType }: { userType: UserType }) => {
  const testimonials = userType === 'influencer' ? influencerTestimonials : businessTestimonials;

  return (
    <section id="success-stories" className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          {userType === 'influencer' ? 'Creator Success Stories' : 'Business Growth Stories'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20 blur-md" />
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover relative ring-2 ring-purple-500"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-semibold text-lg gradient-text mt-4">{testimonial.name}</h4>
                <p className="text-gray-500 mb-4">{testimonial.role}</p>
              </div>
              <p className="text-gray-600 italic text-center">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuccessStories
