
import React, { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHomePageData, getTestimonials } from "../../http";
import UseTitle from "../../components/useTitle";
import Testimonial from "../../components/home/testimonial/Testimonial";

// Lazy load components for better performance
const CombineHomeAndDiscovery = lazy(() => import("../../components/CombinedHomeAndDiscoveryComponent"));
const Why = lazy(() => import("../../components/home/why/Why"));
const FeatureTour = lazy(() => import("../../components/home/featureTour/FeatureTour"));
const ContactUs = lazy(() => import("../../components/contact/Contact"));

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
      console.error('Error caught by boundary:', error, errorInfo);
    }
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">Please refresh the page to try again</p>
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

// Reusable Loading Components
const SectionSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg p-6 ${className}`}>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-32 bg-gray-300 rounded"></div>
  </div>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
    {/* <div className="text-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-blue-200 mx-auto"></div>
      </div>
      <h2 className="mt-6 text-xl font-semibold text-gray-800">Loading Your Experience</h2>
      <p className="mt-2 text-gray-600">Preparing amazing content...</p>
      <div className="mt-4 flex justify-center space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div> */}
  </div>
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

// Safe component wrapper
const SafeComponent = ({ children, fallback = null, name = "Component" }) => {
  try {
    return children();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`${name} crashed:`, error);
    }
    return fallback || <div className="p-4 text-center text-gray-500">Component temporarily unavailable</div>;
  }
};

// Main content sections
const HomeContent = ({ homeData, testimonialData }) => {
  // Safely extract testimonial data
  const testimonials = useMemo(() => {
    try {
      if (!testimonialData) return [];
      if (testimonialData?.data?.data) return testimonialData.data.data;
      if (testimonialData?.data) return testimonialData.data;
      if (Array.isArray(testimonialData)) return testimonialData;
      return [];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error processing testimonial data:', error);
      }
      return [];
    }
  }, [testimonialData]);

  return (
    <div className="max-w-screen overflow-x-hidden">
      {/* Hero & Discovery Combined Section */}
      <AnimatedSection id="hero-discovery" className="relative">
        <Suspense fallback={<ComponentFallback height="h-screen" />}>
          <SafeComponent name="CombineHomeAndDiscovery" fallback={<ComponentFallback height="h-screen" />}>
            {() => <CombineHomeAndDiscovery data={homeData} />}
          </SafeComponent>
        </Suspense>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection id="why-section" className="py-12 md:py-20 bg-white" delay={200}>
        <Suspense fallback={<SectionSkeleton className="h-96 mx-8" />}>
          <SafeComponent name="Why" fallback={<SectionSkeleton className="h-96 mx-8" />}>
            {() => <Why data={homeData} />}
          </SafeComponent>
        </Suspense>
      </AnimatedSection>

      {/* Feature Tour Section */}
      <AnimatedSection id="feature-tour" className="bg-gradient-to-br from-gray-50 to-blue-50" delay={400}>
        <Suspense fallback={<SectionSkeleton className="h-96 mx-8" />}>
          <SafeComponent name="FeatureTour" fallback={<SectionSkeleton className="h-96 mx-8" />}>
            {() => <FeatureTour data={homeData?.featuredSections} />}
          </SafeComponent>
        </Suspense>
      </AnimatedSection>

      {/* Testimonial Section */}
      <AnimatedSection id="testimonial" className="bg-gradient-to-br from-gray-50 to-blue-50" delay={600}>
        <Suspense fallback={<SectionSkeleton className="h-96 mx-8" />}>
          <SafeComponent name="Testimonial" fallback={<SectionSkeleton className="h-96 mx-8" />}>
            {() => <Testimonial data={testimonials} />}
          </SafeComponent>
        </Suspense>
      </AnimatedSection>

      {/* Contact Section */}
      <SafeComponent name="ContactUs" fallback={<div className="h-20 bg-gray-50"></div>}>
        {() => <ContactUs id="homecontact" />}
      </SafeComponent>
    </div>
  );
};

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

// Main Home Component
const Home = () => {
  // Set dynamic page title
  UseTitle('Home - Experience the Extraordinary');

  // Fetch homepage data with enhanced configuration
  const { 
    data: resData, 
    isLoading: homeLoading, 
    isError: homeError, 
    error: homeErrorObj, 
    refetch: refetchHome,
    isFetching: homeFetching 
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
  });

  // Fetch testimonials data
  const { 
    data: testimonialData, 
    isLoading: testimonialLoading,
    isError: testimonialError,
    refetch: refetchTestimonials 
  } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Extract response data safely
  const homeData = useMemo(() => {
    try {
      return resData?.data?.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error extracting home data:', error);
      }
      return null;
    }
  }, [resData]);

  // Handle retry for both queries
  const handleRetry = () => {
    refetchHome();
    refetchTestimonials();
  };

  // Debug logging (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // console.group('Home Component Debug');
      // console.log('Home data loading:', homeLoading);
      // console.log('Testimonial data loading:', testimonialLoading);
      // console.log('Home data:', homeData);
      // console.log('Testimonial data:', testimonialData);
      if (homeErrorObj) console.error('Home error:', homeErrorObj);
      if (testimonialError) console.error('Testimonial error:', testimonialError);
      // console.groupEnd();
    }
  }, [homeLoading, testimonialLoading, homeData, testimonialData, homeErrorObj, testimonialError]);

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
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [homeData]);

  // Loading state - only show if critical home data is loading
  if (homeLoading && !homeData) {
    return <LoadingSpinner />;
  }

  // Error state - only show if home data failed (testimonials are optional)
  if (homeError) {
    return <ErrorState onRetry={handleRetry} error={homeErrorObj} />;
  }

  // Success state
  return (
    <ErrorBoundary>
      <main className="scrollbar-hide relative min-h-screen">
        {/* Background refetch indicator */}
        {(homeFetching && !homeLoading) && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-blue-200 z-50">
            <div className="h-full bg-blue-600 animate-pulse"></div>
          </div>
        )}
        
        <HomeContent homeData={homeData} testimonialData={testimonialData} />
        <BackToTopButton />
      </main>
    </ErrorBoundary>
  );
};

// Export with React.memo for performance
export default React.memo(Home);