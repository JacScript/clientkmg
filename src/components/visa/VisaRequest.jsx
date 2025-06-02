import React from 'react';
import Link from '../LinkComponent';

export default function VisaRequest() {
  return (
    <section className="bg-[#1C334A] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Contact Us Now
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-8">
          Request a Visa direct to our agent
        </p>
         <Link 
            message="Hello, I would like to inquire about your linguistics services."
  isWhatsApp={true} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
>
  Request Visa
</Link>
      </div>
    </section>
  );
}