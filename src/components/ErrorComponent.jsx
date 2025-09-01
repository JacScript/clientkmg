import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const ErrorDisplay = ({ 
  error = null, 
  queryKey = ["requests"], 
  title = "Error loading requests", 
  message = "Something went wrong",
  onRetry = null
}) => {
  const queryClient = useQueryClient();
  
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      queryClient.invalidateQueries({ queryKey });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
        <div className="text-red-500 mb-4">
          <AlertCircle size={56} className="mx-auto" />
        </div>
        <p className="text-red-600 text-xl font-semibold mb-2">{title}</p>
        <p className="text-gray-600 text-sm mb-6">{error?.message || message}</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;