import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getProjects, type IProject } from "../../api/services/projectService";

interface ProjectHistoryProps {
  projects?: IProject[]; // Make projects optional since we'll fetch them
}

const sortOptions = [
  { label: "Newest First", value: "last_edited" },
  { label: "Oldest First", value: "date_created" },
  { label: "Alphabetical", value: "alphabetical" },
];

const ProjectHistory: React.FC<ProjectHistoryProps> = ({ projects: propProjects }) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("last_edited");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Get user data from Redux
  const { data: userData } = useAppSelector((state) => state.user);

  // Simple flag to prevent duplicate API calls in React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchProjects = async () => {
      // If projects are passed as props, use them
      if (propProjects) {
        setProjects(propProjects);
        return;
      }

      // Otherwise fetch from API
      if (!userData?.data?._id) {
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
        const response = await getProjects(userData.data._id);
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
  }, [userData?.data?._id, propProjects]);

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

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow border border-gray-200 p-6">
        <div className="text-center">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow border border-gray-200 p-6">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {(() => {
            const userName = userData?.data?.name || 'User';
            const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
            return `${capitalizedName}'s Workspace`;
          })()}
        </h2>
        <button 
          onClick={() => navigate('/workspace')}
          className="text-gray-700 font-semibold hover:underline ml-auto sm:ml-0 text-right cursor-pointer"
        >
          View All
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-8 items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {/* Custom Sort Dropdown */}
        <div className="relative" ref={sortDropdownRef}>
          <button
            type="button"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-40 flex items-center justify-between focus:outline-none bg-white"
            onClick={() => setSortDropdownOpen((v) => !v)}
          >
            {sortOptions.find((o) => o.value === sort)?.label || "Sort"}
            <svg className="ml-2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
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
      </div>
      
      {projects.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No projects found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-[#faf7f2] border border-gray-200 rounded-xl shadow p-6 flex flex-col items-start hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <span className="font-semibold text-gray-800 text-lg truncate w-full mb-2">
                {project.name}
              </span>
              <div className="flex items-center gap-2 mt-auto">
                <span className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-800 text-base">
                  {project.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <div className="text-gray-800 font-medium text-sm">{project.name}</div>
                  <div className="text-gray-500 text-xs">
                    Edited {formatTimeAgo(project.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectHistory; 