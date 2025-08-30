import { User, Settings, BarChart3 } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <User className="h-10 w-10 text-white" />,
      title: 'Interactive Lessons',
      description:
        'Designed to be interactive, involving the user actively through speaking, listening, reading, and writing exercises.',
      backgroundImage: 'https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753451670/WhatsApp_Image_2025-07-24_at_20.59.44_kbzsxo.jpg'
    },
    {
      icon: <Settings className="h-10 w-10 text-white" />,
      title: 'Personalized Learning',
      description:
        'Tailor-made learning paths are created based on the user\'s proficiency level, goals, and learning pace.',
      backgroundImage: 'https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753451670/WhatsApp_Image_2025-07-24_at_20.58.28_rxj4nr.jpg'
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-white" />,
      title: 'Progress Tracking',
      description:
        'We offer detailed insights and analytics on performance, highlighting strengths and areas for improvement.',
      backgroundImage: 'https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753451672/WhatsApp_Image_2025-07-24_at_20.58.50_vyayca.jpg'
    },
  ];

  const handleWhatsAppClick = () => {
    const message = "Hello, I would like to inquire about your Kiswahili services.";
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden group h-96"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${feature.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                {/* Icon and Title */}
                <div>
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-[#000080] rounded-xl shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-8">
                  <button 
                    onClick={handleWhatsAppClick}
                    className="w-full rounded-xl bg-[#000080] hover:bg-blue-700 px-6 py-3 
                               text-base font-semibold text-white shadow-lg 
                               transition-all duration-300 transform hover:scale-105 
                               hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#000080]/20 rounded-full blur-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}