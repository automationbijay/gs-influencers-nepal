import { useState, useEffect } from 'react'
import { Menu, X, Users, Briefcase } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserType } from '../App'

const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'how-it-works', label: 'How It Works', path: '/#how-it-works' },
  { id: 'influencers', label: 'Influencers', path: '/influencers' },
  { id: 'about', label: 'About', path: '/#about' },
  { id: 'faq', label: 'FAQs', path: '/#faq' }
]

interface NavbarProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const Navbar = ({ userType, setUserType }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]')
        const scrollPosition = window.scrollY + 100

        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop
          const sectionHeight = section.clientHeight
          const sectionId = section.getAttribute('id') || ''
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        })
      } else if (location.pathname === '/influencers') {
        setActiveSection('influencers')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false)
    
    if (item.path.startsWith('/#')) {
      const id = item.path.substring(2)
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(id)
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const element = document.getElementById(id)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(item.path)
    }
  }

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <Link to="/" className="font-black text-xl gradient-text tracking-tighter">
              INFLUENCERS NEPAL
            </Link>
            <div className="flex mt-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button 
                onClick={() => setUserType('influencer')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                  userType === 'influencer' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>Influencer</span>
              </button>
              <button 
                onClick={() => setUserType('business')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                  userType === 'business' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Briefcase className="w-3 h-3" />
                <span>Business</span>
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`nav-link font-bold text-sm uppercase tracking-widest ${
                  activeSection === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-4 pb-3 space-y-1 bg-white shadow-2xl mt-4 rounded-3xl border border-gray-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
