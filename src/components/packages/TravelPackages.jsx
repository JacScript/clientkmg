import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaRegClock, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { getPackages } from '../../http';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TravelPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [packages, setPackages] = useState([]);

  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      return await getPackages();
    },
    placeholderData: keepPreviousData,
  });

  // console.log("resData", resData);

  useEffect(() => {
    if (resData?.data?.data) {
      // Transform the data to match expected format
      const transformedPackages = resData.data.data.map((pkg) => ({
        id: pkg._id, // Convert _id to id
        title: pkg.title,
        subtitle: pkg.subtitle,
        duration: pkg.duration || "", // Handle missing duration
        price: pkg.price.toString(), // Convert to string if needed
        priceNote: "/person",
        images: pkg.images || [], // Handle missing images
        description: pkg.description || "",
        longDescription: pkg.longDescription || "",
        additionalInfo: pkg.additionalInfo || "",
        includes: pkg.includes || [],
        // Add default colors if not present in API data
        color: pkg.color || getDefaultColor(pkg._id),
        bgColor: pkg.bgColor || getDefaultBgColor(pkg._id)
      }));
      setPackages(transformedPackages);
    }
  }, [resData]);

  // Helper functions to assign default colors based on package ID
  const getDefaultColor = (id) => {
    const colors = [
      "from-red-500 to-orange-500",
      "from-blue-500 to-purple-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-purple-500 to-pink-500",
      "from-indigo-500 to-blue-500",
      "from-pink-500 to-rose-500"
    ];
    return colors[Math.abs(id.charCodeAt(0)) % colors.length];
  };

  const getDefaultBgColor = (id) => {
    const bgColors = [
      "bg-red-50",
      "bg-blue-50",
      "bg-green-50",
      "bg-yellow-50",
      "bg-purple-50",
      "bg-indigo-50",
      "bg-pink-50"
    ];
    return bgColors[Math.abs(id.charCodeAt(0)) % bgColors.length];
  };

  const nextImage = (packageId) => {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg && pkg.images && pkg.images.length > 0) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [packageId]: ((prev[packageId] || 0) + 1) % pkg.images.length
      }));
    }
  };

  const prevImage = (packageId) => {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg && pkg.images && pkg.images.length > 0) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [packageId]: ((prev[packageId] || 0) - 1 + pkg.images.length) % pkg.images.length
      }));
    }
  };

  const goToImage = (packageId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [packageId]: index
    }));
  };

  // console.log("packages", packages);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-xl text-red-600">Error loading packages. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // No packages state
  if (packages.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No packages available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Packages Grid */}
        <div className="space-y-12">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 ${pkg.bgColor}`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${pkg.color} opacity-5`} />
              
              <div className="relative p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Content Side */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    {/* Package Badge */}
                    <div className="relative">
                      <div className={`inline-block bg-gradient-to-r ${pkg.color} text-white px-6 py-3 rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300`}>
                        <span className="font-bold text-lg uppercase tracking-wide">
                          {pkg.title}
                        </span>
                      </div>
                    </div>

                    {/* Title and Duration */}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">
                        {pkg.subtitle}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        {pkg.duration && (
                          <div className="flex items-center gap-2">
                            <FaRegClock className="w-5 h-5" />
                            <span className="font-semibold">{pkg.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FiUsers className="w-5 h-5" />
                          <span>Per Person</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      {pkg.description && <p className="text-sm italic">{pkg.description}</p>}
                      {pkg.longDescription && <p className="text-sm">{pkg.longDescription}</p>}
                      {pkg.additionalInfo && <p className="text-sm font-medium text-gray-800">{pkg.additionalInfo}</p>}
                    </div>

                    {/* Includes */}
                    {pkg.includes && pkg.includes.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 text-lg">Including:</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {pkg.includes.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <FaCheck className={`w-4 h-4 mt-0.5 text-green-600 flex-shrink-0`} />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <span className={`text-4xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                          €{pkg.price}
                        </span>
                        <span className="text-gray-500 ml-2">{pkg.priceNote}</span>
                      </div>
                      <a
                        href={`https://wa.me/33771948786?text=Hi! I'm interested in booking the ${pkg.title} - ${pkg.subtitle} ${pkg.duration ? `(${pkg.duration})` : ''} for €${pkg.price}${pkg.priceNote}. Can you please provide more details?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-gradient-to-r ${pkg.color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-center`}
                      >
                        Book Now
                        <FaAngleRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Image Gallery Side */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {pkg.images && pkg.images.length > 0 ? (
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        {/* Main Image */}
                        <div className="relative h-80 lg:h-96 overflow-hidden">
                          <img
                            src={pkg.images[currentImageIndex[pkg.id] || 0]}
                            alt={`${pkg.title} - Image ${(currentImageIndex[pkg.id] || 0) + 1}`}
                            className={`w-full h-full object-cover transition-all duration-700 ${hoveredPackage === pkg.id ? 'scale-110' : 'scale-100'}`}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
                            }}
                          />
                          <div className={`absolute inset-0 opacity-10`} />
                          
                          {/* Navigation Arrows - Only show if more than 1 image */}
                          {pkg.images.length > 1 && (
                            <>
                              <button
                                onClick={() => prevImage(pkg.id)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                              >
                                <FaChevronLeft className="w-4 h-4 text-gray-800" />
                              </button>
                              <button
                                onClick={() => nextImage(pkg.id)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                              >
                                <FaChevronRight className="w-4 h-4 text-gray-800" />
                              </button>
                            </>
                          )}

                          {/* Floating Price Badge */}
                          <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg z-10">
                            <div className="text-center">
                              <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                                €{pkg.price}
                              </div>
                              <div className="text-xs text-gray-600">{pkg.priceNote}</div>
                            </div>
                          </div>

                          {/* Duration Badge */}
                          {pkg.duration && (
                            <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-lg z-10">
                              <span className="font-semibold">{pkg.duration}</span>
                            </div>
                          )}

                          {/* Image Counter - Only show if more than 1 image */}
                          {pkg.images.length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm z-10">
                              {(currentImageIndex[pkg.id] || 0) + 1} / {pkg.images.length}
                            </div>
                          )}
                        </div>

                        {/* Image Dots - Only show if more than 1 image */}
                        {pkg.images.length > 1 && (
                          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                            {pkg.images.map((_, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() => goToImage(pkg.id, imgIdx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  (currentImageIndex[pkg.id] || 0) === imgIdx
                                    ? 'bg-white scale-125'
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Placeholder for no images */
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        <div className="relative h-80 lg:h-96 bg-gray-200 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <div className="text-6xl mb-4">📸</div>
                            <p>No images available</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Thumbnail Strip - Only show if more than 1 image */}
                    {pkg.images && pkg.images.length > 1 && (
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {pkg.images.map((image, imgIdx) => (
                          <button
                            key={imgIdx}
                            onClick={() => goToImage(pkg.id, imgIdx)}
                            className={`relative overflow-hidden rounded-lg aspect-video transition-all duration-300 ${
                              (currentImageIndex[pkg.id] || 0) === imgIdx
                                ? 'ring-4 ring-opacity-75 scale-105'
                                : 'hover:scale-105 opacity-70 hover:opacity-100'
                            }`}
                            style={{ '--tw-ring-color': `rgb(${pkg.color.includes('red') ? '239 68 68' : pkg.color.includes('blue') ? '59 130 246' : '34 197 94'})` }}
                          >
                            <img
                              src={image}
                              alt={`${pkg.title} thumbnail ${imgIdx + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150x100?text=No+Image';
                              }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-20`} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Your French Adventure?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to customize your perfect French getaway or get more information about our packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Get Custom Quote
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                View All Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;