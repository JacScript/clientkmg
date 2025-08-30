import React from 'react';

const WhySection = ({ whySection, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Why Choose Us Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={whySection.title || ''}
            onChange={(e) => handleInputChange('whySection', 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
          <input
            type="text"
            value={whySection.heading || ''}
            onChange={(e) => handleInputChange('whySection', 'heading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
          <textarea
            value={whySection.subheading || ''}
            onChange={(e) => handleInputChange('whySection', 'subheading', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="5"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            value={whySection.buttonText || ''}
            onChange={(e) => handleInputChange('whySection', 'buttonText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
          <input
            type="text"
            value={whySection.buttonLink || ''}
            onChange={(e) => handleInputChange('whySection', 'buttonLink', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={whySection.image || ''}
            onChange={(e) => handleInputChange('whySection', 'image', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WhySection;