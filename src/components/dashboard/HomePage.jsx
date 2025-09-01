

import { keepPreviousData, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getHomePageData, updateHomePageData } from '../../http';
import HeroSection from './homePageComponent/HeroSection';
import DiscoverSection from './homePageComponent/DiscoverSection';
import WhySection from './homePageComponent/WhySection';
import FeaturedSection from './homePageComponent/FeaturedSection';
import LoadingComponents from '../LoadingComponents';

const HomePageAdmin = () => {
  const queryClient = useQueryClient();
  
  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['homepage'],
    queryFn: async () => {
      return await getHomePageData();
    },
    placeholderData: keepPreviousData,
  });

  // Mutation for updating homepage data
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateHomePageData(id, data),
    onSuccess: () => {
      // Invalidate and refetch the homepage data
      queryClient.invalidateQueries({ queryKey: ['homepage'] });
      showNotification('Home page data updated successfully!', 'success');
    },
    onError: (error) => {
      console.error('Error updating homepage data:', error);
      showNotification('Failed to update home page data. Please try again.', 'error');
    },
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
  
  // Use a single ref to track operation timestamps
  const lastOperationRef = useRef({
    add: 0,
    remove: 0
  });

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
  const handleInputChange = useCallback((section, field, value, index = null, subfield = null) => {
    setHomeData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep clone to prevent mutations
      
      if (index !== null) {
        // For array fields
        if (subfield) {
          if (!newData[section][field][index]) {
            newData[section][field][index] = {};
          }
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
  }, []);

  // Add new image to a section with timestamp-based debouncing
  const addImage = useCallback((section, field) => {
    const now = Date.now();
    const timeSinceLastAdd = now - lastOperationRef.current.add;
    
    // If less than 1 second has passed since the last add, ignore this call
    if (timeSinceLastAdd < 1000) {
      console.log('Add operation blocked - too soon after last add');
      return;
    }
    
    lastOperationRef.current.add = now;
    console.log(`Adding image to ${section}.${field} at ${now}`);
    
    setHomeData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep clone
      const newItem = field === 'backgroundImage' ? 
        { url: '', title: '', description: '' } : 
        { url: '', title: '', rate: 0 };
      
      // Ensure the array exists
      if (!newData[section][field]) {
        newData[section][field] = [];
      }
      
      const currentLength = newData[section][field].length;
      newData[section][field].push(newItem);
      
      console.log(`Array length before: ${currentLength}, after: ${newData[section][field].length}`);
      return newData;
    });
  }, []);

  // Remove image from a section with timestamp-based debouncing
  const removeImage = useCallback((section, field, index) => {
    const now = Date.now();
    const timeSinceLastRemove = now - lastOperationRef.current.remove;
    
    // If less than 1 second has passed since the last remove, ignore this call
    if (timeSinceLastRemove < 1000) {
      console.log('Remove operation blocked - too soon after last remove');
      return;
    }
    
    lastOperationRef.current.remove = now;
    console.log(`Removing image at index ${index} from ${section}.${field} at ${now}`);
    
    setHomeData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep clone
      
      // Ensure the array exists and the index is valid
      if (newData[section][field] && typeof index === 'number' && index >= 0 && index < newData[section][field].length) {
        const currentLength = newData[section][field].length;
        newData[section][field].splice(index, 1);
        console.log(`Array length before: ${currentLength}, after: ${newData[section][field].length}`);
      } else {
        console.log('Remove operation failed - invalid array or index');
      }
      
      return newData;
    });
  }, []);

  // Handle form submission with mutation
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Get the homepage ID from the fetched data
    const homepageId = resData?.data?.data?._id || resData?.data?.data?.id;
    
    if (!homepageId) {
      showNotification('Unable to find homepage ID. Please refresh and try again.', 'error');
      return;
    }
    
    console.log('Submitting data:', homeData);
    console.log('Homepage ID:', homepageId);
    
    // Trigger the mutation
    updateMutation.mutate({
      id: homepageId,
      data: homeData
    });
  }, [homeData, resData, updateMutation]);

  // Show loading state
  if (isLoading) {
    return (
      <div className='App'>
        <LoadingComponents/>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed header - stays at the top of the page */}
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Home Page Content Management</h1>
        </div>
      
        {/* Tabs - positioned directly below the header, also sticky */}
        <div className="border-b border-gray-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-4">
        {/* Notification - fixed to the top of the page below the header */}
        {notification.show && (
          <div className={`mb-6 p-4 rounded-md sticky top-[117px] z-20 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Form Content */}
          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === 'hero' && (
              <HeroSection 
                key={`hero-${homeData.heroSection.backgroundImage.length}`}
                heroSection={homeData.heroSection}
                handleInputChange={handleInputChange}
                addImage={addImage}
                removeImage={removeImage}
              />
            )}
            {activeTab === 'discover' && (
              <DiscoverSection 
                key="discover"
                discoverSection={homeData.discoverSection}
                handleInputChange={handleInputChange}
              />
            )}
            {activeTab === 'why' && (
              <WhySection 
                key="why"
                whySection={homeData.whySection}
                handleInputChange={handleInputChange}
              />
            )}
            {activeTab === 'featured' && (
              <FeaturedSection 
                key={`featured-${homeData.featuredSections.backgroundImage.length}`}
                featuredSections={homeData.featuredSections}
                handleInputChange={handleInputChange}
                addImage={addImage}
                removeImage={removeImage}
              />
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  updateMutation.isPending
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {updateMutation.isPending ? 'Saving Changes...' : 'Save Changes'}
              </button>
              
              {updateMutation.isError && (
                <div className="mt-2 text-sm text-red-600">
                  Error saving changes. Please try again.
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default HomePageAdmin;