import React from 'react';

interface ProjectHistoryProps {
  projects: string[];
}

const ProjectHistory: React.FC<ProjectHistoryProps> = ({ projects }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-3xl mt-8">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Recent Projects
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-opacity-20 transition-all duration-200 border border-white border-opacity-20"
          >
            <div className="text-white text-sm font-medium truncate">
              {project}
            </div>
            <div className="text-white text-opacity-60 text-xs mt-1">
              {Math.floor(Math.random() * 24) + 1}h ago
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectHistory; 