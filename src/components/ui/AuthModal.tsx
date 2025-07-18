import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleSignup = () => {
    onClose();
    navigate("/signup");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-white/5 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Turn Your Vision into Reality
          </h2>
          <p className="text-gray-600 mb-6">
            Log in and Start your journey with a free account it's fast and easy
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-[#1c8bc7] text-white py-3 px-4 rounded-lg font-medium"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 