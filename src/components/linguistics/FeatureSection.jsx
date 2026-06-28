import { motion } from "framer-motion";
import { User, Settings, BarChart3 } from "lucide-react";

// Maps the icon name strings stored in KiswahiliPage.featuresSection.features
// (e.g. "user", "settings", "bar-chart") to an actual icon component.
// Unrecognized names fall back to User rather than rendering nothing.
const ICONS = {
  user: User,
  settings: Settings,
  "bar-chart": BarChart3,
};

// const DEFAULT_FEATURES = [
//   {
//     icon: "user",
//     title: "Interactive Lessons",
//     description:
//       "Designed to be interactive, involving the user actively through speaking, listening, reading, and writing exercises.",
//     buttonText: "Get Started",
//     backgroundImage:
//       "https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753451670/WhatsApp_Image_2025-07-24_at_20.59.44_kbzsxo.jpg",
//   },
//   {
//     icon: "settings",
//     title: "Personalized Learning",
//     description:
//       "Tailor-made learning paths are created based on the user's proficiency level, goals, and learning pace.",
//     buttonText: "Get Started",
//     backgroundImage:
//       "https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753451670/WhatsApp_Image_2025-07-24_at_20.58.28_rxj4nr.jpg",
//   },
//   {
//     icon: "bar-chart",
//     title: "Progress Tracking",
//     description:
//       "We offer detailed insights and analytics on performance, highlighting strengths and areas for improvement.",
//     buttonText: "Get Started",
//     backgroundImage:
//       "https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753451672/WhatsApp_Image_2025-07-24_at_20.58.50_vyayca.jpg",
//   },
// ];

// Same business number used elsewhere on the site (Nespresso accessories,
// the LinkComponent's WhatsApp links) — was a "1234567890" placeholder here.
const WHATSAPP_NUMBER = "33771948786";

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

export default function FeaturesSection({ features }) {
  const items = features || [];

  const handleWhatsAppClick = (title) => {
    const message = `Hello, I would like to inquire about your ${title} services.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((feature, index) => {
            const Icon = ICONS[feature.icon] || User;
            return (
              <motion.div
                key={feature.title || index}
                variants={item}
                whileHover={{ y: -8 }}
                className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden group h-96"
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${feature.backgroundImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Icon and Title */}
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center w-11 h-11 bg-[#000080] rounded-lg shadow-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description + Button, grouped together at the bottom */}
                  <div>
                    <p className="text-gray-200 text-sm leading-snug mb-4">
                      {feature.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleWhatsAppClick(feature.title)}
                      className="w-full rounded-lg bg-[#000080] hover:bg-blue-700 px-4 py-2.5 
                                 text-sm font-semibold text-white shadow-lg 
                                 transition-colors duration-300
                                 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {feature.buttonText || "Get Started"}
                    </motion.button>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#000080]/20 rounded-full blur-lg"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}