import React, { useState, useRef, useEffect } from "react";
import Header from "../components/ui/Header";
// import Footer from "../components/ui/Footer";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { getProjects, updateProjectAPI, type IProject } from "../api/services/projectService";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import { toast } from 'react-toastify';

const sortOptions = [
  { label: "Newest First", value: "last_edited" },
  { label: "Oldest First", value: "date_created" },
  { label: "Alphabetical", value: "alphabetical" },
];

function Workspace() {
  // Get user data from Redux
  const { data } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  
  // State for projects
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("last_edited");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // State for project menu dropdown
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // State for confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simple flag to prevent duplicate API calls in React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!data?.data?._id) {
        setError('User not authenticated');
        return;
      }

      // Prevent duplicate calls in React Strict Mode
      if (hasFetched.current) {
        return;
      }

      hasFetched.current = true;
      setLoading(true);
      setError(null);

      try {
        const response = await getProjects(data.data._id);
        if (response.success) {
          setProjects(response.data);
        } else {
          setError(response.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [data?.data?._id]);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortDropdownOpen(false);
      }
    }
    if (sortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortDropdownOpen]);

  // Close project menu on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      // Check if click is outside any project menu
      if (!target.closest('.project-menu-container')) {
        setOpenMenuId(null);
      }
    }
    
    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const handleMenuToggle = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Menu toggle clicked for project:', projectId, 'Current openMenuId:', openMenuId);
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  const handleDeleteClick = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setProjectToDelete(projectId);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const response = await updateProjectAPI(projectToDelete, { isActive: false });
      if (response.success) {
        // Remove the project from the local state
        setProjects(projects.filter(project => project._id !== projectToDelete));
        setShowDeleteModal(false);
        setProjectToDelete(null);
        
        // Show success toast
        toast.success('Project deleted successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Failed to delete project: ' + response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `about ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `about ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `about ${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `about ${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0090c4]">
      <Header />
      <div className="flex-1 w-full bg-[#0090c4]">
        <div className="flex flex-col p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 flex items-center gap-2 text-center">
              {(data?.data?.name || 'User').charAt(0).toUpperCase() + (data?.data?.name || 'User').slice(1)}'s Workspace
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 text-center px-4" style={{ color: '#fff' }}>
              Manage and organize your AI-powered projects
            </p>
          </div>
          
          {/* Project history section */}
          <div className="w-full mt-10 px-0 sm:px-0 bg-transparent border-0 rounded-none shadow-none">
            <div className="flex flex-col sm:flex-row gap-3 mb-8 items-center px-4 sm:px-8 lg:px-24">
              <button
                className="px-6 py-2 rounded-lg bg-white text-black font-semibold shadow hover:bg-blue-100 transition flex items-center gap-2"
                onClick={() => navigate('/source')}
              >
                <span className="text-2xl leading-none">+</span>
                New Project
              </button>
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              />
              {/* Custom Sort Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  type="button"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-40 flex items-center justify-between focus:outline-none bg-white"
                  onClick={() => setSortDropdownOpen((v) => !v)}
                >
                  {sortOptions.find((o) => o.value === sort)?.label || "Sort"}
                  <svg className="ml-2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {sortDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500">Sort by</div>
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`flex items-center w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 ${sort === option.value ? "font-semibold text-gray-900" : "text-gray-700"}`}
                        onClick={() => { setSort(option.value); setSortDropdownOpen(false); }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* End Custom Sort Dropdown */}
            </div>
            
            {loading ? (
              <div className="text-center text-white px-4 sm:px-8 lg:px-24">Loading projects...</div>
            ) : error ? (
              <div className="text-red-300 text-center px-4 sm:px-8 lg:px-24">{error}</div>
            ) : projects.length === 0 ? (
              <div className="text-white text-center py-8 px-4 sm:px-8 lg:px-24">No projects found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-24 pb-12">
                {filteredProjects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-[#faf7f2] border border-gray-200 rounded-xl shadow p-6 flex flex-col items-start hover:shadow-md transition cursor-pointer relative"
                    onClick={() => navigate(`/project/${project._id}`)}
                  >
                    {/* Three-dot menu button */}
                    <div className="absolute top-3 right-3 project-menu-container">
                      <button 
                        onClick={(e) => handleMenuToggle(project._id, e)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      
                      {/* Dropdown menu */}
                      {openMenuId === project._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-50">
                          <div className="py-1">
                            <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors">
                              <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Rename
                            </button>
                            <button 
                              className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                              onClick={(e) => handleDeleteClick(project._id, e)}
                            >
                              <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <span className="font-semibold text-gray-800 text-lg truncate w-full mb-2">{project.name}</span>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-800 text-base">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <div className="text-gray-800 font-medium text-sm">{project.name}</div>
                        <div className="text-gray-500 text-xs">Edited {formatTimeAgo(project.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        isLoading={isDeleting}
      />
      
      {/* <Footer /> */}
    </div>
  );
}

export default Workspace;
