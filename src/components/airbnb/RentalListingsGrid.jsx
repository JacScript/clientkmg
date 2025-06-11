// import React from "react";
// import Link from "../LinkComponent";
// import img1 from "../../assets/images/airbnb/img1.jpg";
// import img2 from "../../assets/images/airbnb/img2.jpg";
// import img3 from "../../assets/images/airbnb/img3.jpg";
// import img4 from "../../assets/images/airbnb/img4.jpg";
// import img5 from "../../assets/images/airbnb/img5.jpg";
// import img6 from "../../assets/images/airbnb/img6.jpg";
// import img7 from "../../assets/images/airbnb/img7.jpg";
// import img8 from "../../assets/images/airbnb/img8.jpg";

// const listings = [
//   {
//     id: 1,
//     image: img1,
//     price: "200,000",
//     title: "Dar es Salaam",
//     location: "Tanzania",
//     rooms: 2,
//     rating: 5,
//     available: "July 1 – 29",
//   },
//   {
//     id: 2,
//     image: img2,
//     price: "150,000",
//     title: "Dar es Salaam",
//     location: "Tanzania",
//     rooms: 1,
//     rating: 4.8,
//     available: "July 1 – 29",
//   },
// ];

// const RentalListingsGrid = () => {
//   return (
//     <div className="max-w-7xl mx-auto py-8 px-4 bg-white">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {listings.map((listing) => (
//           <div key={listing.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
//             <div className="relative">
//               <img
//                 src={listing.image}
//                 alt={listing.title}
//                 className="w-full h-40 object-cover"
//               />
//             </div>
//             <div className="p-4">
//               {/* Price Section */}
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-lg text-gray-900">
//                   Tsh:{listing.price} 
//                   <span className="text-gray-500 text-sm font-normal ml-1">/night</span>
//                 </span>
//                 <span className="flex items-center text-violet-600 font-semibold text-sm">
//                   <svg width="14" height="14" fill="currentColor" className="mr-1">
//                     <path d="M8 12.472l-4.472 2.35.854-4.98L.764 6.178l5.024-.73L8 1.5l2.212 3.948 5.024.73-3.618 3.664.854 4.98z"/>
//                   </svg>
//                   {listing.rating}
//                 </span>
//               </div>

//               {/* Title */}
//               <div className="text-gray-800 font-medium text-base mb-1">{listing.title}</div>
              
//               {/* Location */}
//               <div className="text-gray-600 text-sm mb-1">
//                 <svg width="12" height="12" fill="currentColor" className="inline mr-1 mb-0.5">
//                   <path d="M6 0C2.686 0 0 2.686 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6zm0 8.5c-1.381 0-2.5-1.119-2.5-2.5S4.619 3.5 6 3.5s2.5 1.119 2.5 2.5S7.381 8.5 6 8.5z"/>
//                 </svg>
//                 {listing.location}
//               </div>

//               {/* Number of Rooms */}
//               <div className="text-gray-600 text-sm mb-3">
//                 <svg width="12" height="12" fill="currentColor" className="inline mr-1 mb-0.5">
//                   <path d="M2 2v8h8V2H2zm6 6H4V4h4v4z"/>
//                 </svg>
//                 {listing.rooms} {listing.rooms === 1 ? 'Room' : 'Rooms'}
//               </div>

//               {/* Availability */}
//               <div className="text-sm text-gray-500 mb-4">
//                 Available: <span className="font-medium">{listing.available}</span>
//               </div>

//               {/* Book Now Button */}
//               <div className="flex justify-center">
//                 <Link 
//                   message={`Hello, I would like to inquire about your ${listing.title} in ${listing.location} (${listing.rooms} rooms) for ${listing.price} per night.`}
//                   isWhatsApp={true} 
//                   className="bg-[#000080] hover:bg-[#000070] text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium transition-colors w-full text-center"
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="flex justify-center mt-8">
//         <button className="bg-violet-700 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-violet-800 transition">
//           Show More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RentalListingsGrid;

import React from "react";
import Link from "../LinkComponent";
import img1 from "../../assets/images/airbnb/img1.jpg";
import img2 from "../../assets/images/airbnb/img2.jpg";
import img3 from "../../assets/images/airbnb/img3.jpg";

// Mock images for the house - you can replace these with your actual images
const houseImages = [
  img1,
  img2,
  img3
];

const bookingOptions = [
  {
    id: 1,
    type: "room",
    image: houseImages[0],
    price: "75,000",
    title: "Private Room",
    subtitle: "Comfortable single room in shared house",
    location: "Dar es Salaam, Tanzania",
    capacity: "1-2 guests",
    features: ["Private bedroom", "Shared bathroom", "Kitchen access", "WiFi included"],
    rating: 4.9,
    available: "Available year-round",
    description: "Perfect for solo travelers or couples looking for an affordable stay"
  },
  {
    id: 2,
    type: "house",
    image: houseImages[1],
    price: "200,000",
    title: "Entire House",
    subtitle: "Spacious house perfect for families or groups",
    location: "Dar es Salaam, Tanzania",
    capacity: "Up to 8 guests",
    features: ["3 bedrooms", "2 bathrooms", "Full kitchen", "Living room", "Private garden"],
    rating: 5.0,
    available: "Available year-round",
    description: "Ideal for families, groups, or anyone wanting complete privacy"
  }
];

const RentalListingsGrid = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Stay
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience comfort and convenience in our beautiful house in Dar es Salaam. 
          Whether you need a cozy room or the entire house, we have the perfect option for you.
        </p>
      </div>

      {/* Booking Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {bookingOptions.map((option) => (
          <div key={option.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="flex items-center text-yellow-500 font-semibold text-sm">
                  <svg width="16" height="16" fill="currentColor" className="mr-1">
                    <path d="M8 12.472l-4.472 2.35.854-4.98L.764 6.178l5.024-.73L8 1.5l2.212 3.948 5.024.73-3.618 3.664.854 4.98z"/>
                  </svg>
                  {option.rating}
                </span>
              </div>
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {option.type === 'room' ? 'Private Room' : 'Entire House'}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Title and Price */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.subtitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    Tsh {option.price}
                  </div>
                  <div className="text-gray-500 text-sm">/night</div>
                </div>
              </div>

              {/* Location and Capacity */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg width="16" height="16" fill="currentColor" className="mr-2">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 6 8 14 8 14s8-8 8-14c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                  {option.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg width="16" height="16" fill="currentColor" className="mr-2">
                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8S12.42 0 8 0zm4 9H4V7h8v2z"/>
                  </svg>
                  {option.capacity}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
                <div className="flex flex-wrap gap-2">
                  {option.features.map((feature, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>

              {/* Availability */}
              <div className="flex items-center mb-6">
                <svg width="16" height="16" fill="currentColor" className="mr-2 text-green-600">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8S12.42 0 8 0zm3.5 6L7 10.5 4.5 8 6 6.5l1 1 3.5-3.5L12 5.5z"/>
                </svg>
                <span className="text-green-600 font-medium text-sm">{option.available}</span>
              </div>

              {/* Book Now Button */}
              <Link 
                message={`Hello! I'm interested in booking the ${option.title} in Dar es Salaam for ${option.capacity}. The rate is Tsh ${option.price} per night. Could you please provide more details about availability and booking process?`}
                isWhatsApp={true} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center block"
              >
                Book {option.title} Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our House?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Located in the heart of Dar es Salaam, our property offers the perfect blend of comfort, 
            convenience, and authentic Tanzanian hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="currentColor" className="text-blue-600">
                <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.5 7.5L12 18 6.5 7.5h11z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Prime Location</h3>
            <p className="text-gray-600 text-sm">Centrally located with easy access to attractions, restaurants, and transportation</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="currentColor" className="text-green-600">
                <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm-1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Round-the-clock assistance to ensure your stay is comfortable and worry-free</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="currentColor" className="text-purple-600">
                <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Options</h3>
            <p className="text-gray-600 text-sm">Choose between a private room or the entire house based on your needs and budget</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h3>
        <p className="text-gray-600 mb-6">
          We're here to help you plan the perfect stay in Dar es Salaam. 
          Contact us for special requests, longer stays, or any questions you might have.
        </p>
        <Link 
          message="Hello! I have some questions about your rental property in Dar es Salaam. Could you please provide more information?"
          isWhatsApp={true}
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Contact Us on WhatsApp
        </Link>
      </div>
    </div>
  );
};

export default RentalListingsGrid;