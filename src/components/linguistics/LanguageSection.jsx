import React from 'react';
import { motion } from 'framer-motion';
import { CiGlobe, CiUser } from "react-icons/ci";
import { SlBookOpen } from "react-icons/sl";
import { GoZap } from "react-icons/go";
import Link from '../LinkComponent';

const ICONS = {
  users: CiUser,
  globe: CiGlobe,
  zap: GoZap,
  "book-open": SlBookOpen,
};

const DEFAULT_HEADING_LINES = ['Master', 'Swahili in', '30 days'];

const DEFAULT_BENEFITS = [
  { icon: 'users', text: 'Learn from native speakers', color: 'text-orange-400' },
  { icon: 'globe', text: 'Network with global speakers', color: 'text-sky-300' },
  { icon: 'zap', text: 'Personalized learning experience', color: 'text-yellow-400' },
  { icon: 'book-open', text: 'Interactive lessons & practice', color: 'text-amber-400' },
];

const DEFAULT_STATS = [
  { value: '100', label: 'Active Learners' },
  { value: '95%', label: 'Success Rate' },
  { value: '30', label: 'Days Average' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function LanguageHeroSection({
  headingLines = [DEFAULT_HEADING_LINES],
  description = "Revolutionary learning system designed by language experts and cognitive scientists. Experience immersive, AI-powered lessons that adapt to your pace.",
  stats = DEFAULT_STATS,
  benefits = DEFAULT_BENEFITS,
  buttonText = "Get Started",
}) {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-[#0B1130] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-18 w-full">
        <motion.div
          className="text-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Stats Bar */}
          <motion.div variants={item} className="flex justify-center gap-10 sm:gap-16 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            {headingLines.map((line, i) => {
              const isLast = i === headingLines.length - 1;
              return (
                <React.Fragment key={line}>
                  {isLast ? (
                    <span className="relative inline-block">
                      <span className="text-yellow-400">{line}</span>
                      <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></span>
                    </span>
                  ) : i === 0 ? (
                    <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                  {!isLast && " "}
                </React.Fragment>
              );
            })}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {benefits.map((benefit) => {
              const Icon = ICONS[benefit.icon] || CiUser;
              return (
                <div
                  key={benefit.text}
                  className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <Icon className={`w-6 h-6 shrink-0 ${benefit.color || 'text-orange-400'}`} />
                  <span className="text-white/90 text-sm sm:text-base text-left">{benefit.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={item} className="flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                message="Hello, I would like to inquire about your linguistics services."
                isWhatsApp={true}
                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {buttonText}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}