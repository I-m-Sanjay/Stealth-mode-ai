import { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { generateCodeAPI } from "../../api/services/projectService";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  isResizing: boolean;
  setIsResizing: (resizing: boolean) => void;
  projectData?: any;
  generateCodeData?: any;
  userMessage?: string;
  projectId?: string;
}

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  sidebarWidth, 
  setSidebarWidth, 
  isResizing, 
  setIsResizing,
  projectData,
  userMessage,
  projectId
}: SidebarProps) => {
  console.log('Sidebar props received:', {
    projectId,
    projectData: projectData?.data?.repo?.frontend?.html_url,
    userMessage
  });
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      const minWidth = 200; // Minimum sidebar width
      const maxWidth = window.innerWidth * 0.8; // Maximum 80% of window width
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, setSidebarWidth, setIsResizing]);

  // Update sidebar width when sidebar is toggled
  useEffect(() => {
    if (!sidebarOpen) {
      setSidebarWidth(64); // Collapsed width
    } else if (sidebarWidth === 64) {
      setSidebarWidth(320); // Restore to default width when opening
    }
  }, [sidebarOpen, sidebarWidth, setSidebarWidth]);

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

  // Populate chat messages when projectData is available
  useEffect(() => {
    if (projectData && userMessage) {
      console.log('Project data received:', projectData);
      console.log('Project data structure:', {
        hasData: !!projectData.data,
        hasReturnResponse: !!projectData.data?.returnResponse,
        hasFrontend: !!projectData.data?.returnResponse?.frontend,
        hasBackend: !!projectData.data?.returnResponse?.backend,
        frontendPath: projectData.data?.returnResponse?.frontend?.frontendCodeUpdates?.explanations,
        backendPath: projectData.data?.returnResponse?.backend?.backendCodeUpdates?.explanations
      });
      
      let frontendExplanation = projectData.data?.returnResponse?.frontend?.frontendCodeUpdates?.explanations || 'Frontend explanation not available';
      let backendExplanation = projectData.data?.returnResponse?.backend?.backendCodeUpdates?.explanations || 'Backend explanation not available';
      
      // Remove "undefined" prefix if it exists
      if (frontendExplanation.startsWith('undefined')) {
        frontendExplanation = frontendExplanation.replace('undefined', '').trim();
      }
      if (backendExplanation.startsWith('undefined')) {
        backendExplanation = backendExplanation.replace('undefined', '').trim();
      }
      
      console.log('Extracted explanations:', { frontendExplanation, backendExplanation });
      
      const messages = [
        { type: 'user' as const, content: userMessage },
        { type: 'ai' as const, content: frontendExplanation },
        { type: 'ai' as const, content: backendExplanation }
      ];
      setChatMessages(messages);
    }
  }, [projectData, userMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = async () => {
    console.log('handleSend - Debug values:', {
      message: message.trim(),
      projectId,
      hasMessage: !!message.trim(),
      hasProjectId: !!projectId
    });
    
    if (message.trim() && projectId) {
      const newMessage = { type: 'user' as const, content: message.trim() };
      setChatMessages(prev => [...prev, newMessage]);
      const currentMessage = message.trim();
      setMessage("");
      setIsGenerating(true);
      
      try {
        // Call the generateCodeAPI with the project ID from the route
        const response = await generateCodeAPI({
          returnType: 'sse',
          userMessage: currentMessage,
          projectId: projectId
        });

        // Map the response similar to initial mapping
        if (response.data) {
          console.log('API Response structure:', response.data);
          
          let frontendExplanation = response.data?.returnResponse?.frontend?.frontendCodeUpdates?.explanations || 'Frontend explanation not available';
          let backendExplanation = response.data?.returnResponse?.backend?.backendCodeUpdates?.explanations || 'Backend explanation not available';
          
          // Remove "undefined" prefix if it exists
          if (frontendExplanation.startsWith('undefined')) {
            frontendExplanation = frontendExplanation.replace('undefined', '').trim();
          }
          if (backendExplanation.startsWith('undefined')) {
            backendExplanation = backendExplanation.replace('undefined', '').trim();
          }
          
          const aiMessages = [
            { type: 'ai' as const, content: frontendExplanation },
            { type: 'ai' as const, content: backendExplanation }
          ];
          
          setChatMessages(prev => [...prev, ...aiMessages]);
        } else {
          // Fallback response if no data
          const aiResponse = { type: 'ai' as const, content: 'I understand your request. Let me help you with that.' };
          setChatMessages(prev => [...prev, aiResponse]);
        }
      } catch (error) {
        console.error('Error calling generateCodeAPI:', error);
        const errorResponse = { type: 'ai' as const, content: 'Sorry, I encountered an error while processing your request.' };
        setChatMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsGenerating(false);
      }
    } else if (message.trim()) {
      // If no projectId, just add a placeholder response
      const newMessage = { type: 'user' as const, content: message.trim() };
      setChatMessages(prev => [...prev, newMessage]);
      setMessage("");
      setIsGenerating(true);
      setTimeout(() => {
        const aiResponse = { type: 'ai' as const, content: 'I understand your request. Let me help you with that.' };
        setChatMessages(prev => [...prev, aiResponse]);
        setIsGenerating(false);
      }, 1000);
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
    <div 
      className="bg-[#f9f6f1] border-r border-gray-200 flex flex-col rounded-tr-2xl relative h-full"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Sidebar Header */}
      <div className="py-1 px-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-base font-semibold text-gray-800">Project Chat</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M15 18l-6-6 6-6"/>
              ) : (
                <path d="M9 18l6-6-6-6"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="flex flex-col flex-1 p-4 min-h-0">
        {sidebarOpen && (
          <>
            {/* Chat messages area: flex-1, scrollable, fixed height within sidebar */}
            <div className="flex-1 min-h-0 mb-4">
              <div
                ref={chatContainerRef}
                className="h-full overflow-y-auto pr-2 space-y-3 hide-scrollbar"
                style={{height: '100%'}}
              >
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-[#fafafa] text-black'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input: always at the bottom */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              {/* Generating indicator - moved above textarea */}
              {isGenerating && (
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 pb-2 border-b border-gray-200">
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating response...</span>
                </div>
              )}

              {/* Display selected files as thumbnails */}
              {selectedFiles.length > 0 && (
                <div className="flex gap-2 items-start justify-start mb-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative w-12 h-12 rounded-lg overflow-hidden border bg-white flex items-center justify-center">
                      {file.type.startsWith("image/") && filePreviews[index] ? (
                        <img
                          src={filePreviews[index]}
                          alt={file.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <rect width="24" height="24" rx="4" fill="#f3f3f3"/>
                            <path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" stroke="#888" strokeWidth="1.5"/>
                            <path d="M7 17l2.5-2.5a2 2 0 0 1 2.8 0L17 17" stroke="#888" strokeWidth="1.5"/>
                            <circle cx="9" cy="9" r="1" fill="#888"/>
                          </svg>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-0 right-0 m-0.5 bg-black bg-opacity-60 rounded-full p-0.5 hover:bg-opacity-80"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <TextareaAutosize
                minRows={1}
                maxRows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about your project..."
                className="w-full resize-none bg-transparent text-sm focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />

              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  onClick={handleAddFiles}
                  disabled={isGenerating}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#5e5e5c" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="#5e5e5c" strokeWidth="2"/>
                    <polyline points="21,15 16,10 5,21" stroke="#5e5e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button
                  onClick={handleSend}
                  disabled={isGenerating || !message.trim()}
                  className={`w-6 h-6 flex items-center justify-center rounded-full transition ${
                    isGenerating || !message.trim() 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                >
                  {isGenerating ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="10" fill="none" />
                      <path d="M10 4V16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M4 10L10 4L16 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Hidden file input for uploads */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </>
        )}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize transition-colors hover:bg-gray-300"
        onMouseDown={handleMouseDown}
        style={{ 
          zIndex: 10 
        }}
      />
    </div>
  );
};

export default Sidebar; 