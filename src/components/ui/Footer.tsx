import type { FC } from 'react';
import StealthIcon from '../../assets/Stealth.png';

const Footer: FC = () => {
  return (
    <footer className="bg-[#095882] text-white py-12  px-4 md:px-8 lg:px-12">
      <div className="container w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={StealthIcon} alt="Stealth mode AI logo" className="w-15 h-15 mr-1" />
              <span className="text-[20px] font-bold whitespace-nowrap">Stealth mode AI</span>
            </div>
            <p className="text-sm text-gray-200 max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Nec nisi tempus nunc sed ultricies nisi id elementum ut amet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-200 hover:text-white">Data sets</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">MI insight</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Netus fermentum</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Suspendisse viverra</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Eget mattis</a></li>
            </ul>
          </div>

          {/* Information Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-200 hover:text-white">Epictetus</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Dictum</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Id sem</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Quis eros</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Eget mattis</a></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Subscribe</h3>
            <div className="bg-[#03405e] p-6 rounded-2xl">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-[#03405e] border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-200 mt-6 leading-relaxed">
                Gravida sed justo, justo, id est et. Amet tristique convallis sed porttitor nullam eu ut. 
                Duis et odio aliquam bibendum. Metus et lectus id viverra fringilla magna morbi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;