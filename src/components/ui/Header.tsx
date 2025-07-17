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
    if (!user?.data?.userName || !user?.data?.email) {
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
    <header className={`w-full  px-4 md:px-8 lg:px-12 pt-5 py-3 flex items-center justify-between  ${className}`}>
      <div className="flex items-center">
        {/* <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d9d9d9' }}> */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img src={stealthLogo} alt="Stealth Mode AI" className="h-15 w-15" style={{ background: 'transparent'}} />
          <span className="ml-2 text-[20px] font-bold text-white whitespace-nowrap">Stealth mode AI</span>
        </div>
        {/* </div> */}
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
          <li><Link to="/feature" className="text-white text-base hover:text-blue-100 transition-colors">Features</Link></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Our Works</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Company</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Blogs</a></li>
          <li><a href="#" className="text-white text-base hover:text-blue-100 transition-colors">Subscription</a></li>
        </ul>
      </nav>

      {/* Login/Logout Button & User Icon - Desktop */}
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
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
                      {user?.data?.userName ? user.data.userName.toUpperCase() : 'User'}
                    </span>
                    <span className="text-black text-sm break-all mb-2">{user?.data?.email || 'No email available'}</span>
                    

                  </>
                )}
              </div>
            )}
          </button>
          <button
            className="hidden lg:inline-block bg-white text-black font-semibold rounded-full px-6 py-2 ml-2 shadow-sm hover:bg-gray-100 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="hidden lg:inline-block bg-white text-black font-semibold rounded-full px-6 py-2 ml-6 shadow-sm hover:bg-gray-100 transition-colors"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      )}

      {/* Mobile Navigation */}
      <nav className={`lg:hidden absolute top-[72px] left-0 w-full bg-[#157eb3] transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ul className="flex flex-col p-4">
          <li className="py-2 text-red-500"><Link to="/feature" className="text-white text-base hover:text-blue-100 transition-colors block" onClick={() => setIsMenuOpen(false)}>Features</Link></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Developers</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Company</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Concepts</a></li>
          <li className="py-2"><a href="#" className="text-white text-base hover:text-blue-100 transition-colors block">Subscription</a></li>

          <li className="py-2">
            {isAuthenticated ? (
              <button
                className="w-full bg-red-600 text-white font-semibold rounded-full px-5 py-1 mt-2 shadow-sm hover:bg-red-700 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="w-full bg-white text-black font-semibold rounded-full px-5 py-1 mt-2 shadow-sm hover:bg-gray-100 transition-colors"
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