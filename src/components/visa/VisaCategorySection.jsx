import React from 'react';
import Link from '../LinkComponent';

const VisaCategories = () => {
  const visaCategories = [
    {
      id: 1,
      title: "Job Visa",
      description: "A visa issued to individuals who have secured employment in a foreign country. It often requires a work contract and may have restrictions based on the employer or position.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center",
      buttonText: "Let's Plan",
    //   buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: 2,
      title: "Business Visa",
      description: "Perfect for business meetings, conferences, and short-term business activities in foreign countries.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&crop=center",
      buttonText: "Let's Plan",
    //   buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      id: 3,
      title: "Diplomatic Visa",
      description: "Special visa category for diplomatic personnel and official government representatives.",
      image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&h=400&fit=crop&crop=center",
      buttonText: "Let's Plan",
    //   buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      id: 4,
      title: "Tourist Visa",
      description: "For leisure travel and tourism purposes, allowing you to explore and enjoy your destination.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&crop=center",
      buttonText: "Let's Plan",
    //   buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      id: 5,
      title: "Student Visa",
      description: "For individuals pursuing education in foreign institutions and universities.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&crop=center",
      buttonText: "Let's Plan",
    //   buttonColor: "bg-red-500 hover:bg-red-600"
    },
    {
      id: 6,
      title: "Transit Visa",
      description: "Short-term visa for travelers passing through a country en route to their final destination.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop&crop=center",
      buttonText: "Let's Plan",
    //   buttonColor: "bg-red-500 hover:bg-red-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-0.5 w-16 bg-red-500"></div>
            <h2 className="mx-4 text-2xl font-bold text-gray-800 tracking-wide">VISA CATEGORIES</h2>
            <div className="h-0.5 w-16 bg-blue-600"></div>
          </div>
          <div className="w-12 h-0.5 bg-gray-400 mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visaCategories.map((visa) => (
            <div key={visa.id} className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={visa.image}
                  alt={visa.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-2">{visa.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description - hidden by default, shows on hover */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 ease-in-out">
                  {visa.description}
                </p>
                
                {/* Button - always visible */}
               <div className="mt-6 sm:mt-8 flex justify-center">
              <Link 
            message="Hello, I would like to inquire about your visa services."
  isWhatsApp={true} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
>
 Contact Us
</Link>
          </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaCategories;