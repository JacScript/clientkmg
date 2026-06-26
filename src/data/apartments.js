export const apartments = [
  {
    id: "1",
    slug: "ocean-view-suite",
    title: "Ocean View Suite",
    description: "A luxurious apartment overlooking the Indian Ocean.",
    location: "Kigamboni, Dar es Salaam",
    guests: 4,
    availability: false,
    // Shown when availability is false — a human-readable date the listing
    // opens up for booking. Optional; leave it off if not applicable.
    availableFrom: "September 2025",
    images: [
      "/images/apartment1-1.jpg",
      "/images/apartment1-2.jpg",
      "/images/apartment1-3.jpg",
    ],
    features: [
      "Free WiFi",
      "Air Conditioning",
      "Kitchen",
      "Swimming Pool",
      "Ocean View",
    ],
    // Price in TZS per night. (Originally entered as 120, which reads as
    // USD — converted to a placeholder TZS figure; confirm/adjust to your
    // real nightly rate.)
    price: 280000,
  },
];