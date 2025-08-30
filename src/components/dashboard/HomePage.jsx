import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { getHomePageData } from '../../http';
import HeroSection from './homePageComponent/HeroSection';
import DiscoverSection from './homePageComponent/DiscoverSection';
import WhySection from './homePageComponent/WhySection';
import FeaturedSection from './homePageComponent/FeaturedSection';

const HomePageAdmin = () => {
  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['homepage'],
    queryFn: async () => {
      return await getHomePageData();
    },
    placeholderData: keepPreviousData,
  });

  console.log("Home page data:", resData?.data);

  // Initialize with empty data structure that matches your schema
  const [homeData, setHomeData] = useState({
    title: "",
    heroSection: {
      heading: "",
      subheading: "",
      buttonText: "",
      buttonLink: "",
      badge: "",
      backgroundImage: []
    },
    discoverSection: {
      heading: "",
      subheading: "",
      image: "",
      buttonText: "",
      buttonLink: ""
    },
    whySection: {
      title: "",
      heading: "",
      subheading: "",
      image: "",
      buttonText: "",
      buttonLink: ""
    },
    featuredSections: {
      title: "",
      heading: "",
      subheading: "",
      backgroundImage: []
    }
  });

  const [activeTab, setActiveTab] = useState('hero');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Update homeData when API data is available
  useEffect(() => {
    if (resData?.data?.data) {
      setHomeData(resData.data.data);
    }
  }, [resData]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Handle input changes
  const handleInputChange = (section, field, value, index = null, subfield = null) => {
    setHomeData(prevData => {
      const newData = { ...prevData };
      
      if (index !== null) {
        // For array fields
        if (subfield) {
          newData[section][field][index][subfield] = value;
        } else {
          newData[section][field][index] = value;
        }
      } else {
        // For regular fields
        newData[section][field] = value;
      }
      
      return newData;
    });
  };

  // Add new image to a section
  const addImage = (section, field) => {
    setHomeData(prevData => {
      const newData = { ...prevData };
      const newItem = field === 'backgroundImage' ? 
        { url: '', title: '', description: '' } : 
        { url: '', title: '', rate: 0 };
      
      newData[section][field] = [...newData[section][field], newItem];
      return newData;
    });
  };

  // Remove image from a section
  const removeImage = (section, field, index) => {
    setHomeData(prevData => {
      const newData = { ...prevData };
      newData[section][field] = newData[section][field].filter((_, i) => i !== index);
      return newData;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the data to your backend API here
    console.log('Submitting data:', homeData);
    showNotification('Home page data saved successfully!');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Home Page Content Management</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {notification.show && (
          <div className={`mb-6 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'hero', name: 'Hero Section' },
                { id: 'discover', name: 'Discover' },
                { id: 'why', name: 'Why Choose Us' },
                { id: 'featured', name: 'Featured Tours' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === 'hero' && (
              <HeroSection 
                heroSection={homeData.heroSection}
                handleInputChange={handleInputChange}
                addImage={addImage}
                removeImage={removeImage}
              />
            )}
            {activeTab === 'discover' && (
              <DiscoverSection 
                discoverSection={homeData.discoverSection}
                handleInputChange={handleInputChange}
              />
            )}
            {activeTab === 'why' && (
              <WhySection 
                whySection={homeData.whySection}
                handleInputChange={handleInputChange}
              />
            )}
            {activeTab === 'featured' && (
              <FeaturedSection 
                featuredSections={homeData.featuredSections}
                handleInputChange={handleInputChange}
                addImage={addImage}
                removeImage={removeImage}
              />
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default HomePageAdmin;