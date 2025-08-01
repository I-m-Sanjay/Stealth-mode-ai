import { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Header from "../components/ui/Header";
import ProjectHistory from "../components/ui/ProjectHistory";
import AuthModal from "../components/ui/AuthModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { createProjectAPI, generateCodeAPI } from "../api/services";
import { uniqueNamesGenerator, names, colors, animals } from "unique-names-generator";
import type { Config } from "unique-names-generator";

function Source() {
  const [message, setMessage] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const [displayedLoadingText, setDisplayedLoadingText] = useState("");
  const navigate = useNavigate();
  
  // Get authentication state from Redux store
  const { isAuthenticated, data: userData } = useAppSelector((state) => state.user);

  const placeholders = [
    "to build a landing page for your next big idea",
    "to generate a modern admin dashboard UI",
    "to create a full-stack CRM application",
    "to develop a task management web app",
    "to design a sleek portfolio website",
    "to build a real-time chat application"
  ];

  const loadingMessages = [
    "Generating the Front end code",
    "Generating the Backend code",
    "Setting up the database",
    "Configuring the API endpoints",
    "Optimizing the performance",
    "Finalizing your project"
  ];

  useEffect(() => {
    // Restore pending prompt after login
    if (isAuthenticated && pendingPrompt) {
      setMessage(pendingPrompt);
      setPendingPrompt("");
    }
  }, [isAuthenticated, pendingPrompt]);

  useEffect(() => {
    const currentPlaceholder = placeholders[currentPlaceholderIndex];
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentPlaceholder.length) {
        setDisplayedPlaceholder(currentPlaceholder.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Wait a bit before starting to delete
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (currentIndex > 0) {
              setDisplayedPlaceholder(currentPlaceholder.slice(0, currentIndex - 1));
              currentIndex--;
            } else {
              clearInterval(deleteInterval);
              // Move to next placeholder after deletion is complete
              setTimeout(() => {
                setCurrentPlaceholderIndex((prevIndex) => 
                  (prevIndex + 1) % placeholders.length
                );
              }, 500); // Brief pause before next placeholder
            }
          }, 50); // Delete speed
        }, 1500); // Wait time before deleting
      }
    }, 80); // Type speed

    return () => clearInterval(typeInterval);
  }, [currentPlaceholderIndex]);

  // Loading text animation effect
  useEffect(() => {
    if (!isGenerating) return;

    const currentLoadingMessage = loadingMessages[currentLoadingIndex];
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentLoadingMessage.length) {
        setDisplayedLoadingText(currentLoadingMessage.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Wait a bit before starting to delete
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (currentIndex > 0) {
              setDisplayedLoadingText(currentLoadingMessage.slice(0, currentIndex - 1));
              currentIndex--;
            } else {
              clearInterval(deleteInterval);
              // Move to next loading message after deletion is complete
              setTimeout(() => {
                setCurrentLoadingIndex((prevIndex) => 
                  (prevIndex + 1) % loadingMessages.length
                );
              }, 300); // Brief pause before next message
            }
          }, 30); // Delete speed (faster than placeholder)
        }, 1000); // Wait time before deleting (shorter than placeholder)
      }
    }, 60); // Type speed (faster than placeholder)

    return () => clearInterval(typeInterval);
  }, [currentLoadingIndex, isGenerating]);

  // Generate previews for image files
  useEffect(() => {
    const newPreviews: string[] = [];
    selectedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === "string") {
            setFilePreviews((prev) => {
              // Avoid duplicates
              if (prev.includes(e.target!.result as string)) return prev;
              return [...prev, e.target!.result as string];
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, just push empty string as placeholder
        setFilePreviews((prev) => [...prev, ""]);
      }
    });
    // Clean up previews if files are removed
    if (selectedFiles.length === 0) setFilePreviews([]);
    if (selectedFiles.length < filePreviews.length) setFilePreviews((prev) => prev.slice(0, selectedFiles.length));
    // eslint-disable-next-line
  }, [selectedFiles]);

  const handleSend = async () => {
    if (!isAuthenticated) {
      setPendingPrompt(message);
      setShowAuthModal(true);
      return;
    }
    if (message.trim()) {
      setIsGenerating(true);
      try {
        // Get user ID from Redux store
        const userId = isAuthenticated && userData?.data?._id;
        
        if (!userId) {
          console.error("User ID not found");
          return;
        }

        // Generate unique project name
        const customConfig: Config = {
          dictionaries: [names, colors, animals],
          separator: '-',
          length: 3,
        };
        
        const uniqueProjectName = uniqueNamesGenerator(customConfig);

        // Call createProjectAPI with generated name and user ID
        const response = await createProjectAPI({
          name: uniqueProjectName,
          userId: userId
        });

        console.log("Project created:", response);

        // Call generateCodeAPI with the created project ID and user message
        const generateCodeResponse = await generateCodeAPI({
          returnType: "sse",
          userMessage: message.trim(),
          projectId: response.data._id
        });

        console.log("Code generation response:", generateCodeResponse);
        console.log("Code generation response structure:", {
          hasData: !!generateCodeResponse.data,
          hasReturnResponse: !!generateCodeResponse.data?.returnResponse,
          hasFrontend: !!generateCodeResponse.data?.returnResponse?.frontend,
          hasBackend: !!generateCodeResponse.data?.returnResponse?.backend,
          frontendPath: generateCodeResponse.data?.returnResponse?.frontend?.frontendCodeUpdates?.explanations,
          backendPath: generateCodeResponse.data?.returnResponse?.backend?.backendCodeUpdates?.explanations
        });
        setMessage("");
        
        // Navigate to project page after creating project with response data
        navigate(`/project/${response.data._id}`, { 
          state: { 
            projectData: generateCodeResponse,
            userMessage: message.trim()
          } 
        });
      } catch (error) {
        console.error("Error creating project:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(prev => [...prev, ...fileArray]);
      console.log("Selected files:", fileArray);
    }
  };

  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0090c4]">
      <Header />
      {/* Modal for login/signup if not authenticated */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      
      {/* Loading Screen */}
      {isGenerating && (
        <div className="fixed inset-0 bg-[#0090c4] bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl text-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Animated loading spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0090c4] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#0090c4] rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Loading text */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Generating...</h2>
                <p className="text-gray-600 text-sm min-h-[20px]">
                  {displayedLoadingText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              
              {/* Progress dots */}
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#0090c4] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#0090c4] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#0090c4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center mb-4 sm:mb-6 lg:mb-8 mt-15">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 flex items-center gap-2 text-center">
          Build Smarter Web Apps, Without the Code
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 text-center px-4" style={{ color: '#e0f6ff' }}>
          Just chat, and watch your ideas come alive
          </p>
        </div>
        <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-3xl rounded-2xl sm:rounded-3xl bg-[#f9f6f1] p-3 sm:p-4 shadow-md border border-gray-200 flex flex-col gap-2 sm:gap-3">

          {/* Display selected files as thumbnails with overlay X, top-left */}
          {selectedFiles.length > 0 && (
            <div className="flex gap-3 items-start justify-start mb-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border bg-white flex items-center justify-center">
                  {file.type.startsWith("image/") && filePreviews[index] ? (
                    <img
                      src={filePreviews[index]}
                      alt={file.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#f3f3f3"/><path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#888" strokeWidth="1.5"/><path d="M7 17l2.5-2.5a2 2 0 0 1 2.8 0L17 17" stroke="#888" strokeWidth="1.5"/><circle cx="9" cy="9" r="1" fill="#888"/></svg>
                      <span className="text-xs text-gray-600 truncate w-14 text-center">{file.name}</span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 m-1 bg-black bg-opacity-60 rounded-full p-0.5 hover:bg-opacity-80"
                    style={{lineHeight:0}}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <TextareaAutosize
            minRows={2}
            maxRows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Ask Stealth AI ${displayedPlaceholder}`}
            disabled={isGenerating}
            className={`w-full resize-none bg-transparent text-sm sm:text-base focus:outline-none ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isGenerating) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <div className="flex items-center justify-between relative">
            <div className="flex gap-1 sm:gap-2">
              <button
                type="button"
                disabled={isGenerating}
                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow border transition relative ${
                  isGenerating 
                    ? 'bg-gray-200 border-gray-300 cursor-not-allowed' 
                    : 'bg-[#f9f6f1] border-[#ece8e0] hover:bg-[#f3f0eb]'
                }`}
                style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}
                onClick={handleAddFiles}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#5e5e5c" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="#5e5e5c" strokeWidth="2"/>
                  <polyline points="21,15 16,10 5,21" stroke="#5e5e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={isGenerating}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-colors ${
                isGenerating 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="none" />
                  <path d="M10 4V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4 10L10 4L16 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

        </div>
        {/* Project history section below chat input - only show when authenticated */}
        {isAuthenticated && (
          <ProjectHistory />
        )}
      
      </div>
    </div>
  );
}

export default Source;