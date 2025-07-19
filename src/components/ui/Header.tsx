import type { FC } from 'react';
import { useState, useEffect } from 'react';
import stealthLogo from '../../assets/Stealth.png';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, updateUserProfile } from '../../store/slices/userSlice';
import { getUserProfile } from '../../api/services/userProfileService';
import { toast } from 'react-toastify';

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [lastProfileFetch, setLastProfileFetch] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, data: user } = useAppSelector((state) => state.user);

  // Cache duration: 5 minutes (300000 ms)
  const PROFILE_CACHE_DURATION = 5 * 60 * 1000;

  // Close user popover when clicking outside
  useEffect(() => {
    if (!isUserPopoverOpen) return;
    const handleClick = (e: MouseEvent) => {
      const popover = document.getElementById('user-popover');
      const icon = document.getElementById('user-icon-btn');
      if (popover && !popover.contains(e.target as Node) && icon && !icon.contains(e.target as Node)) {
        setIsUserPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isUserPopoverOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setIsUserPopoverOpen(false);
    toast.success('Logged out successfully!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate('/');
  };

  const shouldFetchProfile = (): boolean => {
    // If no profile data exists, fetch it
    if (!user?.data?.name || !user?.data?.email) {
      return true;
    }
    
    // If we've never fetched before, fetch it
    if (lastProfileFetch === null) {
      return true;
    }
    
    // If cache has expired, fetch it
    const now = Date.now();
    const timeSinceLastFetch = now - lastProfileFetch;
    return timeSinceLastFetch > PROFILE_CACHE_DURATION;
  };

  const handleUserPopoverToggle = async () => {
    const newPopoverState = !isUserPopoverOpen;
    setIsUserPopoverOpen(newPopoverState);
    
    // Fetch user profile only when opening the popover AND if needed
    if (newPopoverState && isAuthenticated && shouldFetchProfile()) {
      setIsLoadingProfile(true);
      try {
        const profileData = await getUserProfile();
        dispatch(updateUserProfile(profileData));
        setLastProfileFetch(Date.now());
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        toast.error('Failed to load user profile', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoadingProfile(false);
      }
    }
  };

  return (
    <header className={`w-full px-4 md:px-6 lg:px-8 xl:px-12 py-3 flex items-center justify-between relative ${className}`}>
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img 
            src={stealthLogo} 
            alt="Stealth Mode AI" 
            className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" 
            style={{ background: 'transparent'}} 
          />
          <span className="ml-2 text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white whitespace-nowrap">
            Stealth mode AI
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block flex-1 mx-8">
        <ul className="flex justify-center space-x-6 xl:space-x-10">
          <li><Link to="/feature" className="text-white text-base hover:text-blue-100 transition-colors">Features</Link></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Our Works</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Company</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Blogs</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Subscription</a></li>
        </ul>
      </nav>

      {/* Right Section - Desktop */}
      <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
        {isAuthenticated ? (
          <>
            <button
              id="user-icon-btn"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-black focus:outline-none border border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={handleUserPopoverToggle}
              aria-label="User menu"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path stroke="currentColor" strokeWidth="2" d="M4 20c0-4 4-7 8-7s8 3 8 7" />
              </svg>
              {isUserPopoverOpen && (
                <div
                  id="user-popover"
                  className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 mt-3 bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col items-start"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
                >
                  {isLoadingProfile ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600 text-sm">Loading profile...</span>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-black text-sm mb-1 whitespace-pre-line">
                        {user?.data?.name ? user.data.name.toUpperCase() : 'User'}
                      </span>
                      <span className="text-black text-sm break-all mb-2">{user?.data?.email || 'No email available'}</span>
                    </>
                  )}
                </div>
              )}
            </button>
            <button
              className="bg-white text-black font-semibold rounded-full px-6 py-2 shadow-sm hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-white text-black font-semibold rounded-full px-6 py-2 shadow-sm hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="lg:hidden flex items-center space-x-2">
        {/* Mobile User Icon - Only show if authenticated */}
        {isAuthenticated && (
          <button
            id="user-icon-btn-mobile"
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-black focus:outline-none border border-gray-300 hover:bg-gray-100 transition-colors"
            onClick={handleUserPopoverToggle}
            aria-label="User menu"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path stroke="currentColor" strokeWidth="2" d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            {isUserPopoverOpen && (
              <div
                id="user-popover-mobile"
                className="absolute right-0 top-full z-50 min-w-[200px] mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex flex-col items-start"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
              >
                {isLoadingProfile ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600 text-sm">Loading...</span>
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-black text-xs mb-1 whitespace-pre-line">
                      {user?.data?.name ? user.data.name.toUpperCase() : 'User'}
                    </span>
                    <span className="text-black text-xs break-all mb-2">{user?.data?.email || 'No email available'}</span>
                  </>
                )}
              </div>
            )}
          </button>
        )}
        
        {/* Mobile menu button */}
        <button 
          className="text-white p-2"
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
      </div>

      {/* Mobile Navigation */}
      <nav className={`lg:hidden absolute top-full left-0 w-full bg-[#157eb3] transition-all duration-300 ease-in-out z-40 ${isMenuOpen ? 'opacity-100 visible max-h-screen' : 'opacity-0 invisible max-h-0 overflow-hidden'}`}>
        <ul className="flex flex-col p-4 space-y-2">
          <li><Link to="/feature" className="text-white text-base hover:text-blue-100 transition-colors block py-2" onClick={() => setIsMenuOpen(false)}>Features</Link></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block py-2">Our Works</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block py-2">Company</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block py-2">Blogs</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block py-2">Subscription</a></li>

          <li className="pt-2 border-t border-white/20">
            {isAuthenticated ? (
              <button
                className="w-full bg-white text-black font-semibold rounded-full px-5 py-2 shadow-sm hover:bg-gray-100 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="w-full bg-white text-black font-semibold rounded-full px-5 py-2 shadow-sm hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/login');
                }}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 