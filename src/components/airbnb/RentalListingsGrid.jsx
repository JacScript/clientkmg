import React from "react";
import Link from "../LinkComponent";

const listings = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Room in New York, United States",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Gorgeous space near Hudson Yards",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Private Cozy Room",
    rating: 5,
    available: "July 1 – 29",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "$101",
    title: "Entire rental unit in New York",
    rating: 5,
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
              {/* Optional: Add heart or carousel icons here */}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{listing.price} <span className="text-gray-500 text-base font-normal">per night</span></span>
                <span className="flex items-center text-violet-600 font-semibold">
                  <svg width="16" height="16" fill="currentColor" className="mr-1"><path d="M8 12.472l-4.472 2.35.854-4.98L.764 6.178l5.024-.73L8 1.5l2.212 3.948 5.024.73-3.618 3.664.854 4.98z"/></svg>
                  {listing.rating}
                </span>
              </div>
              <div className="text-gray-800 mt-1 text-base">{listing.title}</div>
              <div className="text-sm text-gray-500 mt-2">
                Available: <span className="font-medium">{listing.available}</span>
              </div>


              <div className="mt-6 sm:mt-8 flex justify-center">
              <Link 
            message="Hello, I would like to inquire about your airBnB services."
  isWhatsApp={true} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
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
