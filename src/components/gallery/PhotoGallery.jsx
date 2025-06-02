import React, { useState } from 'react';
import PhotoCard from './PhotoCard';
// import { Camera, Filter, Grid, Layers } from 'lucide-react';
import { FaCamera , FaFilter} from "react-icons/fa";
import { IoGridOutline, IoLayersOutline } from "react-icons/io5";

const PhotoGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=800&fit=crop",
      alt: "Woman with laptop",
      title: "Creative Workspace",
      description: "Modern workspace photography",
      category: "lifestyle",
      size: "large"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop",
      alt: "Gray laptop computer",
      title: "Technology Focus",
      description: "Clean tech aesthetics",
      category: "tech",
      size: "medium"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=700&fit=crop",
      alt: "Circuit board macro",
      title: "Digital Circuits",
      description: "Abstract technology patterns",
      category: "tech",
      size: "medium"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop",
      alt: "Yellow lights between trees",
      title: "Night Ambiance",
      description: "Atmospheric lighting",
      category: "nature",
      size: "wide"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=600&fit=crop",
      alt: "Water surrounded by trees",
      title: "Natural Beauty",
      description: "Landscape photography",
      category: "nature",
      size: "medium"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=500&fit=crop",
      alt: "Java programming monitor",
      title: "Code in Action",
      description: "Software development",
      category: "tech",
      size: "wide"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=700&fit=crop",
      alt: "White robot near wall",
      title: "Future Vision",
      description: "AI and robotics",
      category: "tech",
      size: "medium"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      alt: "Woman using laptop",
      title: "Remote Work",
      description: "Modern lifestyle",
      category: "lifestyle",
      size: "small"
    },
     {
      id: 9,
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=700&fit=crop",
      alt: "White robot near wall",
      title: "Future Vision",
      description: "AI and robotics",
      category: "tech",
      size: "medium"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      alt: "Woman using laptop",
      title: "Remote Work",
      description: "Modern lifestyle",
      category: "lifestyle",
      size: "small"
    },
     {
      id: 11,
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=700&fit=crop",
      alt: "White robot near wall",
      title: "Future Vision",
      description: "AI and robotics",
      category: "tech",
      size: "medium"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      alt: "Woman using laptop",
      title: "Remote Work",
      description: "Modern lifestyle",
      category: "lifestyle",
      size: "small"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', icon: IoGridOutline },
    { id: 'tech', label: 'Technology', icon: IoLayersOutline },
    { id: 'nature', label: 'Nature', icon: FaCamera },
    { id: 'lifestyle', label: 'Lifestyle', icon: FaFilter }
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
     

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={photo.id} 
            className={`break-inside-avoid animate-fade-in ${
              photo.size === 'large' ? 'sm:col-span-2' : 
              photo.size === 'wide' ? 'lg:col-span-2' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PhotoCard
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              description={photo.description}
            />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
          <div className="text-gray-600">Photos Captured</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
          <div className="text-gray-600">Gallery Collections</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
          <div className="text-3xl font-bold text-pink-600 mb-2">5</div>
          <div className="text-gray-600">Years Experience</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to see more of my work?
          </h3>
          <p className="text-gray-600">
            Browse through my complete portfolio or get in touch for custom photography services.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            View Full Portfolio
          </button>
          <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
