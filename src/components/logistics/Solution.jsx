import React from 'react';
import { FaTruck, FaWarehouse, FaShippingFast, FaBoxes, FaGlobe } from 'react-icons/fa';

const Solution = () => {
  const solutions = [
    {
      id: 1,
      title: "Freight Transport",
      description: "Reliable freight transportation solutions across land, sea, and air",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop",
      icon: FaTruck,
    },
    {
      id: 2,
      title: "Warehouse Management",
      description: "State-of-the-art warehouse solutions for optimal storage",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop",
      icon: FaWarehouse,
    },
    {
      id: 3,
      title: "Global Shipping Network",
      description: "Comprehensive global shipping solutions connecting continents",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop",
      icon: FaGlobe,
    },
    {
      id: 4,
      title: "Express Delivery",
      description: "Fast and secure express delivery services worldwide",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      icon: FaShippingFast,
    },
    {
      id: 5,
      title: "Package Handling",
      description: "Professional package handling and distribution services",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      icon: FaBoxes,
    }
  ];


  const Icon5 = solutions[4].icon;
  return (
    <div 
      className='w-screen min-h-screen py-16 bg-cover bg-center bg-fixed relative'
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1920&h=1080&fit=crop')` 
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Logistics Solutions
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive logistics services designed to streamline your supply chain and optimize your operations
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* First Row - 4 Cards */}
          {solutions.slice(0, 4).map((solution, index) => (
            <div 
              key={solution.id}
              className={`group relative h-80 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 ${
                index === 0 ? 'lg:col-span-1' : 
                index === 1 ? 'lg:col-span-1' : 
                index === 2 ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${solution.image}')` }}
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Icon */}
                <div className="flex justify-start">
                  <div className="bg-blue-600 rounded-full p-3 shadow-lg">
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-sm text-gray-200 mb-4">{solution.description}</p>
                </div>
                
                {/* Center Button */}
                <div className="flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Full Width Card */}
        <div className="w-full">
          <div 
            className="group relative h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${solutions[4].image}')` }}
            ></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
              {/* Icon */}
              <div className="bg-blue-600 rounded-full p-4 shadow-lg mb-6">
                <Icon5 className="w-8 h-8 text-white" />
              </div>
              
              {/* Text Content */}
              <div className="text-white mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{solutions[4].title}</h3>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto">{solutions[4].description}</p>
              </div>
              
              {/* Center Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;