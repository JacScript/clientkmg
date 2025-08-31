import React, { useState, useCallback, useRef } from 'react';

const FeaturedSection = ({ featuredSections, handleInputChange, addImage, removeImage }) => {
  // Track which image is currently being dragged over
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  
  // Use refs to prevent multiple rapid clicks
  const addButtonRef = useRef(null);
  const removeButtonRefs = useRef({});
  const lastClickTimeRef = useRef(0);

  // Function to handle file dropping
  const handleFileDrop = useCallback((index, files) => {
    if (files && files[0]) {
      const file = files[0];
      
      // Only accept images
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      uploadToCloudinary(file, index);
    }
  }, []);
  
  // Real Cloudinary upload function
  const uploadToCloudinary = useCallback(async (file, index) => {
    try {
      // Show uploading state
      handleInputChange('featuredSections', 'backgroundImage', 'uploading...', index, 'url');
      
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
      handleInputChange('featuredSections', 'backgroundImage', data.secure_url, index, 'url');
      
      // Set default title if none exists
      if (!featuredSections.backgroundImage[index]?.title) {
        const defaultTitle = file.name.split('.').slice(0, -1).join('.');
        handleInputChange('featuredSections', 'backgroundImage', defaultTitle, index, 'title');
      }
      
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      alert('Failed to upload image. Please try again.');
      // Clear the uploading state
      handleInputChange('featuredSections', 'backgroundImage', '', index, 'url');
    }
  }, [handleInputChange, featuredSections.backgroundImage]);
  
  // Function to optimize Cloudinary URLs for preview
  const getOptimizedImageUrl = useCallback((url) => {
    if (!url || url === 'uploading...') return '';
    
    if (url.includes('cloudinary.com')) {
      const urlParts = url.split('/upload/');
      if (urlParts.length === 2) {
        return `${urlParts[0]}/upload/c_thumb,w_200,q_auto/${urlParts[1]}`;
      }
    }
    
    return url;
  }, []);

  // Handle adding a new tour with enhanced debouncing
  const handleAddImage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    
    // Prevent rapid clicks (less than 1.5 seconds)
    if (timeSinceLastClick < 1500) {
      console.log('Add button click ignored - too rapid');
      return;
    }
    
    lastClickTimeRef.current = now;
    
    // Disable button temporarily
    if (addButtonRef.current) {
      addButtonRef.current.disabled = true;
      setTimeout(() => {
        if (addButtonRef.current) {
          addButtonRef.current.disabled = false;
        }
      }, 1500);
    }
    
    console.log('Add button clicked - calling addImage');
    addImage('featuredSections', 'backgroundImage');
  }, [addImage]);
  
  // Handle removing a tour with enhanced debouncing
  const handleRemoveImage = useCallback((e, index) => {
    e.preventDefault();
    e.stopPropagation();
    
    const now = Date.now();
    const buttonId = `remove-${index}`;
    
    // Check if this specific button was recently clicked
    if (removeButtonRefs.current[buttonId] && (now - removeButtonRefs.current[buttonId]) < 1500) {
      console.log(`Remove button ${index} click ignored - too rapid`);
      return;
    }
    
    removeButtonRefs.current[buttonId] = now;
    
    // Disable this specific remove button temporarily
    const buttonElement = e.target;
    buttonElement.disabled = true;
    setTimeout(() => {
      buttonElement.disabled = false;
    }, 1500);
    
    console.log(`Remove button ${index} clicked - calling removeImage`);
    removeImage('featuredSections', 'backgroundImage', index);
  }, [removeImage]);

  // Ensure backgroundImage is always an array
  const tourImages = Array.isArray(featuredSections?.backgroundImage) ? featuredSections.backgroundImage : [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Featured Tours Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={featuredSections?.title || ''}
            onChange={(e) => handleInputChange('featuredSections', 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={featuredSections?.heading || ''}
            onChange={(e) => handleInputChange('featuredSections', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <textarea
            value={featuredSections?.subheading || ''}
            onChange={(e) => handleInputChange('featuredSections', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Tour Images ({tourImages.length})</h3>
          <button
            ref={addButtonRef}
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Tour
          </button>
        </div>
        
        {/* Show tours in reverse order - newest first */}
        <div className="space-y-6">
          {[...tourImages].reverse().map((tour, reversedIndex) => {
            // Calculate the original index in the actual array
            const originalIndex = tourImages.length - 1 - reversedIndex;
            return (
              <div key={`tour-${originalIndex}-${tour?.url || 'empty'}`} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Tour {originalIndex + 1} {reversedIndex === 0 && tourImages.length > 1 ? '(Latest)' : ''}</h4>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveImage(e, originalIndex)}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Image Preview/Upload - Column 1 */}
                  <div className="md:row-span-2">
                    <div 
                      className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 transition-colors cursor-pointer ${
                        draggedOverIndex === originalIndex 
                          ? 'border-blue-500 bg-blue-50' 
                          : tour?.url && tour.url !== 'uploading...'
                            ? 'border-gray-200 bg-gray-50' 
                            : 'border-gray-300 bg-gray-100'
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDraggedOverIndex(originalIndex);
                      }}
                      onDragLeave={() => setDraggedOverIndex(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDraggedOverIndex(null);
                        handleFileDrop(originalIndex, e.dataTransfer.files);
                      }}
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => handleFileDrop(originalIndex, e.target.files);
                        input.click();
                      }}
                    >
                      {tour?.url === 'uploading...' ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                          <span className="text-sm text-gray-500">Uploading...</span>
                        </div>
                      ) : tour?.url ? (
                        <>
                          <img
                            src={getOptimizedImageUrl(tour.url)}
                            alt={tour.title || `Tour ${originalIndex + 1}`}
                            className="max-w-full max-h-24 object-contain mb-2"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150x100?text=Preview';
                            }}
                          />
                          <span className="text-xs text-gray-500">Drag new image or click to replace</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">
                            Drag image here or click to upload
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Form Fields - Columns 2-3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manual URL (optional)</label>
                    <input
                      type="text"
                      value={tour?.url === 'uploading...' ? '' : tour?.url || ''}
                      onChange={(e) => handleInputChange('featuredSections', 'backgroundImage', e.target.value, originalIndex, 'url')}
                      placeholder="https://example.com/image.jpg"
                      disabled={tour?.url === 'uploading...'}
                      className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={tour?.title || ''}
                      onChange={(e) => handleInputChange('featuredSections', 'backgroundImage', e.target.value, originalIndex, 'title')}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={tour?.rate || 0}
                      onChange={(e) => handleInputChange('featuredSections', 'backgroundImage', parseFloat(e.target.value) || 0, originalIndex, 'rate')}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {tourImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tours added yet. Click "Add Tour" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;