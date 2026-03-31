import { useState } from 'react'
import { UserType } from '../App'

interface HowItWorksProps {
  userType: UserType;
}

const influencerSteps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Click on 'Join as Influencer' and fill out your niche and audience details."
  },
  {
    number: 2,
    title: "Link Accounts",
    description: "Authenticate your social media profiles to verify your reach and engagement."
  },
  {
    number: 3,
    title: "Get Matched",
    description: "Receive deal offers from businesses that align perfectly with your content style."
  },
  {
    number: 4,
    title: "Collaborate",
    description: "Chat directly with brands to discuss campaign creative and timelines."
  },
  {
    number: 5,
    title: "Earn & Grow",
    description: "Execute campaigns, get paid, and build your professional portfolio."
  }
];

const businessSteps = [
  {
    number: 1,
    title: "Register",
    description: "Create your business profile and define your marketing objectives."
  },
  {
    number: 2,
    title: "Post Campaign",
    description: "Describe your service or product and set your desired budget range."
  },
  {
    number: 3,
    title: "Discovery",
    description: "Our AI suggests the best-fit creators based on their actual social capital."
  },
  {
    number: 4,
    title: "Management",
    description: "Coordinate with influencers through our built-in communication tools."
  },
  {
    number: 5,
    title: "Analyze",
    description: "Track campaign performance and see real ROI on your marketing spend."
  }
];

const HowItWorks = ({ userType }: HowItWorksProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = userType === 'influencer' ? influencerSteps : businessSteps;

  return (
    <section id="how-it-works" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-reveal">
          <h2 className="text-4xl font-black mb-4 text-gray-900">
            How <span className="gradient-text italic">InfluencersNepal</span> Works
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative pl-16 animate-reveal cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Vertical line */}
                {index !== steps.length - 1 && (
                  <div 
                    className={`absolute left-[1.95rem] top-14 w-0.5 h-12 
                      ${index < activeStep ? 'bg-blue-500' : 'bg-gray-100'}`}
                  />
                )}
                
                {/* Step number */}
                <div 
                  className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black
                    ${index <= activeStep 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-blue-50 text-blue-200'
                    } transition-all duration-500 transform group-hover:rotate-6`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div 
                  className={`p-6 rounded-3xl transition-all duration-500
                    ${index === activeStep 
                      ? 'bg-white shadow-2xl border border-blue-50 scale-[1.03]' 
                      : 'hover:bg-blue-50/50'
                    }`}
                >
                  <h3 className={`font-black text-xl mb-2
                    ${index === activeStep ? 'text-blue-600' : 'text-gray-800'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed italic text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="relative h-full flex items-center animate-reveal" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full group">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-60 animate-pulse delay-700" />
              
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
              
              {/* Video container */}
              <div className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl border border-gray-100 overflow-hidden">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-900">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/xSPBVtdE_dI"
                    title="How InfluencersNepal Works"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
