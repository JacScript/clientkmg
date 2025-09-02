// import React from "react";
// import Carousel from "../../components/Carousel";

// import SendRequestForm from "../../components/SendRequestForm";
// import { IoLogoWhatsapp } from "react-icons/io";
// import Discover from "../../components/home/discovery/Discover";
// import IntroText from "../../components/home/IntroText";
// import Hero from "../../components/home/hero/Hero";
// import SmallWord from "../../components/home/smallTalk/SmallTalk";
// import SmallTalk from "../../components/home/smallTalk/SmallTalk";
// import Why from "../../components/home/why/Why";
// import About from "../../components/About";
// import Testimonial from "../../components/home/testimonial/Testimonial";
// import ContactUs from "../../components/contact/Contact";
// import Footer from "../../components/Footer";
// import FeatureTour from "../../components/home/featureTour/FeatureTour";
// import CombineHomeAndDiscovery from "../../components/CombinedHomeAndDiscoveryComponent"
// import UseTitle from "../../components/useTitle";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getHomePageData } from "../../http";


// const Home = () => {
//   const { data: resData, isLoading, isError } = useQuery({
//     queryKey: ['homepage'],
//     queryFn: async () => {
//       return await getHomePageData();
//     },
//     placeholderData: keepPreviousData,
//   });

//   console.log("home data", resData?.data.data)

//   const response = resData?.data.data;

//    UseTitle('Home')

//   return (
//     <div className="max-w-screen scrollbar-hide">
     

    
// <CombineHomeAndDiscovery data={response}/>

     

     

//       {/* Why section */}
//       <Why/>

//       {/* About */}

//       {/* <About/> */}

//       <FeatureTour/>

//       {/* Testimonial */}

//       {/* <Testimonial/> */}

//       {/* contact */}
//     <ContactUs id='homecontact'/>

// {/* <Footer/> */}
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState, Suspense, lazy } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHomePageData } from "../../http";
import UseTitle from "../../components/useTitle";

// Lazy load components for better performance
const CombineHomeAndDiscovery = lazy(() => import("../../components/CombinedHomeAndDiscoveryComponent"));
const Why = lazy(() => import("../../components/home/why/Why"));
const FeatureTour = lazy(() => import("../../components/home/featureTour/FeatureTour"));
const ContactUs = lazy(() => import("../../components/contact/Contact"));

// Reusable Loading Components
const SectionSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-32 bg-gray-300 rounded"></div>
  </div>
);

const LoadingSpinner = () => (
  <div>

  </div>
  // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
  //   <div className="text-center">
  //     <div className="relative">
  //       <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto"></div>
  //       <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-blue-200 mx-auto"></div>
  //     </div>
  //     <h2 className="mt-6 text-xl font-semibold text-gray-800">Loading Your Experience</h2>
  //     <p className="mt-2 text-gray-600">Preparing amazing content...</p>
  //     <div className="mt-4 flex justify-center space-x-1">
  //       {[0, 1, 2].map((i) => (
  //         <div
  //           key={i}
  //           className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
  //           style={{ animationDelay: `${i * 0.1}s` }}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // </div>
);

const ErrorState = ({ onRetry, error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="text-center max-w-md mx-auto">
      <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
        <svg className="h-12 w-12 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Something Went Wrong</h3>
      <p className="text-gray-600 mb-6">We're having trouble loading the content. Don't worry, it's not you!</p>
      
      {process.env.NODE_ENV === 'development' && error && (
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-800 font-mono">{error.message}</p>
        </div>
      )}
      
      <div className="space-y-3">
        <button 
          onClick={onRetry}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full sm:w-auto block sm:inline-block ml-0 sm:ml-3 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Go Home
        </button>
      </div>
    </div>
  </div>
);

// Section wrapper with intersection observer for animations
const AnimatedSection = ({ id, children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id, delay]);

  return (
    <section 
      id={id} 
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </section>
  );
};

// Component fallback for suspense
const ComponentFallback = ({ height = "h-64" }) => (
  <div className={`flex items-center justify-center ${height} bg-gray-50`}>
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Main content sections
const HomeContent = ({ data }) => (
  <div className="max-w-screen overflow-x-hidden">
    {/* Hero & Discovery Combined Section */}
    <AnimatedSection id="hero-discovery" className="relative">
      <Suspense fallback={<ComponentFallback height="h-screen" />}>
        <CombineHomeAndDiscovery data={data} />
      </Suspense>
    </AnimatedSection>

    {/* Why Choose Us Section */}
    <AnimatedSection id="why-section" className="py-12 md:py-20 bg-white" delay={200}>
      <Suspense fallback={<SectionSkeleton className="h-96 mx-8" />}>
        <Why data={data}/>
      </Suspense>
    </AnimatedSection>

    {/* Feature Tour Section */}
    <AnimatedSection id="feature-tour" className=" bg-gradient-to-br from-gray-50 to-blue-50" delay={400}>
      <Suspense fallback={<SectionSkeleton className="h-96 mx-8" />}>
        <FeatureTour data={data?.featuredSections} />
      </Suspense>
    </AnimatedSection>

    {/* Contact Section */}
    {/* <AnimatedSection id="contact-section" className="py-12 md:py-20 bg-white" delay={600}> */}
      {/* <Suspense fallback={<SectionSkeleton className="h-80 mx-8" />}> */}
        <ContactUs id="homecontact" />
      {/* </Suspense> */}
    {/* </AnimatedSection> */}
  </div>
);

// Floating Back to Top Button
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 left-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

// Performance monitoring (development only)
const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        // console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
      };
    }
  }, [componentName]);
};

// Main Home Component
const Home = () => {
  // Performance monitoring in development
  usePerformanceMonitor('Home Component');

  // Set dynamic page title
  UseTitle('Home - Experience the Extraordinary');

  // Fetch homepage data with enhanced configuration
  const { 
    data: resData, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ['homepage'],
    queryFn: getHomePageData,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    onError: (error) => {
      // console.error('Homepage data fetch failed:', error);
      // Optional: Send error to monitoring service
    },
    onSuccess: (data) => {
      // console.log('Homepage data loaded successfully');
    }
  });

  // Extract response data
  const homeData = resData?.data?.data;

  // Handle retry
  const handleRetry = () => {
    refetch();
  };

  // Add structured data for SEO
  useEffect(() => {
    if (homeData) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Home",
        "description": "Experience extraordinary travel and services",
        "url": window.location.href
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [homeData]);

  // Debug logging (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // console.group('Home Component Debug');
      // console.log('Data loading:', isLoading);
      // console.log('Data fetching:', isFetching);
      // console.log('Has error:', isError);
      // console.log('Home data:', homeData);
      if (error) console.error('Error details:', error);
      // console.groupEnd();
    }
  }, [isLoading, isFetching, isError, homeData, error]);

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (isError) {
    return <ErrorState onRetry={handleRetry} error={error} />;
  }

  // Success state
  return (
    <>
      <main className="scrollbar-hide relative min-h-screen">
        {/* Background refetch indicator */}
        {isFetching && !isLoading && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-blue-200 z-50">
            <div className="h-full bg-blue-600 animate-pulse"></div>
          </div>
        )}
        
        <HomeContent data={homeData} />
        <BackToTopButton />
      </main>
    </>
  );
};

// Export with error boundary wrapper
export default React.memo(Home);