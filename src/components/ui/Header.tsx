import type { FC } from 'react';
import { useState } from 'react';
import stealthLogo from '../../assets/Stealth.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`w-full  px-4 md:px-8 lg:px-12 pt-5 py-3 flex items-center justify-between  ${className}`}>
      <div className="flex items-center">
        {/* <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d9d9d9' }}> */}
          <img src={stealthLogo} alt="Stealth Mode AI" className="h-15 w-15" style={{ background: 'transparent'}} />
        {/* </div> */}
        <span className="ml-2 text-[20px] font-bold text-white whitespace-nowrap">Stealth mode AI</span>
      </div>

      {/* Mobile menu button */}
      <button 
        className="lg:hidden text-white p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex space-x-10">
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Features</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Developers</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Company</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Concepts</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Subscription</a></li>
        </ul>
      </nav>

      {/* Login Button - Desktop */}
      <button
        className="hidden lg:inline-block bg-white text-black font-semibold rounded-full px-6 py-2 ml-6 shadow-sm hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/login')}
      >
        Login
      </button>

      {/* Mobile Navigation */}
      <nav className={`lg:hidden absolute top-[72px] left-0 w-full bg-[#157eb3] transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ul className="flex flex-col p-4">
          <li className="py-2 text-red-500"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Features</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Developers</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Company</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Concepts</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Subscription</a></li>
          <li className="py-2">
            <button
              className="w-full bg-white text-black font-semibold rounded-full px-5 py-1 mt-2 shadow-sm hover:bg-gray-100 transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/login');
              }}
            >
              Login
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 