import React, { useState } from 'react';
import PhotoCard from './PhotoCard';
// import { Camera, Filter, Grid, Layers } from 'lucide-react';
import { FaCamera , FaFilter} from "react-icons/fa";
import { IoGridOutline, IoLayersOutline } from "react-icons/io5";
// import img1 from "../../assets/images/rome1.jpeg"
// import img2 from "../../assets/images/rome2.jpeg"
// import img3 from "../../assets/images/rome3.jpeg"
// import img4 from "../../assets/images/eiffel2.jpg"
// import img5 from "../../assets/images/barcelona.jpeg"
// import img6 from "../../assets/images/Berlin.jpg"
// import img7 from "../../assets/images/brussels.jpg"
// import img8 from "../../assets/images/france.jpeg"
// import img9 from "../../assets/images/img12.jpg"
// import img10 from "../../assets/images/img13.jpg"
// import img11 from "../../assets/images/img15.jpg"
// import img12 from "../../assets/images/img16.jpg"

const PhotoGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const photos = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421030/rome1_jpbdnh.jpg",
      alt: "Two elegant ladies are enjoying their journey.",
      title: "Rome",
      description: "Two elegant ladies are enjoying their journey.",
      category: "rome",
      size: "large"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421121/rome2_st2ixd.jpg",
      alt: "Gray laptop computer",
      title: "Monument aux Morts",
      description: "The lady appears to be observing the monument with a contemplative and respectful demeanor",
      category: "paris",
      size: "medium"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421196/rome3_vbdxea.jpg",
      alt: "I love Rouen",
      title: "I love Rouen",
      description: 'The two ladies are captured in a joyful moment, posing playfully with the "I love Rouen" sign, indicating their appreciation for the city',
      category: "paris",
      size: "large"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421313/eiffel2_jhfnxk.jpg",
      alt: "Street Of Paris",
      title: "Streets Of Paris",
      description: "Street Of Paris",
      category: "paris",
      size: "wide"
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421429/barcelona_ncfpxj.jpg",
      alt: "At trip at the UNI of Barcelona",
      title: "University of Barcelona",
      description: "Two beautiful ladies are seen enjoying their trip at the University of Barcelona, likely appreciating the stunning architecture and vibrant academic atmosphere.",
      category: "barcelona",
      size: "medium"
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421910/Berlin_hkkbus.jpg",
      alt: "Brandenburg Gate ",
      title: "Brandenburg Gate",
      description: "Brandenburg Gate at Night",
      category: "german",
      size: "wide"
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750390239/brussels_nhf7b5.jpg",
      alt: "Mont des Arts",
      title: "Mont des Arts",
      description: "AI and robotics",
      category: "brussels",
      size: "medium"
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750422197/france_c9vgbb.jpg",
      alt: "Arc de Triomphe",
      title: "Arc de Triomphe",
      description: "The two ladies are clearly enjoying their vacation, evident in their relaxed postures and radiant smiles captured in front of the iconic Arc de Triomphe.",
      category: "paris",
      size: "small"
    },
     {
      id: 9,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398579/img12_kaclmj.jpg",
      alt: " Mont Saint-Michel",
      title: "Mont Saint-Michel, France.",
      description: "The individuals in the picture appear to be enjoying their visit to Mont Saint-Michel, as they are seen exploring the area around the famous abbey.",
      category: "paris",
      size: "medium"
    },
    {
      id: 10,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423042/img13_trquev.jpg",
      alt: "Kiosque Tour Eiffel",
      title: "Kiosque Tour Eiffel, France",
      description: "The lady is clearly enjoying her moment at the Eiffel Tower, as evidenced by her bright smile and expressive pose in front of the iconic landmark.",
      category: "paris",
      size: "small"
    },
     {
      id: 11,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423439/img15_drg7n7.jpg",
      alt: "famous vineyards at Bordeaux",
      title: "Vineyards at Bordeaux",
      description: "The individual in the picture appears to be thoroughly enjoying the moment at the vineyard, taking in the serene beauty of the expansive rows of grapevines under the clear sky.",
      category: "paris",
      size: "medium"
    },
    {
      id: 12,
      src: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423692/img16_rayfxe.jpg",
      alt: "famous vineyards at Bordeaux",
      title: "Vineyards at Bordeaux",
      description: "The individual in the picture appears to be thoroughly enjoying the moment at the vineyard, taking in the serene beauty of the expansive rows of grapevines under the clear sky.",
      category: "paris",
      size: "small"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', icon: IoGridOutline },
    { id: 'rome', label: 'Rome', icon: IoLayersOutline },
    { id: 'german', label: 'German', icon: IoLayersOutline },
    { id: 'paris', label: 'France', icon: IoLayersOutline }
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
      {/* <div className="text-center mt-16">
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
      </div> */}
    </section>
  );
};

export default PhotoGallery;
