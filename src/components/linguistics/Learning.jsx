import React from 'react';
import Link from '../LinkComponent';

export default function Learning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 flex flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-orange-400 transform rotate-45"></div>
        ))}
      </div>
      
      <div className="absolute top-8 right-8 flex flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-orange-400 transform rotate-45"></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Enroll Today Badge */}
            <div className="inline-flex items-center">
              <span className="text-blue-600 font-medium text-lg border-b-2 border-orange-400 pb-1">
                Enroll Today
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Ready to embark on your language learning adventure?
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Dive into a world where language isn't just a skill—it's an adventure. Our 
              expert instructors, engaging multimedia resources, and interactive 
              sessions are here to guide you through a path that's both enriching and 
              enjoyable.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link 
            message="Hello, I would like to inquire about your linguistics services."
  isWhatsApp={true} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
>
  Enroll Now
</Link>
               
              
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center items-center">
            {/* Background Blob */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-96 h-96 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-60 transform -rotate-12"></div>
            </div>

            {/* Globe Background */}
            <div className="relative z-10 flex justify-center items-center">
              <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                {/* Globe continents */}
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <div className="absolute top-8 left-8 w-16 h-12 bg-green-600 rounded-full opacity-80"></div>
                  <div className="absolute top-16 right-12 w-12 h-8 bg-green-600 rounded-full opacity-80"></div>
                  <div className="absolute bottom-12 left-12 w-20 h-10 bg-green-600 rounded-full opacity-80"></div>
                  <div className="absolute bottom-8 right-8 w-14 h-14 bg-green-600 rounded-full opacity-80"></div>
                </div>
              </div>
            </div>

            {/* Student Character */}
            <div className="absolute bottom-0 z-20 flex flex-col items-center">
              {/* Character representation */}
              <div className="w-32 h-40 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-full mb-2 relative">
                {/* Face */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-700 rounded-full">
                  {/* Hair */}
                  <div className="absolute -top-2 -left-2 w-24 h-16 bg-gray-800 rounded-full"></div>
                  {/* Eyes */}
                  <div className="absolute top-6 left-4 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-white rounded-full"></div>
                </div>
                
                {/* Body */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-amber-600 rounded-t-xl">
                  {/* Backpack */}
                  <div className="absolute -right-2 top-2 w-6 h-16 bg-blue-600 rounded-lg"></div>
                </div>
              </div>

              {/* Books */}
              <div className="flex gap-1 mb-4">
                <div className="w-3 h-8 bg-orange-500 rounded-sm"></div>
                <div className="w-3 h-8 bg-blue-500 rounded-sm"></div>
                <div className="w-3 h-8 bg-green-500 rounded-sm"></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-12 left-12 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute top-24 right-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 left-8 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>

      {/* Additional Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
    </div>
  );
}