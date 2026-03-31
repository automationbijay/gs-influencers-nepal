import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

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

const FAQ = () => {
  const faqData: FAQCategory[] = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is our platform about?",
          answer: "Our platform connects Nepali businesses with social media influencers to create effective marketing collaborations."
        },
        {
          question: "Who can join our platform?",
          answer: "Influencers: Any influencer with active social media accounts (Instagram, TikTok, Facebook) can join to find business collaborations.\n\nBusinesses: Any business looking to promote their products or services through influencer marketing can sign up."
        },
        {
          question: "Are there any fees for joining?",
          answer: "Signing up is free for both businesses and influencers. We may charge a commission or service fee for successful collaborations depending on the specific terms."
        }
      ]
    },
    {
      title: "For Influencers",
      questions: [
        {
          question: "How do I sign up as an influencer?",
          answer: "You can sign up using the 'Sign Up' button on our homepage. Fill out your profile via the embedded Google Form, providing your social media handles, follower count, and niche details."
        },
        {
          question: "How do I authenticate my social media accounts?",
          answer: "Once you've signed up, go to your profile settings and select the 'Link Accounts' option. Follow the instructions to authenticate your Instagram, TikTok, and Facebook accounts."
        },
        {
          question: "How will I be matched with businesses?",
          answer: "Our platform uses a matching algorithm to pair you with businesses that align with your niche and engagement metrics. You'll receive notifications when a match is found."
        },
        {
          question: "How do I communicate with businesses?",
          answer: "You can use our built-in chat feature to communicate directly with businesses. All communications will be stored in your dashboard for easy access."
        }
      ]
    },
    {
      title: "For Businesses",
      questions: [
        {
          question: "How do I sign up as a business?",
          answer: "Use the 'Sign Up' button on our homepage. Complete the profile form via the embedded Google Form, providing details about your business, marketing goals, and budget range for collaborations."
        },
        {
          question: "How will I find the right influencers?",
          answer: "Our matching algorithm will match you with influencers based on your business niche, marketing goals, and campaign objectives. You'll receive a list of potential influencers to choose from."
        },
        {
          question: "What kind of reports will I receive on campaign performance?",
          answer: "We provide detailed reports that include reach, engagement rates, and the overall effectiveness of your campaign, helping you measure your ROI."
        },
        {
          question: "How do I communicate with influencers?",
          answer: "Use our integrated chat feature to communicate directly with influencers. All communication will be stored in your dashboard for future reference."
        }
      ]
    }
  ]

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-4 border border-indigo-100">
            <HelpCircle className="w-4 h-4 mr-2" />
            Common Questions
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">Frequently Asked <span className="gradient-text italic">Questions</span></h2>
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
