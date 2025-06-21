import SecondBackground from '../assets/BackGroundImg-2.jpg';
import { FaRegPaperPlane } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
import Header from '../components/ui/Header';

const Source = () => {
    const buttonStyles = "bg-transparent backdrop-blur-sm border border-white rounded-lg p-2 sm:p-3 flex items-center justify-start gap-2 text-white hover:bg-white/10 text-sm sm:text-base";

    return (
        <div
            className="min-h-screen bg-cover bg-center text-white flex flex-col"
            style={{ backgroundImage: `url(${SecondBackground})` }}
        >
            <Header />
            <main className="flex-grow flex justify-center items-center p-3 sm:p-4 md:p-6">
                <div className="flex flex-col lg:flex-row h-full gap-4 sm:gap-6 w-full max-w-7xl">
                    <div className="w-full lg:w-1/3 flex flex-col p-4 sm:p-6 lg:p-8 bg-[#157eb3] bg-opacity-25 rounded-2xl border border-white">
                        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 lg:mb-8">What kind of industry do you want?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-auto">
                            <button className={buttonStyles}>
                                <span>🏥</span> Healthcare / Medical
                            </button>
                            <button className={buttonStyles}>
                                <span>🛒</span> E-commerce / Retail
                            </button>
                            <button className={buttonStyles}>
                                <span>🎓</span> E-learning
                            </button>
                            <button className={buttonStyles}>
                                <span>🚚</span> Transportation
                            </button>
                            <button className={buttonStyles}>
                                <span>💹</span> Finance / Fintech
                            </button>
                            <button className={buttonStyles}>
                                <span>🗂️</span> Others
                            </button>
                        </div>
                        <div className="flex justify-between mt-4 sm:mt-5 gap-2">
                            <button className="bg-transparent backdrop-blur-sm border border-white rounded-lg py-2 px-4 sm:px-6 hover:bg-white/10 text-sm sm:text-base">
                                &larr; Back
                            </button>
                            <button className="bg-transparent backdrop-blur-sm border border-white rounded-lg py-2 px-4 sm:px-6 hover:bg-white/10 text-sm sm:text-base">
                                Next &rarr;
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 flex flex-col bg-white rounded-2xl p-3 sm:p-4 text-gray-600 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
                        <textarea
                            className="flex-grow w-full bg-transparent border-none focus:ring-0 resize-none text-base sm:text-lg placeholder:text-gray-400 p-2"
                            placeholder="Prompt, run, edit, and deploy full-stack website"
                        />
                        <div className="flex justify-end items-center gap-3 sm:gap-4 p-2">
                            <FiPaperclip size={18} className="cursor-pointer sm:w-5 sm:h-5" />
                            <MdOutlineKeyboardVoice size={20} className="cursor-pointer sm:w-6 sm:h-6" />
                            <FaRegPaperPlane size={18} className="cursor-pointer sm:w-5 sm:h-5" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Source;