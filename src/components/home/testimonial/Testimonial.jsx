

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useMemo } from 'react';
import { getTestimonials } from '../../../http';

const Testimonial = ({ data }) => {
  // Only log once when data changes, not on every render
  useEffect(() => {
    // console.log('Testimonial data updated:', data);
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fallback testimonials if no backend data
  const fallbackTestimonials = [
    {
      name: "John Doe",
      profileImg: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      description: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people. The memories I made will last a lifetime.",
      rating: 5,
      flag: '🇹🇿',
      title: "Adventure Seeker",
      location: "Dar es Salaam, Tanzania"
    },
    {
      name: "Jane Smith",
      profileImg: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      description: "The service exceeded all my expectations. From the moment I booked until the end of my journey, everything was perfectly organized and professionally handled.",
      rating: 4,
      flag: '🇹🇿',
      title: "Business Traveler",
      location: "Arusha, Tanzania"
    },
    {
      name: "Michael Brown",
      profileImg: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      description: "Outstanding experience! The attention to detail and personalized service made my trip absolutely perfect. I'll definitely be coming back for more adventures.",
      rating: 5,
      flag: '🇹🇿',
      title: "Explorer",
      location: "Mwanza, Tanzania"
    }
  ];

  // Use backend data if available, otherwise use fallback
  const testimonials = useMemo(() => {
    if (!data || data.length === 0) {
      return fallbackTestimonials;
    }
    return data;
  }, [data]);

  // Early return if no testimonials to prevent crashes
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading testimonials...</div>
      </div>
    );
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return; // Don't start interval if no testimonials
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]); // Only depend on testimonials.length, not currentIndex

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToTestimonial = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 transition-all duration-300 ${
          i < rating 
            ? 'text-yellow-400 scale-110' 
            : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Get current testimonial data
  const currentTestimonial = testimonials[currentIndex];

  // Memoize helper functions to prevent recreation on every render
  const getClientTitle = useMemo(() => (testimonial) => {
    if (testimonial?.title) return testimonial.title;
    return "Valued Client";
  }, []);

  const getClientLocation = useMemo(() => (testimonial) => {
    if (testimonial?.location) return testimonial.location;
    if (testimonial?.flag === '🇹🇿') return "Tanzania";
    return "Client Location";
  }, []);

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient background that follows mouse */}
        <div 
          className="absolute inset-0 opacity-10 transition-all duration-1000"
          style={{
            background: `radial-gradient(1000px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #60a5fa, transparent 60%)`
          }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block group mb-6">
            <span className="relative text-blue-500 font-bold text-lg tracking-wide px-6 py-3 rounded-full border-2 border-blue-500/30 backdrop-blur-sm bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 group-hover:scale-105 hover:border-blue-500/50">
              Testimonials
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black leading-tight text-[#000080] mb-6">
            What Our
            <span className="block text-blue-500 animate-gradient-text">
              Clients Say
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the experiences that make our clients choose us again and again
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className={`transform transition-all duration-500 ease-out ${
            isAnimating ? 'scale-95 opacity-0 rotate-1' : 'scale-100 opacity-100 rotate-0'
          }`}>
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-blue-400/30 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-blue-400/20 transition-all duration-700 overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* Quote mark */}
                <div className="absolute top-8 left-8 text-8xl text-blue-400/20 font-serif leading-none select-none">
                  "
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Profile Section */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                      <div className="relative inline-block group-hover:scale-105 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                        <img
                          src={currentTestimonial?.profileImg || currentTestimonial?.image || 'https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg'}
                          alt={currentTestimonial?.name || 'Client'}
                          className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -bottom-2 -right-2 text-3xl">
                          {currentTestimonial?.flag || '🇹🇿'}
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <h3 className="text-2xl font-bold text-[#000080] group-hover:text-blue-500 transition-colors duration-300">
                          {currentTestimonial?.name || 'Valued Client'}
                        </h3>
                        <p className="text-blue-600 font-medium text-lg">
                          {getClientTitle(currentTestimonial)}
                        </p>
                        <p className="text-gray-500">
                          {getClientLocation(currentTestimonial)}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex justify-center lg:justify-start gap-1 mt-4">
                          {renderStars(currentTestimonial?.rating || 5)}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-1">
                      <blockquote className="text-2xl lg:text-3xl leading-relaxed text-gray-700 font-light italic mb-8">
                        {currentTestimonial?.description || currentTestimonial?.testimonial || 'Amazing service and experience!'}
                      </blockquote>
                      
                      {/* Progress indicators */}
                      <div className="flex justify-center lg:justify-start gap-3 mt-8">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
                              index === currentIndex
                                ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                                : 'w-3 bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-blue-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-400/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-xl border border-blue-400/30 flex items-center justify-center text-blue-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-xl border border-blue-400/30 flex items-center justify-center text-blue-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-20 flex justify-center space-x-4">
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full animate-pulse"></div>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full animate-pulse delay-1000"></div>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes gradient-text {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite 4s; }
        .animate-gradient-text { animation: gradient-text 4s ease infinite; }
      `}</style>
    </section>
  );
};

export default Testimonial;