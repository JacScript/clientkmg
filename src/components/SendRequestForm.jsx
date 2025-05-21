import React from "react";
import { FaPersonHiking, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const SendRequestForm = () => {
  return (
    <div className="h-24 w-2/3 mx-auto bg-white shadow rounded-lg flex justify-center items-center">
      {/* Destination */}
      <div className="h-full flex-2 flex items-center">
        <div className="flex items-center w-full  border-r border-[#000080]">
          <div className="ml-4">
            <FaLocationDot className="text-[#000080]" size={40} />
          </div>

          <div className="flex flex-col ml-4">
            <label
              for="activities"
              class="block mb-1 text-sm font-extrabold  text-[#000080] dark:text-white pl-1"
            >
              Destination
            </label>
            <select
              id="activities"
              className="w-64 border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 px-2.5 dark:bg-[#000080] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an activity</option>
              <option value="hiking">Hiking</option>
              <option value="safari">Safari</option>
              <option value="city-tour">City Tour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="h-full flex-2 flex items-center">
        <div className="flex items-center w-full  border-r border-[#000080]">
          <div className="ml-4">
            <FaPersonHiking className="text-[#000080]" size={40} />
          </div>

          <div className="flex flex-col ml-4">
            <label
              for="activities"
              class="block mb-1 text-sm font-extrabold  text-[#000080] dark:text-white pl-1"
            >
              Activity
            </label>
            <select
              id="activities"
              className="w-64 border border-[#000080a4] text-[#000080] text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 px-2.5 dark:bg-[#000080] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an activity</option>
              <option value="hiking">Hiking</option>
              <option value="safari">Safari</option>
              <option value="city-tour">City Tour</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-full flex-2 flex items-center">
        <div className="flex items-center w-full  border-r border-[#000080]">
          <div className="ml-4">
            <IoMdMail className="text-[#000080]" size={40} />
          </div>

          <div className="flex flex-col ml-4">
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50  w-64 border border-[#000080a4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="h-full flex-1 pl-4">
        <button className="bg-[#000080] text-white font-bold py-2 px-4 h-full w-full rounded-r-lg cursor-pointer">
          Send Request
        </button>
      </div>
    </div>
  );
};

export default SendRequestForm;
