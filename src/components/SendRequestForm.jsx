
import React, { useRef, useState } from "react";
import { FaPersonHiking, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { toast } from 'react-toastify';
import emailjs from "@emailjs/browser";
import { createRequests } from "../http";
import { useMutation, useQueryClient } from '@tanstack/react-query';


const SendRequestForm = () => {
  const queryClient = useQueryClient();

  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Get form data for validation
    const formData = new FormData(form.current);
    const destination = formData.get('destination');
    const activity = formData.get('activity');
    const email = formData.get('user_email');

    // Basic validation
    if (!destination || !activity || !email) {
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
    await requestMutation.mutateAsync({ destination, activity, email });
      
      toast.success("🎉 Request sent successfully! We'll get back to you soon.");
      
      // Reset form
      e.target.reset();
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
                  <label
                    htmlFor="destination"
                    className="block text-sm font-bold text-[#000080] mb-2"
                  >
                    Destination
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    className="w-full px-3 py-2 border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select a Destination</option>
                    <option value="France">Tanzania</option>
                    <option value="German">Zanzibar</option>
                    <option value="Spain">Safari</option>
                    <option value="Netherlands">Safari and Zanzibar</option>
                    <option value="Italy">Dar Es Salaam Holiday Home</option>
                    {/* <option value="Netherlands">Netherlands</option> */}
                  </select>
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
                  <label
                    htmlFor="activities"
                    className="block text-sm font-bold text-[#000080] mb-2"
                  >
                    Activity
                  </label>
                  <select
                    id="activities"
                    name="activity"
                    className="w-full px-3 py-2 border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-2 focus:ring-[#000080] focus:border-[#000080] focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select an Activity</option>
                    <option  value="paris_champagne_normandie_tour">Paris, Champagne , Normandie Tour</option>
                    <option value="paris_day_city_tour">Paris Day City Tour</option>
                    <option value="paris_only_holiday">Paris Only Holiday</option>
                  </select>
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