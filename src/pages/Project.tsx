import { useState } from "react";
import ChatHeader from "../components/ui/ChatHeader";
import Sidebar from "../components/ui/Sidebar";
import { useLocation, useParams } from "react-router-dom";

const Project = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const location = useLocation();
  const { projectId } = useParams();
  const { projectData, userMessage } = location.state || {};

  return (
    <>
      <ChatHeader />
      <div className="flex h-[calc(100vh-64px)] bg-[#0090c4]">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
          isResizing={isResizing}
          setIsResizing={setIsResizing}
          projectData={projectData}
          userMessage={userMessage}
          projectId={projectId}
        />
        
        {/* Main Content Area */}
        <div 
          className="flex-1 flex items-center justify-center p-8"
          style={{ marginLeft: sidebarOpen ? '0' : '0' }}
        >
          <div className="bg-white rounded-2xl p-7 max-w-2xl w-full shadow-xl text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Created!</h1>
            <p className="text-gray-600 mb-6">Your Project has been generated Successfully</p>
            {/* <button 
              onClick={() => window.history.back()} 
              className="bg-[#1c8bc7] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#157eb3] transition-colors"
            >
              Back to Source
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
