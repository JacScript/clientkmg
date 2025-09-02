// import React from 'react'
// import Header from '../../components/Header'
// import SafariExpert from '../../components/about/SafariExpert.jsx'
// import UnchartedBoundlessSection from '../../components/about/Uncharted.jsx'
// import FeatureTour from '../../components/home/featureTour/FeatureTour'
// import useTitle from '../../components/useTitle'
// import Testimonial from '../../components/home/testimonial/Testimonial'
// import ContactUs from '../../components/contact/Contact'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { getAboutData, getHomePageData, getTestimonials } from '../../http'

// const AboutUs = () => {


//  const { data: resData, isLoading, isError } = useQuery({
//     queryKey: ['homepage'],
//     queryFn: async () => {
//       return await getHomePageData();
//     },
//     placeholderData: keepPreviousData,
//   });

//    const { data: testimonialData } = useQuery({
//       queryKey: ['testimonials'],
//       queryFn: async () => {
//         return await getTestimonials();
//       },
//       placeholderData: keepPreviousData,
//     });

//  console.log(testimonialData)


//   const { data: responseData } = useQuery({
//     queryKey: ['about'],
//     queryFn: async () => {
//       return await getAboutData();
//     },
//     placeholderData: keepPreviousData,
//   });

//   const responseAboutData = responseData?.data.data;
//   const featureData = resData?.data?.data;
//   const testimonial = testimonialData?.data?.data;


//   useTitle('About Us')
//   return (

//      <div>
//     {(() => {
//       try {
//         return <Header title="About Us" link="about"/>
//       } catch (e) {
//         console.error("Header crashed:", e)
//         return null
//       }
//     })()}

//     {(() => {
//       try {
//         return <UnchartedBoundlessSection data={responseAboutData.mainContent} />
//       } catch (e) {
//         console.error("Uncharted crashed:", e)
//         return null
//       }
//     })()}

//     {(() => {
//       try {
//         return <SafariExpert data={responseAboutData}/>
//       } catch (e) {
//         console.error("SafariExperts crashed:", e)
//         return null
//       }
//     })()}

    

//     {(() => {
//       try {
//         return  <FeatureTour data={featureData?.featuredSections} />
//       } catch (e) {
//         console.error("SafariExperts crashed:", e)
//         return null
//       }
//     })()}

//        {(() => {
//       try {
//         return <Testimonial data={testimonial}/>
//       } catch (e) {
//         console.error("SafariExperts crashed:", e)
//         return null
//       }
//     })()}

//     {(() => {
//       try {
//         return <ContactUs/>
//       } catch (e) {
//         console.error("ContactUs crashed:", e)
//         return null
//       }
//     })()}
//   </div>
//   )
// }

// export default AboutUs;




import React, { useEffect, useMemo } from 'react'
import Header from '../../components/Header'
import SafariExpert from '../../components/about/SafariExpert.jsx'
import UnchartedBoundlessSection from '../../components/about/Uncharted.jsx'
import FeatureTour from '../../components/home/featureTour/FeatureTour'
import useTitle from '../../components/useTitle'
import Testimonial from '../../components/home/testimonial/Testimonial'
import ContactUs from '../../components/contact/Contact'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAboutData, getHomePageData, getTestimonials } from '../../http'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error caught by boundary:', error, errorInfo);
    }
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              Please refresh the page to try again
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe Component Wrapper
const SafeComponent = ({ children, fallback = null, name = "Component" }) => {
  try {
    return children();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`${name} crashed:`, error);
    }
    return fallback;
  }
};

// Loading Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const AboutUs = () => {
  const { data: resData, isLoading: homeLoading, isError: homeError } = useQuery({
    queryKey: ['homepage'],
    queryFn: async () => {
      return await getHomePageData();
    },
    placeholderData: keepPreviousData,
  });

  const { data: testimonialData, isLoading: testimonialLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      return await getTestimonials();
    },
    placeholderData: keepPreviousData,
  });

  const { data: responseData, isLoading: aboutLoading, isError: aboutError } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      return await getAboutData();
    },
    placeholderData: keepPreviousData,
  });

  // Log data changes only when they actually change
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // console.log('Testimonial data updated:', testimonialData);
    }
  }, [testimonialData]);

  // Safely process data with memoization to prevent unnecessary re-computations
  const processedData = useMemo(() => {
    const safeProcessData = (data, fallback = {}) => {
      try {
        if (!data) return fallback;
        // Handle different data structures
        if (data?.data?.data) return data.data.data;
        if (data?.data) return data.data;
        return data;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error("Error processing data:", error);
        }
        return fallback;
      }
    };

    return {
      responseAboutData: safeProcessData(responseData),
      featureData: safeProcessData(resData),
      testimonial: safeProcessData(testimonialData, [])
    };
  }, [responseData, resData, testimonialData]);

  const { responseAboutData, featureData, testimonial } = processedData;

  useTitle('About Us');

  // Show loading state if critical data is still loading
  if (aboutLoading && !responseAboutData?.mainContent) {
    return <LoadingSpinner message="Loading about page..." />;
  }

  // Show error state if critical queries failed
  if (aboutError || homeError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Failed to Load Page
          </h2>
          <p className="text-gray-600 mb-4">
            There was an error loading the page data. Please try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div>
        <SafeComponent 
          name="Header"
          fallback={<div className="h-20 bg-gray-100"></div>}
        >
          {() => <Header title="About Us" link="about" />}
        </SafeComponent>

        <SafeComponent 
          name="UnchartedBoundlessSection"
          fallback={<LoadingSpinner message="Loading content..." />}
        >
          {() => 
            responseAboutData?.mainContent ? (
              <UnchartedBoundlessSection data={responseAboutData.mainContent} />
            ) : (
              <LoadingSpinner message="Loading main content..." />
            )
          }
        </SafeComponent>

        <SafeComponent 
          name="SafariExpert"
          fallback={<LoadingSpinner message="Loading services..." />}
        >
          {() => <SafariExpert data={responseAboutData} />}
        </SafeComponent>

        <SafeComponent 
          name="FeatureTour"
          fallback={homeLoading ? <LoadingSpinner message="Loading features..." /> : null}
        >
          {() => 
            featureData?.featuredSections ? (
              <FeatureTour data={featureData.featuredSections} />
            ) : (
              homeLoading && <LoadingSpinner message="Loading featured sections..." />
            )
          }
        </SafeComponent>

        <SafeComponent 
          name="Testimonial"
          fallback={testimonialLoading ? <LoadingSpinner message="Loading testimonials..." /> : null}
        >
          {() => <Testimonial data={testimonial} />}
        </SafeComponent>

        <SafeComponent 
          name="ContactUs"
          fallback={<div className="h-20 bg-gray-50"></div>}
        >
          {() => <ContactUs />}
        </SafeComponent>
      </div>
    </ErrorBoundary>
  );
};

export default AboutUs;