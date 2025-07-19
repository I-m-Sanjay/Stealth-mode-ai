const Project = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0090c4]">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Created!</h1>
        <p className="text-gray-600 mb-6">Your AI project is being generated. You'll be notified when it's ready.</p>
        <button 
          onClick={() => window.history.back()} 
          className="bg-[#1c8bc7] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#157eb3] transition-colors"
        >
          Back to Source
        </button>
      </div>
    </div>
  );
};

export default Project;
