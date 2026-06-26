import React, { useState, useCallback, useRef } from 'react';
import { useSnackbar } from 'notistack';

const HeroSection = ({ heroSection, handleInputChange, addImage, removeImage, onImageUploaded }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const addButtonRef = useRef(null);
  const removeButtonRefs = useRef({});
  const lastClickTimeRef = useRef(0);

  const handleFileDrop = useCallback((index, files) => {
    if (files && files[0]) {
      const file = files[0];

      if (!file.type.startsWith('image/')) {
        enqueueSnackbar('Please upload an image file', { variant: 'warning' });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        uploadToCloudinary(file, index);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const uploadToCloudinary = useCallback(async (file, index) => {
    try {
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      if (!preset || !cloudName) {
        enqueueSnackbar('Cloudinary config missing. Check your .env file and restart the dev server.', { variant: 'error' });
        return;
      }

      handleInputChange('heroSection', 'backgroundImage', 'uploading...', index, 'url');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error?.message || 'Upload failed');
      }

      const data = await response.json();

      // Update state with the uploaded image URL
      handleInputChange('heroSection', 'backgroundImage', data.secure_url, index, 'url');

      if (!heroSection.backgroundImage[index]?.title) {
        const defaultTitle = file.name.split('.').slice(0, -1).join('.');
        handleInputChange('heroSection', 'backgroundImage', defaultTitle, index, 'title');
      }

      enqueueSnackbar('Image uploaded successfully! Saving to database...', { variant: 'success' });

      // ✅ Auto-save to DB after successful Cloudinary upload
      // Small delay (150ms) ensures React has flushed the state updates above
      // before the mutation reads the latest homeData via the functional setState trick
      if (onImageUploaded) {
        setTimeout(() => onImageUploaded(), 150);
      }

    } catch (error) {
      enqueueSnackbar(`Failed to upload image: ${error.message}`, { variant: 'error' });
      handleInputChange('heroSection', 'backgroundImage', '', index, 'url');
    }
  }, [handleInputChange, heroSection.backgroundImage, onImageUploaded]);

  const getOptimizedImageUrl = useCallback((url) => {
    if (!url) return '';
    if (url.includes('cloudinary.com')) {
      const urlParts = url.split('/upload/');
      if (urlParts.length === 2) {
        return `${urlParts[0]}/upload/c_thumb,w_200,q_auto/${urlParts[1]}`;
      }
    }
    return url;
  }, []);

  const handleAddImage = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;

    if (timeSinceLastClick < 1500) {
      return;
    }

    lastClickTimeRef.current = now;

    if (addButtonRef.current) {
      addButtonRef.current.disabled = true;
      setTimeout(() => {
        if (addButtonRef.current) addButtonRef.current.disabled = false;
      }, 1500);
    }

    addImage('heroSection', 'backgroundImage');
  }, [addImage]);

  const handleRemoveImage = useCallback((e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const buttonId = `remove-${index}`;

    if (removeButtonRefs.current[buttonId] && (now - removeButtonRefs.current[buttonId]) < 1500) {
      return;
    }

    removeButtonRefs.current[buttonId] = now;

    const buttonElement = e.target;
    buttonElement.disabled = true;
    setTimeout(() => {
      buttonElement.disabled = false;
    }, 1500);

    removeImage('heroSection', 'backgroundImage', index);
    enqueueSnackbar('Image removed', { variant: 'info' });
  }, [removeImage]);

  const backgroundImages = Array.isArray(heroSection?.backgroundImage) ? heroSection.backgroundImage : [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hero Section</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={heroSection?.heading || ''}
            onChange={(e) => handleInputChange('heroSection', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <input
            type="text"
            value={heroSection?.subheading || ''}
            onChange={(e) => handleInputChange('heroSection', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={heroSection?.buttonText || ''}
            onChange={(e) => handleInputChange('heroSection', 'buttonText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={heroSection?.buttonLink || ''}
            onChange={(e) => handleInputChange('heroSection', 'buttonLink', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
          <input
            type="text"
            value={heroSection?.badge || ''}
            onChange={(e) => handleInputChange('heroSection', 'badge', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Background Images ({backgroundImages.length})</h3>
          <button
            ref={addButtonRef}
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Image
          </button>
        </div>

        <div className="space-y-6">
          {[...backgroundImages].reverse().map((image, reversedIndex) => {
            const originalIndex = backgroundImages.length - 1 - reversedIndex;
            return (
              <div key={`image-${originalIndex}-${image?.url || 'empty'}`} className="p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">
                    Image {originalIndex + 1}{reversedIndex === 0 && backgroundImages.length > 1 ? ' (Latest)' : ''}
                  </h4>
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
                          : image?.url
                            ? 'border-gray-200 bg-gray-50'
                            : 'border-gray-300 bg-gray-100'
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDraggedOverIndex(originalIndex); }}
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
                      {image?.url === 'uploading...' ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                          <span className="text-sm text-gray-500">Uploading...</span>
                        </div>
                      ) : image?.url ? (
                        <>
                          <img
                            src={getOptimizedImageUrl(image.url)}
                            alt={image.title || `Image ${originalIndex + 1}`}
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
                          <p className="mt-2 text-sm text-gray-500">Drag image here or click to upload</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Form Fields - Columns 2-3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={image?.title || ''}
                      onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, originalIndex, 'title')}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={image?.description || ''}
                      onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, originalIndex, 'description')}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {backgroundImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No background images added yet. Click "Add Image" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;


































// import React, { useState, useCallback, useRef } from 'react';
// import { useSnackbar } from 'notistack';

// const HeroSection = ({ heroSection, handleInputChange, addImage, removeImage }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const [draggedOverIndex, setDraggedOverIndex] = useState(null);

//   const addButtonRef = useRef(null);
//   const removeButtonRefs = useRef({});
//   const lastClickTimeRef = useRef(0);

//   const handleFileDrop = useCallback((index, files) => {
//     if (files && files[0]) {
//       const file = files[0];

//       if (!file.type.startsWith('image/')) {
//         enqueueSnackbar('Please upload an image file', { variant: 'warning' });
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = () => {
//         uploadToCloudinary(file, index);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const uploadToCloudinary = useCallback(async (file, index) => {
//     try {
//       const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

//       // console.log('ENV CHECK:', { preset, cloudName });

//       if (!preset || !cloudName) {
//         enqueueSnackbar('Cloudinary config missing. Check your .env file and restart the dev server.', { variant: 'error' });
//         return;
//       }

//       handleInputChange('heroSection', 'backgroundImage', 'uploading...', index, 'url');

//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', preset);

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         { method: 'POST', body: formData }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         // console.error('Cloudinary rejected:', JSON.stringify(errorData, null, 2));
//         throw new Error(errorData?.error?.message || 'Upload failed');
//       }

//       const data = await response.json();
//       handleInputChange('heroSection', 'backgroundImage', data.secure_url, index, 'url');

//       if (!heroSection.backgroundImage[index]?.title) {
//         const defaultTitle = file.name.split('.').slice(0, -1).join('.');
//         handleInputChange('heroSection', 'backgroundImage', defaultTitle, index, 'title');
//       }

//       enqueueSnackbar('Image uploaded successfully!', { variant: 'success' });

//     } catch (error) {
//       // console.error('Cloudinary upload error:', error);
//       enqueueSnackbar(`Failed to upload image: ${error.message}`, { variant: 'error' });
//       handleInputChange('heroSection', 'backgroundImage', '', index, 'url');
//     }
//   }, [handleInputChange, heroSection.backgroundImage]);

//   const getOptimizedImageUrl = useCallback((url) => {
//     if (!url) return '';
//     if (url.includes('cloudinary.com')) {
//       const urlParts = url.split('/upload/');
//       if (urlParts.length === 2) {
//         return `${urlParts[0]}/upload/c_thumb,w_200,q_auto/${urlParts[1]}`;
//       }
//     }
//     return url;
//   }, []);

//   const handleAddImage = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const now = Date.now();
//     const timeSinceLastClick = now - lastClickTimeRef.current;

//     if (timeSinceLastClick < 1500) {
//       // console.log('Add button click ignored - too rapid');
//       return;
//     }

//     lastClickTimeRef.current = now;

//     if (addButtonRef.current) {
//       addButtonRef.current.disabled = true;
//       setTimeout(() => {
//         if (addButtonRef.current) addButtonRef.current.disabled = false;
//       }, 1500);
//     }

//     // console.log('Add button clicked - calling addImage');
//     addImage('heroSection', 'backgroundImage');
//   }, [addImage]);

//   const handleRemoveImage = useCallback((e, index) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const now = Date.now();
//     const buttonId = `remove-${index}`;

//     if (removeButtonRefs.current[buttonId] && (now - removeButtonRefs.current[buttonId]) < 1500) {
//       // console.log(`Remove button ${index} click ignored - too rapid`);
//       return;
//     }

//     removeButtonRefs.current[buttonId] = now;

//     const buttonElement = e.target;
//     buttonElement.disabled = true;
//     setTimeout(() => {
//       buttonElement.disabled = false;
//     }, 1500);

//     // console.log(`Remove button ${index} clicked - calling removeImage`);
//     removeImage('heroSection', 'backgroundImage', index);
//     enqueueSnackbar('Image removed', { variant: 'info' });
//   }, [removeImage]);

//   const backgroundImages = Array.isArray(heroSection?.backgroundImage) ? heroSection.backgroundImage : [];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold">Hero Section</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
//           <input
//             type="text"
//             value={heroSection?.heading || ''}
//             onChange={(e) => handleInputChange('heroSection', 'heading', e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
//           <input
//             type="text"
//             value={heroSection?.subheading || ''}
//             onChange={(e) => handleInputChange('heroSection', 'subheading', e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
//           <input
//             type="text"
//             value={heroSection?.buttonText || ''}
//             onChange={(e) => handleInputChange('heroSection', 'buttonText', e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
//           <input
//             type="text"
//             value={heroSection?.buttonLink || ''}
//             onChange={(e) => handleInputChange('heroSection', 'buttonLink', e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
//           <input
//             type="text"
//             value={heroSection?.badge || ''}
//             onChange={(e) => handleInputChange('heroSection', 'badge', e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium">Background Images ({backgroundImages.length})</h3>
//           <button
//             ref={addButtonRef}
//             type="button"
//             onClick={handleAddImage}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Add Image
//           </button>
//         </div>

//         <div className="space-y-6">
//           {[...backgroundImages].reverse().map((image, reversedIndex) => {
//             const originalIndex = backgroundImages.length - 1 - reversedIndex;
//             return (
//               <div key={`image-${originalIndex}-${image?.url || 'empty'}`} className="p-4 border border-gray-200 rounded-md">
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="font-medium">
//                     Image {originalIndex + 1}{reversedIndex === 0 && backgroundImages.length > 1 ? ' (Latest)' : ''}
//                   </h4>
//                   <button
//                     type="button"
//                     onClick={(e) => handleRemoveImage(e, originalIndex)}
//                     className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Remove
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {/* Image Preview/Upload - Column 1 */}
//                   <div className="md:row-span-2">
//                     <div
//                       className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center h-40 transition-colors cursor-pointer ${
//                         draggedOverIndex === originalIndex
//                           ? 'border-blue-500 bg-blue-50'
//                           : image?.url
//                             ? 'border-gray-200 bg-gray-50'
//                             : 'border-gray-300 bg-gray-100'
//                       }`}
//                       onDragOver={(e) => { e.preventDefault(); setDraggedOverIndex(originalIndex); }}
//                       onDragLeave={() => setDraggedOverIndex(null)}
//                       onDrop={(e) => {
//                         e.preventDefault();
//                         setDraggedOverIndex(null);
//                         handleFileDrop(originalIndex, e.dataTransfer.files);
//                       }}
//                       onClick={() => {
//                         const input = document.createElement('input');
//                         input.type = 'file';
//                         input.accept = 'image/*';
//                         input.onchange = (e) => handleFileDrop(originalIndex, e.target.files);
//                         input.click();
//                       }}
//                     >
//                       {image?.url === 'uploading...' ? (
//                         <div className="flex flex-col items-center">
//                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
//                           <span className="text-sm text-gray-500">Uploading...</span>
//                         </div>
//                       ) : image?.url ? (
//                         <>
//                           <img
//                             src={getOptimizedImageUrl(image.url)}
//                             alt={image.title || `Image ${originalIndex + 1}`}
//                             className="max-w-full max-h-24 object-contain mb-2"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = 'https://via.placeholder.com/150x100?text=Preview';
//                             }}
//                           />
//                           <span className="text-xs text-gray-500">Drag new image or click to replace</span>
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           <p className="mt-2 text-sm text-gray-500">Drag image here or click to upload</p>
//                           <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
//                         </>
//                       )}
//                     </div>
//                   </div>

//                   {/* Form Fields - Columns 2-3 */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       type="text"
//                       value={image?.title || ''}
//                       onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, originalIndex, 'title')}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={image?.description || ''}
//                       onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, originalIndex, 'description')}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                       rows="2"
//                     />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {backgroundImages.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No background images added yet. Click "Add Image" to get started.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;