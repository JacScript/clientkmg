import React from 'react';
import { motion } from 'framer-motion';
import Link from '../LinkComponent';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const illustrationVariant = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  },
};

export default function Learning({
  badge = "Enroll Today",
  heading = "Ready to embark on your language learning adventure?",
  description = "Dive into a world where language isn't just a skill—it's an adventure. Our expert instructors, engaging multimedia resources, and interactive sessions are here to guide you through a path that's both enriching and enjoyable.",
  buttonText = "Enroll Now",
}) {
  return (
    <div className="h-[90vh] bg-gradient-to-br from-orange-50 to-pink-50 relative overflow-hidden">
      {/* Decorative Elements — hidden below sm so they don't crowd the heading
          on narrow screens, where there's much less room to begin with */}
      <div className="hidden sm:flex absolute top-8 left-8 flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-orange-400 transform rotate-45"></div>
        ))}
      </div>

      <div className="hidden sm:flex absolute top-8 right-8 flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-orange-400 transform rotate-45"></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Enroll Today Badge */}
            <motion.div variants={item} className="inline-flex items-center">
              <span className="text-blue-600 font-medium text-lg border-b-2 border-orange-400 pb-1">
                {badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
            >
              {heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  message="Hello, I would like to inquire about your linguistics services."
                  isWhatsApp={true}
                  className="inline-block bg-[#000080] hover:bg-[#00005f] text-white px-6 py-3 rounded-md shadow-lg transition-colors duration-300"
                >
                  {buttonText}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            className="relative flex justify-center items-center"
            variants={illustrationVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Everything below is scaled as one unit on smaller screens —
                each piece keeps its original fixed size and position
                relative to the others, so nothing needs recalculating by
                hand; it just shrinks together. */}
            <div className="relative scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
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
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
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
          </motion.div>
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