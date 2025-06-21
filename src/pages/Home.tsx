import Header from "../components/ui/Header";
import FlowImg from "../assets/Group 1000005228.png";
import FirstBackgroundImg from "../assets/FirstBackground.jpg";
import SecondBackgroundImg from "../assets/SecondBackground.jpg";
import RocketImg from "../assets/Rocket.png";
import light from "../assets/light.png";
import LaptopImg from "../assets/Laptop.png";
import AIImg from "../assets/AI.png";
import MobileImg from "../assets/Mobile.png";
import "../App.css";
import Footer from "../components/ui/Footer";
import PublicIcon from '@mui/icons-material/Public';
import AndroidIcon from '@mui/icons-material/Android';
import { useNavigate } from 'react-router-dom';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel";

import BlogImg1 from "../assets/BackgroundImg-2.jpg";
import BlogImg2 from "../assets/FirstBackground.jpg";
import BlogImg3 from "../assets/login-background-img.png";
import BlogImg4 from "../assets/Robot-img.png";
import BlogImg5 from "../assets/AI.png";


function Home() {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/source');
    };

    return (

        <div className="min-h-screen w-full">
            <div className="bg-[#157eb3]">
                <Header />
            </div>
            {/* DIV 1 */}
            <div className="h-auto min-h-[500px] sm:h-[600px] md:h-[700px] w-full">
                <div
                    className="flex flex-col md:flex-row h-full min-h-[500px] sm:h-[600px] md:h-[700px]"
                    style={{
                        backgroundImage: `url(${FirstBackgroundImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-4 py-8 md:py-0">
                        <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4 md:mb-6 text-center font-mono">
                            What Do You Want<br />
                            To <span className="text-[#3ED6F6]">Build</span> Today?
                        </h1>
                        <button 
                            className="mb-6 md:mb-8 px-4 sm:px-6 py-2 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#1C8DC9] transition-colors text-sm sm:text-base"
                            onClick={handleGetStarted}
                        >
                            Get Started
                        </button>
                        <div className="mt-2 flex justify-center px-2 sm:px-4 md:px-0 md:pl-12 lg:pl-0 w-full">
                            <img src={FlowImg} alt="Prompt Generate Preview Deploy" className="w-full max-w-xs sm:max-w-sm md:max-w-md" />
                        </div>
                    </div>
                </div>
            </div>

            {/* DIV 2 */}
            <div className="bg-[#3c96c7] min-h-[600px] sm:h-[700px] flex flex-col items-center justify-center relative px-4" style={{
                backgroundImage: `url(${SecondBackgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-8 sm:pt-10">
                    <span className="text-white text-xs sm:text-sm tracking-widest mb-2">WHO WE ARE</span>
                    <h2 className="text-white font-mono text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 px-4">We Help To Get Solutions</h2>
                    <p className="text-white text-sm sm:text-base max-w-2xl mb-8 sm:mb-10 px-4">
                        Whether you're a startup, small business, or individual, we turn your ideas into powerful digital solutions. We take time to understand your unique challenges and craft websites tailored to your goals. Our designs are clean, user-friendly, and built to drive engagement and results. With AI-powered tools and fully responsive layouts, your website adapts and evolves with your users. We don't just build websites — we create smart, scalable solutions that grow with your vision.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 justify-center w-full mt-4 sm:mt-6 px-4">
                        {/* Card 1 */}
                        <div className="flex flex-col items-center lg:items-start lg:flex-row bg-transparent p-4 sm:p-6 rounded-lg w-full lg:w-1/2 min-h-[140px] sm:min-h-[160px]">
                            <div className="mb-4 lg:mb-0 lg:mr-6">
                                <img src={RocketImg} alt="Rocket" className="w-16 h-16 sm:w-20 sm:h-20 filter brightness-0 invert" />
                            </div>
                            <div className="text-center lg:text-left flex-1">
                                <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Deploy Your Ideas</h3>
                                <p className="text-white text-sm">We transform your concepts into powerful digital solutions with speed and precision.</p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="flex flex-col items-center lg:items-start lg:flex-row bg-transparent p-4 sm:p-6 rounded-lg w-full lg:w-1/2 min-h-[140px] sm:min-h-[160px]">
                            <div className="mb-4 lg:mb-0 lg:mr-6">
                                <img src={light} alt="Light" className="w-12 h-12 sm:w-15 sm:h-15 filter brightness-0 invert" />
                            </div>
                            <div className="text-center lg:text-left flex-1">
                                <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Bright Thought</h3>
                                <p className="text-white text-sm">We help you turn your vision into reality with smart, creative digital solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIV 3 */}
            <div className="bg-[#157eb3] py-8 sm:py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-white mb-12 sm:mb-16 md:mb-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Our Work</h2>
                    </div>

                    {/* Website Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-12 sm:mb-16 md:mb-20">
                        <div className="lg:w-1/2 mb-6 lg:mb-0 px-2 sm:px-6 order-2 lg:order-1">
                            <div className="overflow-hidden flex justify-center items-center">
                                <img
                                    src={LaptopImg}
                                    alt="Dashboard on Laptop"
                                    className="w-full max-w-[400px] sm:max-w-[530px] h-auto sm:h-[300px] object-contain"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 lg:pl-8 xl:pl-12 order-1 lg:order-2 text-center lg:text-left">
                            <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-mono underline">Website</h3>
                            <p className="text-white text-sm sm:text-base md:text-lg mb-4 w-full lg:w-[90%] xl:w-[80%]">A mobile-friendly website uses a responsive, single-column design with clear text, large buttons, and intuitive navigation.</p>
                            <p className="text-white text-xs sm:text-sm md:text-base opacity-90 mb-6 w-full lg:w-[90%] xl:w-[80%]">Optimized images and fast loading ensure a smooth user experience across all screen sizes.</p>
                            <div className="flex gap-4 sm:gap-6 mb-10 justify-center lg:justify-start">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.95 6.05l-5.657 5.657-2.121-2.122a1 1 0 00-1.414 1.414l2.828 2.829a1 1 0 001.414 0l6.364-6.364a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E" alt="Vue.js" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 13.5h1v-5h-1v5zm.5-6.5a1 1 0 100-2 1 1 0 000 2z'/%3E%3C/svg%3E" alt="Node.js" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-11h-2v6h2v-6zm0-4h-2v2h2V5z'/%3E%3C/svg%3E" alt="React" className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Mobile View Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-12 sm:mb-16 md:mb-20">
                        <div className="lg:w-1/2 lg:pl-8 xl:pl-12 text-center lg:text-right order-1 lg:order-1">
                            <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-mono underline">Mobile View</h3>
                            <p className="text-white text-sm sm:text-base md:text-lg mb-2">Design your website with a mobile-first approach, ensuring it adapts seamlessly to all screen sizes.</p>
                            <p className="text-white text-xs sm:text-sm md:text-base opacity-80 mb-6 sm:mb-8">Use clean layouts, large touch-friendly buttons, and fast-loading content for the best user experience.</p>
                            <div className="flex justify-center lg:justify-end gap-4 sm:gap-6 lg:gap-8 mb-10">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.95 6.05l-5.657 5.657-2.121-2.122a1 1 0 00-1.414 1.414l2.828 2.829a1 1 0 001.414 0l6.364-6.364a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E" alt="Vue.js" className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 13.5h1v-5h-1v5zm.5-6.5a1 1 0 100-2 1 1 0 000 2z'/%3E%3C/svg%3E" alt="Node.js" className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-11h-2v6h2v-6zm0-4h-2v2h2V5z'/%3E%3C/svg%3E" alt="React" className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
                            </div>
                        </div>
                        <div className="lg:w-1/2 mb-6 lg:mb-0 px-2 sm:px-6 order-2 lg:order-2">
                            <div className="overflow-hidden flex justify-center items-center">
                                <img
                                    src={MobileImg}
                                    alt="Mobile View"
                                    className="w-full max-w-[400px] sm:max-w-[530px] h-auto sm:h-[300px] rounded-lg object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Other Applications Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-1/2 mb-6 lg:mb-0 px-2 sm:px-6 order-2 lg:order-1">
                            <div className="overflow-hidden flex justify-center items-center">
                                <img
                                    src={AIImg}
                                    alt="Other Applications on Laptop"
                                    className="w-full max-w-[400px] sm:max-w-[530px] h-auto sm:h-[300px] object-contain"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 lg:pl-8 xl:pl-12 order-1 lg:order-2 text-center lg:text-left">
                            <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-mono underline">Other Applications</h3>
                            <p className="text-white text-sm sm:text-base md:text-lg mb-4 w-full lg:w-[90%] xl:w-[80%]">Integrating AI into websites enhances user experience through features like chatbots, personalized content, and smart recommendations.</p>
                            <p className="text-white text-xs sm:text-sm md:text-base opacity-90 mb-6 w-full lg:w-[90%] xl:w-[80%]">It helps automate tasks, improve customer support, and analyze user behavior in real-time. With AI, websites become more interactive, efficient, and tailored to individual users' needs.</p>
                            <div className="flex gap-4 sm:gap-6 mb-10 justify-center lg:justify-start">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.95 6.05l-5.657 5.657-2.121-2.122a1 1 0 00-1.414 1.414l2.828 2.829a1 1 0 001.414 0l6.364-6.364a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E" alt="Vue.js" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.5 13.5h1v-5h-1v5zm.5-6.5a1 1 0 100-2 1 1 0 000 2z'/%3E%3C/svg%3E" alt="Node.js" className="w-6 h-6 sm:w-8 sm:h-8" />
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='w-6 h-6'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-11h-2v6h2v-6zm0-4h-2v2h2V5z'/%3E%3C/svg%3E" alt="React" className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIV 4 */}
            <div className="bg-[#3c96c7] py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-white font-bold text-3xl sm:text-4xl">Our Blog</h2>
                        <p className="text-white mt-4 text-lg">
                            "Don't focus on having a great blog. <br/> Focus on producing a blog that's great for your readers."
                        </p>
                    </div>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-6xl mx-auto"
                    >
                        <CarouselContent className="-ml-4">
                            {[BlogImg1, BlogImg2, BlogImg3, BlogImg4, BlogImg5].map((img, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <div className="rounded-lg overflow-hidden h-96 bg-gray-200/10 flex items-center justify-center">
                                            <img
                                                src={img}
                                                alt={`Blog ${index + 1}`}
                                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 bg-transparent hover:bg-transparent border-none text-white rounded-full h-16 w-16" />
                        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 bg-transparent hover:bg-transparent border-none text-white rounded-full h-16 w-16" />
                    </Carousel>
                </div>

                <div className="mt-16 space-y-4 sm:space-y-6">
                    {/* First Row - Left to Right (Updated Design) */}
                    <div className="overflow-hidden">
                        <div className="flex gap-2 sm:gap-4 animate-scroll-right whitespace-nowrap">
                            {[1, 2].map((set) => (
                                <div key={`row1-${set}`} className="flex gap-2 sm:gap-4 items-center">
                                    {[
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                    ].map((item, index) => (
                                        <div
                                            key={`row1-${set}-${index}`}
                                            className="px-3 sm:px-6 py-2 sm:py-3 bg-white rounded-lg flex items-center gap-1 sm:gap-2 shadow-md min-w-[150px] sm:min-w-[200px] justify-center"
                                        >
                                            <span className="text-sm sm:text-base">{item.icon}</span>
                                            <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Row - Right to Left (Updated Design) */}
                    <div className="overflow-hidden">
                        <div className="flex gap-2 sm:gap-4 animate-scroll-left whitespace-nowrap">
                            {[1, 2].map((set) => (
                                <div key={`row2-${set}`} className="flex gap-2 sm:gap-4 items-center">
                                    {[
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                    ].map((item, index) => (
                                        <div
                                            key={`row2-${set}-${index}`}
                                            className="px-3 sm:px-6 py-2 sm:py-3 bg-white rounded-lg flex items-center gap-1 sm:gap-2 shadow-md min-w-[150px] sm:min-w-[200px] justify-center"
                                        >
                                            <span className="text-sm sm:text-base">{item.icon}</span>
                                            <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Third Row - Left to Right (Updated Design) */}
                    <div className="overflow-hidden">
                        <div className="flex gap-2 sm:gap-4 animate-scroll-right-slow whitespace-nowrap">
                            {[1, 2].map((set) => (
                                <div key={`row3-${set}`} className="flex gap-2 sm:gap-4 items-center">
                                    {[
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                        { text: "Web Development", icon: <PublicIcon className="text-gray-700" /> },
                                        { text: "App Development", icon: <AndroidIcon className="text-gray-700" /> },
                                    ].map((item, index) => (
                                        <div
                                            key={`row3-${set}-${index}`}
                                            className="px-3 sm:px-6 py-2 sm:py-3 bg-white rounded-lg flex items-center gap-1 sm:gap-2 shadow-md min-w-[150px] sm:min-w-[200px] justify-center"
                                        >
                                            <span className="text-sm sm:text-base">{item.icon}</span>
                                            <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Home;