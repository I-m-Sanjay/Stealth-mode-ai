import Header from "../components/ui/Header";
import BackgroundImg from "../assets/BackgroundImg-2.jpg";
import AIFeatureImg from "../assets/AI-Feature.png";
import SecondBackground from "../assets/SecondBackground.jpg";
import Footer from "../components/ui/Footer";
import CardImg from "../assets/Card.png";

function Feature() {
    return (
        <>
            <div
                className="min-h-screen w-full"
                style={{
                    backgroundColor: "#0d5f8a",
                    backgroundImage: `url(${BackgroundImg})`,
                }}
            >
                <Header />
                <main className="flex flex-col items-center justify-center pt-12 pb-20 px-4">
                    <div className="text-center space-y-4">
                        <p className="font-semibold text-2xl text-white border-b-2 border-[#99c6e0] inline-block px-2">
                            Features
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            AI-Powered{" "}
                            <span style={{ color: "#002e47" }}>Website Generation</span>
                        </h1>
                        <p className="text-2xl text-gray-200 max-w-5xl">
                            "Users can describe their business or idea in{" "}
                            <span style={{ color: "#002e47", fontWeight: "bold" }}>plain language</span>, and{" "}
                            <span style={{ color: "#002e47", fontWeight: "bold" }}>Stealth Mode Ai</span> generates a
                            complete website layout."
                        </p>
                    </div>

                    <div className="mt-10 max-w-5xl w-full p-2 rounded-2xl lg:max-w-6xl">
                        <img
                            src={AIFeatureImg}
                            alt="AI-Powered Website Generation"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </main>
            </div>
            <div
                className="w-full bg-no-repeat bg-cover py-20 px-4"
                style={{ backgroundImage: `url(${SecondBackground})` }}
            > 
                <div className="max-w-6xl mx-auto text-white">
                    <div className="text-center mb-16 md:mb-24 lg:mb-32">
                        <h2 className="text-3xl font-bold md:text-4xl">
                            Stealth Mode AI Functionalities
                        </h2>
                        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-200">
                            The process of Stealth Mode AI website generation is designed to be
                            seamless and hidden from the user's view. It starts with a simple
                            prompt where users describe their website needs, and the AI
                            instantly transforms that input into a full-fledged website.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-15">
                        {/* Card 1: Prompt-Based Generation */}
                        <div className="flex flex-col h-full">
                            <div
                                className="rounded-2xl p-4 flex-grow flex flex-col sm:p-7 h-full"
                                style={{ backgroundColor: "#2a77a1" }}
                            >
                                <div
                                    className="rounded-xl p-6 flex flex-col flex-grow h-full text-white sm:p-8 min-h-[400px]"
                                    style={{ backgroundColor: "#3782ab" }}
                                >
                                    <ul className="space-y-6 pt-5 sm:space-y-8 flex-grow">
                                        <li className="flex">
                                            <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                •
                                            </span>
                                            <p className="leading-relaxed">
                                                <strong className="font-semibold text-[#124c6b]">Prompt-Based Generation:</strong>{" "}
                                                Users can describe their business or idea in plain language, and Stealth Mode AI generates a complete website layout.
                                            </p>
                                        </li>
                                        <li className="flex">
                                            <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                •
                                            </span>
                                            <p className="leading-relaxed">
                                                <strong className="font-semibold text-[#124c6b]">Smart Component Selection:</strong>{" "}
                                                Dynamically picks relevant components (e.g., contact form, product listing, blog) based on industry and needs.
                                            </p>
                                        </li>
                                        <li className="flex">
                                            <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                •
                                            </span>
                                            <p className="leading-relaxed">
                                                <strong className="font-semibold text-[#124c6b]">Personalized Design:</strong>{" "}
                                                Adjusts color palette, fonts, and layout to match the user's brand preferences.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mt-6 text-center text-white">
                                Prompt-Based Generation
                            </h3>
                        </div>

                        {/* Card 2: Built-In Developer Tools */}
                        <div className="flex flex-col h-full lg:-mt-20">
                            <div
                                className="rounded-2xl p-4 flex-grow flex flex-col sm:p-7 h-full"
                                style={{ backgroundColor: "#2a77a1" }}
                            >
                                <div
                                    className="rounded-xl p-6 flex flex-col flex-grow h-full text-white sm:p-8 min-h-[400px]"
                                    style={{ backgroundColor: "#3782ab" }}
                                >
                                    <ul className="space-y-6 pt-5 sm:space-y-8 flex-grow">
                                        <li className="flex">
                                            <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                •
                                            </span>
                                            <p className="leading-relaxed">
                                                <strong className="font-semibold text-[#124c6b]">Custom Code Injection:</strong>{" "}
                                                Allows HTML/CSS/JS editing within the AI-generated framework.
                                            </p>
                                        </li>
                                        <li className="flex">
                                            <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                •
                                            </span>
                                            <p className="leading-relaxed">
                                                <strong className="font-semibold text-[#124c6b]">Component Reusability:</strong>{" "}
                                                For manual customization with AI-suggested improvements.
                                            </p>
                                        </li>
                                        <li className="flex">
                                            <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                •
                                            </span>
                                            <p className="leading-relaxed">
                                                <strong className="font-semibold text-[#124c6b]">Code Export & Git Integration:</strong>{" "}
                                                Download full-code projects or sync with Github.
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="flex justify-center items-center mt-auto pt-6">
                                        <img
                                            src={CardImg}
                                            alt="Developer Tools"
                                            className="w-36 h-auto sm:w-48"
                                        />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mt-6 text-center text-white">
                                Built-In Developer Tools
                            </h3>
                        </div>

                        {/* Card 3: One-Click Hosting & Deployment */}
                        <div className="md:col-span-2 lg:col-span-1 flex justify-center items-start">
                            <div className="flex flex-col h-full w-full max-w-md lg:max-w-full">
                                <div
                                    className="rounded-2xl p-4 flex-grow flex flex-col sm:p-7 h-full"
                                    style={{ backgroundColor: "#2a77a1" }}
                                >
                                    <div
                                        className="rounded-xl p-6 flex flex-col flex-grow h-full text-white sm:p-8 min-h-[400px]"
                                        style={{ backgroundColor: "#3782ab" }}
                                    >
                                        <ul className="space-y-6 pt-5 sm:space-y-8 flex-grow">
                                            <li className="flex">
                                                <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                    •
                                                </span>
                                                <p className="leading-relaxed">
                                                    <strong className="font-semibold text-[#124c6b]">Integrated Deployment:</strong>{" "}
                                                    Launch websites to platforms like Vercel, Netlify, or Stealth AI's own servers.
                                                </p>
                                            </li>
                                            <li className="flex">
                                                <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                    •
                                                </span>
                                                <p className="leading-relaxed">
                                                    <strong className="font-semibold text-[#124c6b]">Custom Domain Linking:</strong>{" "}
                                                    Easy DNS setup for personal or business domains.
                                                </p>
                                            </li>
                                            <li className="flex">
                                                <span className="mr-3 font-bold text-xl relative top-[-2px]" style={{ color: "#124c6b" }}>
                                                    •
                                                </span>
                                                <p className="leading-relaxed">
                                                    <strong className="font-semibold text-[#124c6b]">Global CDN:</strong>{" "}
                                                    Ensures fast loading and availability worldwide.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mt-6 text-center text-white">
                                    One-Click Hosting & Deployment
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Feature;