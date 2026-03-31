import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { UserType } from '../App'

type FAQCategory = {
  title: string
  questions: {
    question: string
    answer: string
  }[]
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className={`group transition-all duration-300 rounded-2xl border ${
        isOpen 
          ? 'bg-white shadow-xl border-blue-100 scale-[1.02]' 
          : 'bg-white/50 border-gray-100 hover:border-blue-200'
      }`}
    >
      <button
        className="w-full px-6 py-5 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
          <ChevronDown className="h-5 w-5" />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
          {answer}
        </div>
      </div>
    </div>
  )
}

const FAQ = ({ userType }: { userType: UserType }) => {
  const influencerFAQ: FAQCategory[] = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is our platform about?",
          answer: "Our platform connects Nepali influencers with businesses to create effective marketing collaborations via a centralized directory."
        },
        {
          question: "Are there any fees for joining?",
          answer: "Signing up is completely free. During our market testing phase, we take zero commission from influencers."
        }
      ]
    },
    {
      title: "For Influencers",
      questions: [
        {
          question: "How do I sign up as an influencer?",
          answer: "Click the 'Join as Influencer' button. You'll be redirected to a form where you can provide your social media details and niche. Our automation will then verify and list your profile."
        },
        {
          question: "How will I be contacted?",
          answer: "Businesses will reach out to you directly via WhatsApp, Email, or Instagram DM using the contact details you provide in your profile."
        }
      ]
    }
  ];

  const businessFAQ: FAQCategory[] = [
    {
      title: "General Questions",
      questions: [
        {
          question: "How do I find the right influencers?",
          answer: "Use our 'Influencer Directory' to search by niche, platform, and audience size. Profiles start at a minimum engagement price of Rs. 500."
        },
        {
          question: "Is there a platform fee?",
          answer: "Currently, Influencers Nepal is a free discovery tool for businesses. We do not charge a platform fee during this testing phase."
        }
      ]
    },
    {
      title: "For Businesses",
      questions: [
        {
          question: "How do I contact an influencer?",
          answer: "Each profile includes direct contact links (WhatsApp, Email, etc.). You can reach out to them directly to discuss your campaign without any platform intervention."
        },
        {
          question: "Are the profiles verified?",
          answer: "Yes, our automated system validates social media links and basic engagement data for every listing in the directory."
        }
      ]
    }
  ];

  const faqData = userType === 'influencer' ? influencerFAQ : businessFAQ;

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-4 border border-indigo-100">
            <HelpCircle className="w-4 h-4 mr-2" />
            Common Questions
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            {userType === 'influencer' ? 'Influencer' : 'Business'} <span className="gradient-text italic">FAQs</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {faqData.map((category, index) => (
            <div key={index} className="animate-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-2xl font-black mb-6 text-gray-800 flex items-center">
                <span className="w-8 h-1 bg-blue-600 rounded-full mr-4" />
                {category.title}
              </h3>
              <div className="grid gap-4">
                {category.questions.map((faq, faqIndex) => (
                  <FAQItem
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
