import React from 'react';

const HeroSection = ({ heroSection, handleInputChange, addImage, removeImage }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hero Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={heroSection.heading || ''}
            onChange={(e) => handleInputChange('heroSection', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <input
            type="text"
            value={heroSection.subheading || ''}
            onChange={(e) => handleInputChange('heroSection', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={heroSection.buttonText || ''}
            onChange={(e) => handleInputChange('heroSection', 'buttonText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={heroSection.buttonLink || ''}
            onChange={(e) => handleInputChange('heroSection', 'buttonLink', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
          <input
            type="text"
            value={heroSection.badge || ''}
            onChange={(e) => handleInputChange('heroSection', 'badge', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Background Images</h3>
          <button
            type="button"
            onClick={() => addImage('heroSection', 'backgroundImage')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Image
          </button>
        </div>
        
        <div className="space-y-6">
          {heroSection.backgroundImage.map((image, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Image {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeImage('heroSection', 'backgroundImage', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={image.url || ''}
                    onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, index, 'url')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={image.title || ''}
                    onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, index, 'title')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={image.description || ''}
                    onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, index, 'description')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;