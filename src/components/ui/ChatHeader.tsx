import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stealthLogo from '../../assets/Stealth.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

const ChatHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, data } = useAppSelector((state) => state.user);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

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

  const handleLogout = () => {
    dispatch(logout());
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

  return (
    <div className="w-full h-16 bg-[#0090c4] flex items-center justify-between px-4 shadow-sm">
      {/* Left side with logo */}
      <div className="flex items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img src={stealthLogo} alt="Stealth Mode AI" className="h-15 w-15" style={{ background: 'transparent'}} />
          <span className="ml-2 text-[18px] font-bold text-white whitespace-nowrap">Stealth mode AI</span>
        </div>
      </div>
      {/* Right controls */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button 
            className="px-4 py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-blue-100 transition flex items-center gap-1 text-sm"
            onClick={() => navigate('/source')}
          >
            <span className="text-lg leading-none">+</span>
            New Project
          </button>
          <button className="px-4 py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-blue-100 transition flex items-center gap-1 text-sm">
            Publish
          </button>
        </div>
        {/* User profile and logout - only show if authenticated */}
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <button
              id="user-icon-btn"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-black focus:outline-none border border-gray-300 hover:bg-gray-100 transition-colors"
              onClick={() => setIsUserPopoverOpen((v) => !v)}
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
                  <span className="font-bold text-black text-sm mb-1 whitespace-pre-line">
                    {data?.data?.name ? data.data.name.toUpperCase() : ''}
                  </span>
                  <span className="text-black text-sm break-all">{data?.data?.email || ''}</span>
                </div>
              )}
            </button>
            <button
              className="bg-white text-black font-semibold rounded-full px-6 py-2 ml-2 shadow-sm hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader; 