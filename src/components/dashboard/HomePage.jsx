import { keepPreviousData, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getHomePageData, updateHomePageData } from '../../http';
import HeroSection from './homePageComponent/HeroSection';
import DiscoverSection from './homePageComponent/DiscoverSection';
import WhySection from './homePageComponent/WhySection';
import FeaturedSection from './homePageComponent/FeaturedSection';
import LoadingComponents from '../LoadingComponents';
import ErrorDisplay from '../ErrorComponent';

// Maps the Dashboard sidebar's section keys (matching the real schema field
// names — heroSection, discoverSection, etc.) to this component's own
// internal tab ids ('hero', 'discover', ...), so clicking a section in the
// sidebar actually jumps to the right tab here instead of doing nothing.
const SECTION_KEY_TO_TAB = {
  heroSection: 'hero',
  discoverSection: 'discover',
  whySection: 'why',
  featuredSections: 'featured',
};

const HomePageAdmin = ({ activeSection }) => {
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
      queryClient.invalidateQueries({ queryKey: ['homepage'] });
      showNotification('Home page data updated successfully!', 'success');
    },
    onError: (error) => {
      showNotification('Failed to update home page data. Please try again.', 'error');
    },
  });

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

  // Jump to the right tab whenever the Dashboard sidebar passes a new
  // section. Only acts on recognized keys, so passing `null` (e.g. when
  // the user clicks the parent "Home Page Details" item itself, rather
  // than a specific section under it) leaves whatever tab is already
  // active alone instead of forcing it back to "hero".
  useEffect(() => {
    const tab = SECTION_KEY_TO_TAB[activeSection];
    if (tab) {
      setActiveTab(tab);
    }
  }, [activeSection]);

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
    
    if (timeSinceLastAdd < 1000) {
      console.log('Add operation blocked - too soon after last add');
      return;
    }
    
    lastOperationRef.current.add = now;
    
    setHomeData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const newItem = field === 'backgroundImage' ? 
        { url: '', title: '', description: '' } : 
        { url: '', title: '', rate: 0 };
      
      if (!newData[section][field]) {
        newData[section][field] = [];
      }
      
      newData[section][field].push(newItem);
      return newData;
    });
  }, []);

  // Remove image from a section with timestamp-based debouncing
  const removeImage = useCallback((section, field, index) => {
    const now = Date.now();
    const timeSinceLastRemove = now - lastOperationRef.current.remove;
    
    if (timeSinceLastRemove < 1000) {
      console.log('Remove operation blocked - too soon after last remove');
      return;
    }
    
    lastOperationRef.current.remove = now;
    
    setHomeData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      
      if (newData[section][field] && typeof index === 'number' && index >= 0 && index < newData[section][field].length) {
        newData[section][field].splice(index, 1);
      }
      
      return newData;
    });
  }, []);

  // Auto-save to DB after a successful image upload
  // Uses setHomeData functional form to read the latest state without stale closure
  const handleImageUploaded = useCallback(() => {
    const homepageId = resData?.data?.data?._id || resData?.data?.data?.id;
    if (!homepageId) {
      showNotification('Unable to find homepage ID. Please refresh and try again.', 'error');
      return;
    }

    // Small delay to ensure the state update from handleInputChange has settled
    setTimeout(() => {
      setHomeData(prevData => {
        updateMutation.mutate({ id: homepageId, data: prevData });
        return prevData; // Return unchanged — we're just reading the latest state
      });
    }, 100);
  }, [resData, updateMutation]);

  // Handle form submission with mutation
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const homepageId = resData?.data?.data?._id || resData?.data?.data?.id;
    
    if (!homepageId) {
      showNotification('Unable to find homepage ID. Please refresh and try again.', 'error');
      return;
    }
    
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
     <ErrorDisplay />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed header */}
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Home Page Content Management</h1>
        </div>
      
        {/* Tabs */}
        <div className="border-b border-gray-200 w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto py-2 sm:py-0 space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 hide-scrollbar">
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
                className={`whitespace-nowrap py-3 px-2 sm:py-4 sm:px-1 border-b-2 font-medium text-xs sm:text-sm ${
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
        {/* Notification */}
        {notification.show && (
          <div className={`mb-6 p-4 rounded-md sticky top-[117px] z-20 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === 'hero' && (
              <HeroSection 
                key={`hero-${homeData.heroSection.backgroundImage.length}`}
                heroSection={homeData.heroSection}
                handleInputChange={handleInputChange}
                addImage={addImage}
                removeImage={removeImage}
                onImageUploaded={handleImageUploaded}
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

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HomePageAdmin;