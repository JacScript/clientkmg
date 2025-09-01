import { Sparkles } from 'lucide-react';
import React from 'react';

const LoadingSpinner = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-blue-600 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading requests...</p>
          <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
        </div>
      </div>
    // <div className="flex items-center justify-center min-h-[100vh]">
    //   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    //   <span className="ml-3 text-gray-600">Loading...</span>
    // </div>
  );
};

export default LoadingSpinner;