// src/components/FadeInImage.jsx
import React from "react";
import { motion } from "framer-motion";

const FadeInImage = ({
  src,
  alt,
  className = '',
  delay = 0,
  direction = 'up',
  rounded = true,
  shadow = true
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay,
        duration: 1.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} ${rounded ? 'lg:rounded-lg' : ''} ${shadow ? 'shadow-lg' : ''}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    />
  );
};

export default FadeInImage;
