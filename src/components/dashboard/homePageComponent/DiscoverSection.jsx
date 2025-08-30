import React from 'react';

const DiscoverSection = ({ discoverSection, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Discover Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={discoverSection.heading || ''}
            onChange={(e) => handleInputChange('discoverSection', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <textarea
            value={discoverSection.subheading || ''}
            onChange={(e) => handleInputChange('discoverSection', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={discoverSection.buttonText || ''}
            onChange={(e) => handleInputChange('discoverSection', 'buttonText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={discoverSection.buttonLink || ''}
            onChange={(e) => handleInputChange('discoverSection', 'buttonLink', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={discoverSection.image || ''}
            onChange={(e) => handleInputChange('discoverSection', 'image', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;