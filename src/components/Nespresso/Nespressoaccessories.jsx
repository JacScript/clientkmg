import React, { useState } from "react";
import { motion } from "framer-motion";
import { SprayCan, Box, MessageCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatTZS } from "../../utils/currency";

// Maps icon name strings from the backend to actual icon components.
const ICONS = {
  spray: SprayCan,
  box: Box,
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];
const isVideo = (url = "") => VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().includes(ext));

// Fallback content shown if no accessories are linked on the backend yet.
const DEFAULT_ACCESSORIES = [
  {
    _id: "travel-mug",
    name: "Travel Mug",
    description: "Insulated, double-walled, built for the commute.",
    image: "https://res.cloudinary.com/dgpbjp2wz/video/upload/v1782492245/travel_mug_dheouc.mp4",
    sizes: [
      { label: "Small", price: 150000 },
      { label: "Large", price: 200000 },
    ],
  },
  {
    _id: "cup",
    name: "Cups & Glasses",
    description: "Espresso cups and Lungo glasses for the table at home.",
    image: "https://images.unsplash.com/photo-1475241404975-c3ae90fdd9e6?auto=format&fit=crop&w=900&q=80",
    sizes: [
      { label: "Small (Espresso)", price: 18000 },
      { label: "Large (Lungo)", price: 25000 },
    ],
  },
  {
    _id: "cleaning",
    name: "Cleaning & Descaling",
    description: "Descaling kits and cleaning accessories to keep every machine running well.",
    icon: "spray",
    onDemand: true,
    sizes: [],
  },
  {
    _id: "storage",
    name: "Capsule Storage",
    description: "Drawers and dispensers that keep your sleeves organized by flavor.",
    icon: "box",
    onDemand: true,
    sizes: [],
  },
];

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

// Renders a <video> for video URLs, an <img> for everything else — the
// Travel Mug's media is an .mp4, which an <img> tag can't display at all.
const ProductMedia = ({ src, alt }) =>
  isVideo(src) ? (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="h-full w-full object-cover"
    />
  ) : (
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  );

const ProductCard = ({ product, onAdd }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedSize = product.sizes[selectedIndex];

  return (
    <motion.div variants={item} whileHover={{ y: -6 }} className="overflow-hidden rounded-2xl bg-[#241B14]">
      <div className="aspect-[4/3] overflow-hidden">
        <ProductMedia src={product.image} alt={product.name} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{product.description}</p>

        <div className="mt-4 flex gap-2">
          {product.sizes.map((size, i) => (
            <button
              key={size.label}
              onClick={() => setSelectedIndex(i)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                i === selectedIndex
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

const NespressoAccessories = ({
  accessories = DEFAULT_ACCESSORIES,
  eyebrow = "Accessories",
  heading = "Everything else for the ritual.",
  subheading = "Pick a size, add it to your cart — or message us for anything that isn't listed here yet.",
}) => {
  const { addToCart } = useCart();

  const sizedProducts = accessories.filter((a) => a.sizes?.length > 0);
  const onDemandProducts = accessories.filter((a) => a.onDemand);

  if (!accessories.length) return null;

  const handleAdd = (product, size) => {
    addToCart({
      id: `${product._id}-${size.label}`,
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
            {eyebrow}
          </motion.p>
          <motion.h2 variants={item} className="text-3xl font-bold sm:text-4xl">
            {heading}
          </motion.h2>
          <motion.p variants={item} className="mt-4 text-gray-400">
            {subheading}
          </motion.p>
        </motion.div>

        {sizedProducts.length > 0 && (
          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {sizedProducts.map((product) => (
              <ProductCard key={product._id} product={product} onAdd={handleAdd} />
            ))}
          </motion.div>
        )}

        {onDemandProducts.length > 0 && (
          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {onDemandProducts.map((accessory) => {
              const Icon = ICONS[accessory.icon] || Box;
              return (
                <motion.div
                  key={accessory._id}
                  variants={item}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-start rounded-2xl bg-[#241B14] p-6"
                >
                  <Icon className="text-[#C9A24B]" size={28} strokeWidth={1.75} />
                  <h3 className="mt-4 font-semibold">{accessory.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">{accessory.description}</p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Available on demand
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

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