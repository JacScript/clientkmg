import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from '../LinkComponent'
import { CiPlay1, CiPause1 } from "react-icons/ci";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AUTOPLAY_MS = 5000;

const HeroKiswahili = ({
  images = [],
  // badge = "",
  heading = "",
  headingAccentPrefix = "",
  headingAccent = "",
  subheading = "",
  description = "",
  buttonText = "",
  whatsappMessage = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const total = images.length;

  const goTo = useCallback(
    (index) => setCurrentIndex(((index % total) + total) % total),
    [total]
  );

  const toggleAutoplay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    if (!isPlaying || total <= 1) return;
    const id = setInterval(() => goTo(currentIndex + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPlaying, currentIndex, total, goTo]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden mt-40">
      {/* Background Image Carousel */}
      {images.map((image, idx) => (
        <img
          key={image.url}
          src={image.url}
          alt={image.alt || `Slide ${idx + 1}`}
          className={
            "absolute inset-0 h-full w-full object-cover z-0 transition-opacity duration-1000 " +
            (idx === currentIndex ? "opacity-100" : "opacity-0")
          }
        />
      ))}

      {/* Carousel Control Button — pauses/resumes autoplay */}
      {total > 1 && (
        <button
          onClick={toggleAutoplay}
          className="absolute top-6 right-6 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? (
            <CiPause1 className="w-6 h-6" />
          ) : (
            <CiPlay1 className="w-6 h-6 ml-0.5" />
          )}
        </button>
      )}

      {/* Dot Navigation */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={
                "h-2 rounded-full transition-all " +
                (idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80")
              }
            />
          ))}
        </div>
      )}

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 z-10" />

      {/* Main content container */}
      <div className="relative isolate px-6 lg:px-8 z-20 w-full"> 

        {/* Top decorative blob with warmer colors for language learning */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#000080] to-[#000080] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[180.1875rem]"
          />
        </div>

        {/* Content block: Heading, Paragraph, and Buttons */}
        <motion.div
          className="mx-auto max-w-6xl py-20 sm:py-24 md:py-32 lg:py-40"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          
          {/* Language Badge */}
          {/* {badge && (
            <motion.div variants={item} className="inline-flex items-center mb-6">
              <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold border border-orange-400/30 backdrop-blur-sm">
                🌍 {badge}
              </span>
            </motion.div>
          )} */}

          {/* Main Heading */}
          {heading && (
            <motion.h1
              variants={item}
              className="max-w-3xl text-2xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl"
            >
              {heading}{" "}
              {headingAccentPrefix && `${headingAccentPrefix} `}
              {headingAccent && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">{headingAccent}</span>
              )}
            </motion.h1>
          )}
          
          {/* Subtitle in English */}
          {subheading && (
            <motion.h2
              variants={item}
              className="mt-4 text-lg font-medium text-orange-200 sm:text-xl"
            >
              {subheading}
            </motion.h2>
          )}
          
          {/* Description Paragraph */}
          {description && (
            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-base text-gray-200 sm:text-lg"
            >
              {description}
            </motion.p>
          )}
          
          {/* Button Container */}
          {buttonText && (
            <motion.div
              variants={item}
              className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-x-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  message={whatsappMessage}
                  isWhatsApp={true} 
                  className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 
                             px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white 
                             shadow-xl hover:shadow-2xl transition-all duration-300 ease-out
                             hover:from-orange-600 hover:to-yellow-600
                             border-2 border-transparent hover:border-white/20 block"
                >
                  {buttonText}
                </Link>
              </motion.div>
            </motion.div>
          )}

        </motion.div>

        {/* Bottom decorative element */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 bg-gradient-to-tr from-[#000080] to-[#000080] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[180.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroKiswahili