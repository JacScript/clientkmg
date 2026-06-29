import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { FaPersonHiking, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';
import emailjs from "@emailjs/browser";
import { createRequests } from "../http";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DEFAULT_DESTINATIONS = ["France", "German", "Spain", "Netherlands", "Italy"];
const DEFAULT_ACTIVITIES = ["City Tour", "Cultural Experience", "Beach Activities"];

// Drops any option that's just a repeat of the placeholder text (e.g. the
// "Select an Activity" entry that snuck into the CMS options array — with
// or without stray whitespace, which is why this trims before comparing),
// and de-dupes the rest. Defensive on the frontend even though the real
// fix is cleaning the entry out of the data itself.
const cleanOptions = (options, placeholder) => {
  if (!Array.isArray(options)) return [];
  const seen = new Set();
  const normalizedPlaceholder = (placeholder || '').trim();
  return options
    .map((opt) => (opt || '').trim())
    .filter((trimmed) => {
      if (!trimmed || trimmed === normalizedPlaceholder || seen.has(trimmed)) return false;
      seen.add(trimmed);
      return true;
    });
};

// Custom animated dropdown. The panel is rendered through a portal into
// document.body with `position: fixed`, positioned from the button's real
// on-screen coordinates — NOT as a simple absolutely-positioned child.
// That's deliberate: this dropdown lives inside a card with
// `overflow-hidden` (needed to keep the navy button's square corners from
// poking out past the card's rounded edges), and a normal `absolute`
// child gets silently clipped by that ancestor the moment it extends
// past the card's height. A portal escapes that entirely, here and
// anywhere else this component ends up being used.
const Dropdown = ({ name, placeholder, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.left, width: rect.width });
  };

  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (buttonRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    };
    // Closes on scroll rather than continuously repositioning — simpler,
    // and avoids the panel drifting out of sync with the button mid-scroll.
    const handleScroll = () => setIsOpen(false);
    const handleResize = () => updatePosition();

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} readOnly />

      <motion.button
        ref={buttonRef}
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors focus:outline-none ${
          isOpen ? 'border-[#000080] ring-2 ring-[#000080]/30' : 'border-[#000080a4]'
        } ${value ? 'text-[#000080]' : 'text-gray-400'}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-[#000080]" />
        </motion.span>
      </motion.button>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                ref={panelRef}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  position: 'fixed',
                  top: position.top,
                  left: position.left,
                  width: position.width,
                }}
                className="z-50 max-h-56 overflow-y-auto rounded-lg border border-[#000080a4] bg-white shadow-xl py-1 origin-top"
              >
                {options.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-colors ${
                        value === option ? 'bg-[#000080] text-white font-semibold' : 'text-[#000080] hover:bg-[#00008011]'
                      }`}
                    >
                      <span className="truncate">{option}</span>
                      {value === option && <Check className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

const SendRequestForm = ({ searchBar }) => {
  const queryClient = useQueryClient();

  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destination, setDestination] = useState('');
  const [activity, setActivity] = useState('');

  const destinationOptions = searchBar?.destination?.options?.length
    ? cleanOptions(searchBar.destination.options, searchBar.destination.placeholder)
    : DEFAULT_DESTINATIONS;

  const activityOptions = searchBar?.activity?.options?.length
    ? cleanOptions(searchBar.activity.options, searchBar.activity.placeholder)
    : DEFAULT_ACTIVITIES;

  const destinationPlaceholder = searchBar?.destination?.placeholder || "Select a Destination";
  const activityPlaceholder = searchBar?.activity?.placeholder || "Select an Activity";
  const destinationLabel = searchBar?.destination?.label || "Destination";
  const activityLabel = searchBar?.activity?.label || "Activity";

  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Get form data for validation
    const formData = new FormData(form.current);
    const destinationValue = formData.get('destination');
    const activityValue = formData.get('activity');
    const email = formData.get('user_email');

    // Basic validation
    if (!destinationValue || !activityValue || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID2,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      );

       // ✅ 2. Then create database entry
    await requestMutation.mutateAsync({ destination: destinationValue, activity: activityValue, email });
      
      toast.success("Request sent successfully! We'll get back to you soon.");
      
      // Reset form — the email input resets natively, but the dropdowns
      // are React-controlled, so they need to be reset explicitly too.
      e.target.reset();
      setDestination('');
      setActivity('');
    } catch (error) {
      toast.error("❌ Failed to send request. Please try again.");
      console.error("Email sending failed:", error.text);
    }

    setIsSubmitting(false);
  };

  const requestMutation = useMutation({
    mutationFn: createRequests,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      toast.success("Request created successfully!");
    },
    onError: (error) => {
      toast.error(`Error creating request: ${error.message}`);
    }
  })

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <form ref={form} onSubmit={sendEmail}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Destination */}
            <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FaLocationDot className="text-[#000080] w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-bold text-[#000080] mb-2">
                    {destinationLabel}
                  </label>
                  <Dropdown
                    name="destination"
                    placeholder={destinationPlaceholder}
                    options={destinationOptions}
                    value={destination}
                    onChange={setDestination}
                  />
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FaPersonHiking className="text-[#000080] w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-bold text-[#000080] mb-2">
                    {activityLabel}
                  </label>
                  <Dropdown
                    name="activity"
                    placeholder={activityPlaceholder}
                    options={activityOptions}
                    value={activity}
                    onChange={setActivity}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <IoMdMail className="text-[#000080] w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-[#000080] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    className="w-full px-3 py-2 border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="flex-shrink-0 flex items-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full lg:w-auto bg-[#000080] hover:bg-[#000060] disabled:bg-gray-400 disabled:cursor-not-allowed text-white h-full font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2"
              >
                <span className="text-sm lg:text-base">
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default SendRequestForm;