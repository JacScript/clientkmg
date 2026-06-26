import React, { useState } from "react";
import { motion } from "framer-motion";
import { SprayCan, Box, MessageCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatTZS } from "../../utils/currency";

const travelMugImage =
  "https://res.cloudinary.com/dgpbjp2wz/video/upload/v1782492245/travel_mug_dheouc.mp4";
const cupImage =
  "https://images.unsplash.com/photo-1475241404975-c3ae90fdd9e6?auto=format&fit=crop&w=900&q=80";

// Shoppable drinkware. Travel Mug pricing/sizes are as given by KM Group;
// Cup pricing is a placeholder until a real price is confirmed.
const products = [
  {
    id: "travel-mug",
    name: "Travel Mug",
    description: "Insulated, double-walled, built for the commute.",
    image: travelMugImage,
    sizes: [
      { id: "small", label: "Small", price: 150000 },
      { id: "large", label: "Large", price: 200000 },
    ],
  },
  {
    id: "cup",
    name: "Cups & Glasses",
    description: "Espresso cups and Lungo glasses for the table at home.",
    image: cupImage,
    sizes: [
      { id: "small", label: "Small (Espresso)", price: 18000 },
      { id: "large", label: "Large (Lungo)", price: 25000 },
    ],
  },
];

// Per KM Group's NESPRESSO Price List, 13 May 2026: no fixed catalog
// pricing exists yet for these, so they route to a WhatsApp enquiry.
// const onDemand = [
//   {
//     icon: SprayCan,
//     title: "Cleaning & Descaling",
//     description: "Descaling kits and cleaning accessories to keep every machine running well.",
//   },
//   {
//     icon: Box,
//     title: "Capsule Storage",
//     description: "Drawers and dispensers that keep your sleeves organized by flavor.",
//   },
// ];

const WHATSAPP_LINK = "https://wa.me/33771948786";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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

const ProductCard = ({ product, onAdd }) => {
  const [selectedSizeId, setSelectedSizeId] = useState(product.sizes[0].id);
  const selectedSize = product.sizes.find((size) => size.id === selectedSizeId);

  return (
    <motion.div variants={item} whileHover={{ y: -6 }} className="overflow-hidden rounded-2xl bg-[#241B14]">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{product.description}</p>

        <div className="mt-4 flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSizeId(size.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                size.id === selectedSizeId
                  ? "bg-[#C9A24B] text-[#15110D]"
                  : "border border-white/20 text-gray-300 hover:border-[#C9A24B]"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-base font-bold text-[#C9A24B]">
            {formatTZS(selectedSize.price)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAdd(product, selectedSize)}
            className="shrink-0 rounded-full bg-[#C9A24B] px-5 py-2 text-sm font-semibold text-[#15110D] transition hover:bg-[#dab564]"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const NespressoAccessories = () => {
  const { addToCart } = useCart();

  const handleAdd = (product, size) => {
    addToCart({
      id: `${product.id}-${size.id}`,
      name: `${product.name} — ${size.label}`,
      price: size.price,
      image: product.image,
    });
  };

  return (
    <section id="accessories" className="bg-[#1B1410] px-6 py-20 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 max-w-xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={item}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]"
          >
            Accessories
          </motion.p>
          <motion.h2 variants={item} className="text-3xl font-bold sm:text-4xl">
            Everything else for the ritual.
          </motion.h2>
          <motion.p variants={item} className="mt-4 text-gray-400">
            Pick a size, add it to your cart — or message us for anything
            that isn't listed here yet.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAdd} />
          ))}
        </motion.div>

        {/* <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {onDemand.map((accessory) => {
            const Icon = accessory.icon;
            return (
              <motion.div
                key={accessory.title}
                variants={item}
                whileHover={{ y: -6 }}
                className="flex flex-col items-start rounded-2xl bg-[#241B14] p-6"
              >
                <Icon className="text-[#C9A24B]" size={28} strokeWidth={1.75} />
                <h3 className="mt-4 font-semibold">{accessory.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{accessory.description}</p>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Available on demand
                </span>
              </motion.div>
            );
          })}
        </motion.div> */}

        <motion.div
          className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-[#241B14] p-8 sm:flex-row sm:items-center sm:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h3 className="text-lg font-semibold">Don't see what you're after?</h3>
            <p className="mt-1 text-sm text-gray-400">
              Message KM Group directly and we'll sort pricing and availability for you.
            </p>
          </div>
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#C9A24B] px-6 py-3 font-semibold text-[#15110D] transition hover:bg-[#dab564]"
          >
            <MessageCircle size={20} strokeWidth={2} />
            Enquire on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default NespressoAccessories;