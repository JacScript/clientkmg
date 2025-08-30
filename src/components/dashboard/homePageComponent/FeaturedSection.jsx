import React from 'react';

const FeaturedSection = ({ featuredSections, handleInputChange, addImage, removeImage }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Featured Tours Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={featuredSections.title || ''}
            onChange={(e) => handleInputChange('featuredSections', 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={featuredSections.heading || ''}
            onChange={(e) => handleInputChange('featuredSections', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <textarea
            value={featuredSections.subheading || ''}
            onChange={(e) => handleInputChange('featuredSections', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Tour Images</h3>
          <button
            type="button"
            onClick={() => addImage('featuredSections', 'backgroundImage')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Tour
          </button>
        </div>
        
        <div className="space-y-6">
          {featuredSections.backgroundImage.map((tour, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Tour {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeImage('featuredSections', 'backgroundImage', index)}
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
                    value={tour.url || ''}
                    onChange={(e) => handleInputChange('featuredSections', 'backgroundImage', e.target.value, index, 'url')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={tour.title || ''}
                    onChange={(e) => handleInputChange('featuredSections', 'backgroundImage', e.target.value, index, 'title')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={tour.rate || 0}
                    onChange={(e) => handleInputChange('featuredSections', 'backgroundImage', parseFloat(e.target.value), index, 'rate')}
                    className="w-full p-2 border border-gray-300 rounded-md"
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

export default FeaturedSection;