import React, { useState, useRef, useEffect } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { getProjects, type IProject } from "../api/services/projectService";

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
                    className="bg-[#faf7f2] border border-gray-200 rounded-xl shadow p-6 flex flex-col items-start hover:shadow-md transition cursor-pointer"
                    onClick={() => navigate(`/project/${project._id}`)}
                  >
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
      {/* <Footer /> */}
    </div>
  );
}

export default Workspace;
