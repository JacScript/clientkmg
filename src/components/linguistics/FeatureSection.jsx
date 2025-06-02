import React from 'react';
// Assuming you have an icon component or use a library like Heroicons/Font Awesome
// For this example, I'll use simple placeholder divs for icons,
// but in a real project, you'd import SVG components or use an icon library.
// import { UserIcon, AdjustmentsHorizontalIcon, ChartBarIcon } from '@heroicons/react/24/outline'; 
// If you don't have Heroicons installed, you can replace these with simple <div></div> tags
// or install them: npm install @heroicons/react
import { CiUser } from "react-icons/ci";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaChartBar } from "react-icons/fa";
import Link from '../LinkComponent';

export default function FeaturesSection() {
  const features = [
    {
      icon: <CiUser className="h-8 w-8 text-indigo-600" />, // Placeholder icon
      title: 'Interactive Lessons',
      description:
        'Designed to be interactive, involving the user actively through speaking, listening, reading, and writing exercises.',
    },
    {
      icon: <HiAdjustmentsHorizontal className="h-8 w-8 text-indigo-600" />, // Placeholder icon
      title: 'Personalized Learning',
      description:
        'Tailor-made learning paths are created based on the user’s proficiency level, goals, and learning pace.',
    },
    {
      icon: <FaChartBar className="h-8 w-8 text-indigo-600" />, // Placeholder icon
      title: 'Progress Tracking',
      description:
        'We offer detailed insights and analytics on performance, highlighting strengths and areas for improvement.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Optional: Section Title (if needed, not in the screenshot) */}
        {/*
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Key Features</h2>
          <p className="mt-4 text-lg text-gray-600">Discover how we help you achieve your goals.</p>
        </div>
        */}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300
                         flex flex-col items-start text-left" // Align content to start and left
            >
              <div className="mb-4 text-[#000080]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>

               {/* Button Container */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md hover:bg-[#000080] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-2 
                         text-sm sm:text-base md:text-lg font-semibold text-[#000080] 
                         hover:text-white shadow-lg bg-transparent border-2 border-[#000080] 
                         transition ease-in duration-150 transform hover:scale-105 cursor-pointer"
            >
              Get started
            </Link>
          </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}