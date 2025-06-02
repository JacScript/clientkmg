import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5'; // Make sure you have react-icons installed

const WhatsAppLink = ({ phoneNumber='255764437845', message }) => {
  // Construct the WhatsApp URL.
  // 'phoneNumber' should be in international format without '+' or leading zeros (e.g., 255787083558 for Tanzania)
  // 'message' is optional and will pre-fill the chat input.
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || "")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Recommended for security when using target="_blank"
      className="inline-flex items-center justify-center p-2 rounded-full bg-[#25D366] hover:bg-[#1DA851] transition-colors duration-300 shadow-lg"
      aria-label="Chat with us on WhatsApp"
    >
      <IoLogoWhatsapp className="text-white" size={40} />
    </a>
  );
};

export default WhatsAppLink;