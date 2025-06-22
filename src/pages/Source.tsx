import SecondBackground from '../assets/BackGroundImg-2.jpg';
import { FaRegPaperPlane } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
// import { MdOutlineKeyboardVoice } from 'react-icons/md';
import Header from '../components/ui/Header';

const Source = () => {
    const buttonStyles = "bg-transparent backdrop-blur-sm border border-white rounded-lg p-3 sm:p-4 flex items-center justify-start gap-2 text-white hover:bg-white/10 text-sm sm:text-base transition-all duration-200 min-h-[44px] sm:min-h-[48px]";

    return (
        <div
            className="min-h-screen bg-cover bg-center text-white flex flex-col"
            style={{ backgroundImage: `url(${SecondBackground})` }}
        >
            <Header />
            <main className="flex-grow flex justify-center items-center p-2 sm:p-4 md:p-6 lg:p-8">
                <div className="flex flex-col xl:flex-row h-full gap-3 sm:gap-4 md:gap-6 w-full max-w-7xl">
                    {/* Left Panel - Industry Selection */}
                    <div className="w-full xl:w-1/3 flex flex-col p-3 sm:p-4 md:p-6 lg:p-8 bg-[#157eb3] bg-opacity-25 rounded-xl sm:rounded-2xl border border-white backdrop-blur-sm">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-semibold leading-tight">
                            What kind of industry do you want?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-auto">
                            <button className={buttonStyles}>
                                <span className="text-lg sm:text-xl">🏥</span> 
                                <span className="truncate">Healthcare / Medical</span>
                            </button>
                            <button className={buttonStyles}>
                                <span className="text-lg sm:text-xl">🛒</span> 
                                <span className="truncate">E-commerce / Retail</span>
                            </button>
                            <button className={buttonStyles}>
                                <span className="text-lg sm:text-xl">🎓</span> 
                                <span className="truncate">E-learning</span>
                            </button>
                            <button className={buttonStyles}>
                                <span className="text-lg sm:text-xl">🚚</span> 
                                <span className="truncate">Transportation</span>
                            </button>
                            <button className={buttonStyles}>
                                <span className="text-lg sm:text-xl">💹</span> 
                                <span className="truncate">Finance / Fintech</span>
                            </button>
                            <button className={buttonStyles}>
                                <span className="text-lg sm:text-xl">🗂️</span> 
                                <span className="truncate">Others</span>
                            </button>
                        </div>
                        <div className="flex justify-between mt-3 sm:mt-4 md:mt-5 gap-2 sm:gap-3">
                            <button className="bg-transparent backdrop-blur-sm border border-white rounded-lg py-2 sm:py-3 px-3 sm:px-4 md:px-6 hover:bg-white/10 text-sm sm:text-base transition-all duration-200 min-h-[40px] sm:min-h-[44px]">
                                &larr; Back
                            </button>
                            <button className="bg-transparent backdrop-blur-sm border border-white rounded-lg py-2 sm:py-3 px-3 sm:px-4 md:px-6 hover:bg-white/10 text-sm sm:text-base transition-all duration-200 min-h-[40px] sm:min-h-[44px]">
                                Next &rarr;
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Chat Interface */}
                    <div className="w-full xl:w-2/3 flex flex-col bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-gray-600 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] shadow-lg">
                        <div className="flex-grow w-full">
                            {/* This area is for chat content/responses */}
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm sm:text-base">
                                <p className="text-center px-4">Start a conversation to see responses here</p>
                            </div>
                        </div>
                        <div className="relative mt-3 sm:mt-4">
                            <textarea
                                rows={1}
                                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 pr-24 sm:pr-32 focus:outline-none focus:ring-2 focus:ring-[#157eb3] resize-none text-sm sm:text-base md:text-lg placeholder:text-gray-400 transition-all duration-200"
                                placeholder="Prompt, run, edit, and deploy full-stack website"
                                style={{ overflowY: 'hidden' }}
                                onInput={(e) => {
                                    const textarea = e.currentTarget;
                                    textarea.style.height = 'auto';
                                    textarea.style.height = `${textarea.scrollHeight}px`;
                                    if (textarea.scrollHeight > 200) { // arbitrary max height
                                        textarea.style.overflowY = 'auto';
                                    } else {
                                        textarea.style.overflowY = 'hidden';
                                    }
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 gap-2 sm:gap-3">
                                <FiPaperclip className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                                {/* <MdOutlineKeyboardVoice className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700 transition-colors duration-200" /> */}
                                <button className="p-2 sm:p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]">
                                    <FaRegPaperPlane className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Source;