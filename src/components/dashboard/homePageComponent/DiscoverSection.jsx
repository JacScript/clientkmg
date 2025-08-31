

import React, { useState, useCallback } from 'react';

const DiscoverSection = ({ discoverSection, handleInputChange }) => {
  // Track drag state for the image upload area
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  // Function to handle file dropping
  const handleFileDrop = useCallback((files) => {
    if (files && files[0]) {
      const file = files[0];
      
      // Only accept images
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      uploadToCloudinary(file);
    }
  }, []);
  
  // Real Cloudinary upload function
  const uploadToCloudinary = useCallback(async (file) => {
    try {
      // Show uploading state
      handleInputChange('discoverSection', 'image', 'uploading...');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      // Update with the real Cloudinary URL
      handleInputChange('discoverSection', 'image', data.secure_url);
      
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      alert('Failed to upload image. Please try again.');
      // Clear the uploading state
      handleInputChange('discoverSection', 'image', '');
    }
  }, [handleInputChange]);
  
  // Function to optimize Cloudinary URLs for preview
  const getOptimizedImageUrl = useCallback((url) => {
    if (!url || url === 'uploading...') return '';
    
    if (url.includes('cloudinary.com')) {
      const urlParts = url.split('/upload/');
      if (urlParts.length === 2) {
        return `${urlParts[0]}/upload/c_thumb,w_300,q_auto/${urlParts[1]}`;
      }
    }
    
    return url;
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Discover Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={discoverSection?.heading || ''}
            onChange={(e) => handleInputChange('discoverSection', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <textarea
            value={discoverSection?.subheading || ''}
            onChange={(e) => handleInputChange('discoverSection', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={discoverSection?.buttonText || ''}
            onChange={(e) => handleInputChange('discoverSection', 'buttonText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={discoverSection?.buttonLink || ''}
            onChange={(e) => handleInputChange('discoverSection', 'buttonLink', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {/* Image Upload Section */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">Discover Section Image</label>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Preview/Upload Area */}
            <div>
              <div 
                className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-48 transition-colors cursor-pointer ${
                  isDraggedOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : discoverSection?.image && discoverSection.image !== 'uploading...'
                      ? 'border-gray-200 bg-gray-50' 
                      : 'border-gray-300 bg-gray-100'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggedOver(true);
                }}
                onDragLeave={() => setIsDraggedOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggedOver(false);
                  handleFileDrop(e.dataTransfer.files);
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => handleFileDrop(e.target.files);
                  input.click();
                }}
              >
                {discoverSection?.image === 'uploading...' ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                    <span className="text-sm text-gray-500">Uploading image...</span>
                  </div>
                ) : discoverSection?.image ? (
                  <>
                    <img
                      src={getOptimizedImageUrl(discoverSection.image)}
                      alt="Discover section preview"
                      className="max-w-full max-h-32 object-contain mb-3"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Preview';
                      }}
                    />
                    <span className="text-xs text-gray-500 text-center">
                      Drag new image here or click to replace
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Drag image here or click to upload
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* Manual URL Input */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter image URL manually:
              </label>
              <input
                type="text"
                value={discoverSection?.image === 'uploading...' ? '' : discoverSection?.image || ''}
                onChange={(e) => handleInputChange('discoverSection', 'image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                disabled={discoverSection?.image === 'uploading...'}
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              
              {/* URL Preview */}
              {discoverSection?.image && 
               discoverSection.image !== 'uploading...' && 
               discoverSection.image.startsWith('http') && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">URL Preview:</p>
                  <img
                    src={discoverSection.image}
                    alt="URL preview"
                    className="max-w-full h-24 object-contain border rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      e.target.style.display = 'block';
                    }}
                  />
                </div>
              )}
              
              {/* Clear Image Button */}
              {discoverSection?.image && discoverSection.image !== 'uploading...' && (
                <button
                  type="button"
                  onClick={() => handleInputChange('discoverSection', 'image', '')}
                  className="mt-3 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded border border-red-200"
                >
                  Clear Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;