// import React from "react";
// import { useLocation , Link} from "react-router-dom";

// const NotFound = () => {
//   const location = useLocation();

//   return (
//     <div style={{ textAlign: "center", marginTop: "1200px" }}>
//       <h1>404 - Page Not Found</h1>
//       <p>The page you are looking for does not exist.</p>
//       <p>
//         <strong>URL:</strong> {location.pathname}
//       </p>
//       <p className="underline text-[#025cca]"> Go to <Link to="/">Home</Link></p>
//     </div>
//   );
// };

// export default NotFound;
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaPlane, FaCompass } from "react-icons/fa";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-16 mt-36">
      <div className="max-w-4xl mx-auto text-center">
        {/* Large 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] lg:text-[250px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 leading-none select-none">
            404
          </h1>
          {/* Floating Icons */}
          <FaPlane className="absolute top-1/4 left-1/4 text-orange-400 text-4xl animate-bounce" style={{ animationDelay: '0s' }} />
          <FaCompass className="absolute top-1/3 right-1/4 text-blue-500 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }} />
          <FaMapMarkerAlt className="absolute bottom-1/4 left-1/3 text-red-500 text-3xl animate-bounce" style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-2xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Oops! Lost in Cyberspace
          </h2>
          
          {/* Description */}
          <div className="text-gray-600 mb-6 space-y-3">
            <p className="text-lg">
              Looks like you've wandered off the beaten path! The page you're looking for seems to have gone on its own adventure.
            </p>
            <p className="text-sm">
              Don't worry, even the best explorers sometimes take a wrong turn.
            </p>
          </div>

          {/* URL Display */}
          <div className="bg-gray-100 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-500 mb-1">Requested URL:</p>
            <code className="text-red-600 font-mono text-sm break-all">
              {location.pathname}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <FaHome className="w-5 h-5" />
              Back to Home
            </Link>
            
            <Link
              to="/packages"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-3"
            >
              <FaPlane className="w-5 h-5" />
              Explore Packages
            </Link>
          </div>

          {/* Popular Links */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm mb-4">Or try one of these popular destinations:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/about-us"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors duration-200"
              >
                About Us
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/gallery"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors duration-200"
              >
                Gallery
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/logistics"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors duration-200"
              >
                Logistics
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/holiday-home"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm transition-colors duration-200"
              >
                Holiday Home
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>💡 Fun fact: Even Columbus got lost sometimes, but he discovered America!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;