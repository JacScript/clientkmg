import React from "react";
import { FaPersonHiking, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const SendRequestForm = () => {
  return (
    <div className="md:h-24 md:w-2/3 w-[90%] max-md:py-2 mx-auto bg-white md:shadow rounded-lg flex md:flex-row flex-col justify-center items-center">
      {/* Destination */}
      <div className="md:h-full  w-full flex-2 flex items-center justify-center">
        <div className="flex items-center md:w-full w-[80%] mx-auto my-2 pr-2 md:border-r border-[#00008050]">
          <div className="w-1/12 md:w-1/4 h-full flex items-center justify-center max-md:mr-2">
            <FaLocationDot className="text-[#000080]" size={24} />
          </div>

          <div className="flex flex-col md:w-3/4 w-11/12">
            <label
              for="activities"
              className="block mb-[2px] md:text-xs text-xs lg:text-sm font-extrabold  text-[#000080] dark:text-white pl-1"
            >
              Destination
            </label>
            <select
              id="destination"
              className="w-full border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-[#000080] focus:border-[#0000080] block lg:py-2.5 p-2 lg:px-2.5 focus:outline-none  dark:bg-[#000080] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an Destination</option>
              <option value="hiking">Hiking</option>
              <option value="safari">Safari</option>
              <option value="city-tour">City Tour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="md:h-full  w-full flex-2 flex items-center justify-center">
        <div className="flex items-center md:w-full w-[80%] mx-auto my-2 pr-2 md:border-r border-[#00008050]">
          <div className="w-1/12 md:w-1/4 h-full flex items-center justify-center max-md:mr-2">
            <FaPersonHiking className="text-[#000080]" size={24}/>
          </div>

          <div className="flex flex-col md:w-3/4 w-11/12">
            <label
              for="activities"
              class="block mb-[2px] md:text-xs text-xs lg:text-sm font-extrabold  text-[#000080] dark:text-white pl-1"
            >
              Activity
            </label>
            <select
              id="activities"
              className="w-full border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-[#000080] focus:border-[#0000080] block lg:py-2.5 p-2 lg:px-2.5 focus:outline-none  dark:bg-[#000080] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            >
              <option value="">Select an activity</option>
              <option value="hiking">Hiking</option>
              <option value="safari">Safari</option>
              <option value="city-tour">City Tour</option>
            </select>
          </div>
        </div>
      </div>

{/* email */}
      <div className="md:h-full  w-full flex-2 flex items-center justify-center">
        <div className="flex items-center md:w-full w-[80%] mx-auto my-2 pr-2 md:border-r border-[#00008050]">
          <div className="w-1/12 md:w-1/4 h-full flex items-center justify-center max-md:mr-2">
            <IoMdMail className="text-[#000080]" size={20} />
          </div>

          <div className="flex flex-col md:w-3/4 w-11/12">
            <label
              for="email"
              className="block mb-[2px] w-full pl-1 text-sm font-extrabold text-[#000080]"
            >
              Email 
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-[#000080] focus:border-[#0000080] block lg:py-2.5 p-2 lg:px-2.5 focus:outline-none  dark:bg-[#000080] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
        </div>
      </div>

      <div className="md:h-full w-[80%] flex-1 pl-4">
        <button className="bg-[#000080] text-white font-bold py-2 px-4 h-full w-full rounded-lg md:rounded-r-lg text-[12px] md:text-sm cursor-pointer">
          Send Request
        </button>
      </div>
    </div>
  );
};

export default SendRequestForm;
