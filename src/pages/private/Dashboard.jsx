import React, { useState, useEffect } from "react";
import { MdAssessment, MdHolidayVillage } from "react-icons/md";
import { IoIosGitPullRequest, IoIosArrowDown } from "react-icons/io";
import { TbPackages } from "react-icons/tb";
import { FaComment } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Home, Coffee, Languages, Image } from "lucide-react";
import Testimonial from "../../components/dashboard/Testimonial";
import Request from "../../components/dashboard/Request";
import HolidayHome from "../../components/dashboard/HolidayHome";
import Package from "../../components/dashboard/Package";
import Header from "./Header";
import HomePageAdmin from "../../components/dashboard/HomePage";
import AboutPageAdmin from "../../components/dashboard/aboutPageComponent/About";
import Nespresso from "../../components/dashboard/Nespresso";
import Kiswahili from "../../components/dashboard/Kiswahili";
import Gallery from "../../components/dashboard/Gallery";

// Section lists reflect the real backend schemas (HomePage/About/
// HolidayHomePage models) — not the internals of the admin components
// themselves, which aren't visible here. Testimonial/Request/Package are
// flat CRUD lists rather than sectioned singleton pages, so no dropdown.
const navItems = [
  {
    name: "Home Page Details",
    icon: <Home size={18} />,
    component: HomePageAdmin,
    sections: [
      { key: "heroSection", label: "Hero" },
      { key: "discoverSection", label: "Discover" },
      { key: "whySection", label: "Why Choose Us" },
      { key: "featuredSections", label: "Featured Tours" },
    ],
  },
  {
    name: "About Us",
    icon: <MdAssessment size={18} />,
    component: AboutPageAdmin,
    sections: [
      { key: "mainContent", label: "Main Content" },
      { key: "whoweareSection", label: "Who We Are" },
      { key: "valueSection", label: "Mission & Vision" },
    ],
  },
  {
    name: "Holiday Home",
    icon: <MdHolidayVillage size={18} />,
    component: HolidayHome,
    sections: [
      { key: "heroSection", label: "Hero" },
      { key: "listingsSection", label: "Listings" },
    ],
  },
  {
    name: "Nespresso",
    icon: <Coffee size={18} />,
    component: Nespresso,
    sections: [
      { key: "heroSection", label: "Hero" },
      { key: "machinesSection", label: "Machines" },
      { key: "capsulesSection", label: "Capsules" },
      { key: "accessoriesSection", label: "Accessories" },
      { key: "sustainabilitySection", label: "Sustainability" },
      { key: "orders", label: "Orders" },
    ],
  },
  {
    name: "Kiswahili",
    icon: <Languages size={18} />,
    component: Kiswahili,
    sections: [
      { key: "heroSection", label: "Hero" },
      { key: "featuresSection", label: "Features" },
      { key: "masterySection", label: "Mastery" },
      { key: "ctaSection", label: "CTA" },
    ],
  },
  {
    name: "Gallery",
    icon: <Image size={18} />,
    component: Gallery,
    sections: [
      { key: "page", label: "Page" },
      { key: "categories", label: "Categories" },
      { key: "photos", label: "Photos" },
    ],
  },
  {
    name: "Testimonial",
    icon: <FaComment size={18} />,
    component: Testimonial,
    sections: [],
  },
  {
    name: "Request",
    icon: <IoIosGitPullRequest size={18} />,
    component: Request,
    sections: [],
  },
  {
    name: "Package",
    icon: <TbPackages size={18} />,
    component: Package,
    sections: [],
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [activeSection, setActiveSection] = useState(null);
  const [expandedTab, setExpandedTab] = useState(navItems[0].name);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const activeItem = navItems.find((item) => item.name === activeTab) || navItems[0];
  const ActiveComponent = activeItem.component;

  const handleSelectPage = (item) => {
    setActiveTab(item.name);
    setActiveSection(null);
    setExpandedTab((prev) => (prev === item.name ? prev : item.name));
    setIsSidebarOpen(false);
  };

  const handleToggleExpand = (item, e) => {
    e.stopPropagation();
    setExpandedTab((prev) => (prev === item.name ? null : item.name));
  };

  const handleSelectSection = (item, section) => {
    setActiveTab(item.name);
    setActiveSection(section.key);
    setIsSidebarOpen(false);
  };

  const SidebarContent = () => (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const isActive = activeTab === item.name;
        const isExpanded = expandedTab === item.name;
        const hasSections = item.sections.length > 0;

        return (
          <div key={item.name}>
            <button
              onClick={() => handleSelectPage(item)}
              className={`
                w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg
                text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }
              `}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </span>
              {hasSections && (
                <IoIosArrowDown
                  onClick={(e) => handleToggleExpand(item, e)}
                  className={`transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {hasSections && isExpanded && (
              <div className="mt-1 ml-4 flex flex-col gap-0.5 border-l border-gray-700/50 pl-3">
                {item.sections.map((section) => {
                  const isSectionActive = isActive && activeSection === section.key;
                  return (
                    <button
                      key={section.key}
                      onClick={() => handleSelectSection(item, section)}
                      className={`
                        text-left px-3 py-2 rounded-md text-xs font-medium transition-colors
                        ${
                          isSectionActive
                            ? "bg-purple-500/20 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/40"
                        }
                      `}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden flex flex-col">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <Header />

      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 overflow-y-auto">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="relative z-50 w-64 h-full bg-gray-800/95 backdrop-blur-sm border-r border-gray-700/50 overflow-y-auto">
              <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
                <span className="text-white font-semibold">Menu</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* Main content column */}
        <div className="flex-1 flex flex-col px-4 sm:px-6 py-4 overflow-hidden">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between mb-4 flex-shrink-0">
            <button
              className="flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700/50 text-white font-semibold"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={18} />
              <span className="truncate max-w-[140px]">
                {activeTab}
                {activeSection ? ` · ${activeSection}` : ""}
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div
            className={`flex-1 overflow-auto transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ActiveComponent activeSection={activeSection} />
          </div>
        </div>
      </div>

      {/* Modal Placeholder */}
      {isTableModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scale-in">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Table</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Table Number"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                placeholder="Capacity"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsTableModalOpen(false)}
                className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsTableModalOpen(false)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg rounded-lg text-white font-semibold transition-all"
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scale-in 0.3s ease-out forwards;
  }
`}</style>
    </div>
  );
};

export default Dashboard;