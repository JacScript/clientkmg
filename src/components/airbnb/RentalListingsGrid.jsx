import React from "react";
import Link from "../LinkComponent";
import img1 from "../../assets/images/airbnb/img1.jpg";
import img2 from "../../assets/images/airbnb/img2.jpg";
import img3 from "../../assets/images/airbnb/img3.jpg";
import img4 from "../../assets/images/airbnb/img4.jpg";
import img5 from "../../assets/images/airbnb/img5.jpg";
import img6 from "../../assets/images/airbnb/img6.jpg";
import img7 from "../../assets/images/airbnb/img7.jpg";
import img8 from "../../assets/images/airbnb/img8.jpg";

const listings = [
  {
    id: 1,
    image: img1,
    price: "200,000",
    title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 2,
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 2,
    image: img2,
    price: "150,000",
    title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 1,
    rating: 4.8,
    available: "July 1 – 29",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    price: "120,000",
    title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 1,
    rating: 4.9,
    available: "July 1 – 29",
  },
  {
    id: 4,
    image: img4,
    price: "150,000",
     title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 3,
    rating: 4.7,
    available: "July 1 – 29",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    price: "150,000",
     title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 2,
    rating: 4.6,
    available: "July 1 – 29",
  },
  {
    id: 6,
    image: img7,
    price: "150,000",
    title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 2,
    rating: 4.8,
    available: "July 1 – 29",
  },
  {
    id: 7,
    image: img6,
    price: "150,000",
     title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 3,
    rating: 4.5,
    available: "July 1 – 29",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
    price: "150,000",
    title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 1,
    rating: 4.9,
    available: "July 1 – 29",
  },
  {
    id: 9,
    image: img5,
    price: "150,000",
     title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 1,
    rating: 4.4,
    available: "July 1 – 29",
  },
  {
    id: 10,
    image: img3,
    price: "150,000",
     title: "Dar es Salaam",
    location: "Tanzania",
    rooms: 2,
    rating: 4.7,
    available: "July 1 – 29",
  },
];

const RentalListingsGrid = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="p-4">
              {/* Price Section */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg text-gray-900">
                  Tsh:{listing.price} 
                  <span className="text-gray-500 text-sm font-normal ml-1">/night</span>
                </span>
                <span className="flex items-center text-violet-600 font-semibold text-sm">
                  <svg width="14" height="14" fill="currentColor" className="mr-1">
                    <path d="M8 12.472l-4.472 2.35.854-4.98L.764 6.178l5.024-.73L8 1.5l2.212 3.948 5.024.73-3.618 3.664.854 4.98z"/>
                  </svg>
                  {listing.rating}
                </span>
              </div>

              {/* Title */}
              <div className="text-gray-800 font-medium text-base mb-1">{listing.title}</div>
              
              {/* Location */}
              <div className="text-gray-600 text-sm mb-1">
                <svg width="12" height="12" fill="currentColor" className="inline mr-1 mb-0.5">
                  <path d="M6 0C2.686 0 0 2.686 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6zm0 8.5c-1.381 0-2.5-1.119-2.5-2.5S4.619 3.5 6 3.5s2.5 1.119 2.5 2.5S7.381 8.5 6 8.5z"/>
                </svg>
                {listing.location}
              </div>

              {/* Number of Rooms */}
              <div className="text-gray-600 text-sm mb-3">
                <svg width="12" height="12" fill="currentColor" className="inline mr-1 mb-0.5">
                  <path d="M2 2v8h8V2H2zm6 6H4V4h4v4z"/>
                </svg>
                {listing.rooms} {listing.rooms === 1 ? 'Room' : 'Rooms'}
              </div>

              {/* Availability */}
              <div className="text-sm text-gray-500 mb-4">
                Available: <span className="font-medium">{listing.available}</span>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-center">
                <Link 
                  message={`Hello, I would like to inquire about your ${listing.title} in ${listing.location} (${listing.rooms} rooms) for ${listing.price} per night.`}
                  isWhatsApp={true} 
                  className="bg-[#000080] hover:bg-[#000070] text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium transition-colors w-full text-center"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="bg-violet-700 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-violet-800 transition">
          Show More
        </button>
      </div>
    </div>
  );
};

export default RentalListingsGrid;