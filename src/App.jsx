
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import WhatsAppLink from "./components/WhatsAppLink";
import { ToastContainer } from 'react-toastify';
import ReactGA from "react-ga4";


// Lazy load all page components for better code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Logistics = React.lazy(() => import('./pages/Logistics'));
const Linguistics = React.lazy(() => import('./pages/Linguistics'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Packages = React.lazy(() => import('./pages/Packages'));
const AirBnB = React.lazy(() => import('./pages/AirBnB'));
const NotFound = React.lazy(() => import('./pages/NotFound'));


// Loading component with Tailwind styling
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[100vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

const App = () => {



useEffect(() => {
  ReactGA.initialize("G-ZW0GC0WYYD");

  ReactGA.initialize("G-7Z6PVG0LT5");
 


  // Send pageview with a custom path
ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "App.jsx" });
}, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Router>
        <div className="max-w-screen overflow-x-hidden scrollbar-hide debug-screens">
          <TopBar />
          
          {/* WhatsApp floating button */}
          <div className="fixed z-60 bottom-[20px] right-0 mr-10 mb-10 bg-[#25D366] w-16 h-16 flex justify-center items-center rounded-full">
            <WhatsAppLink />
          </div>
          
          {/* Wrap routes in Suspense for lazy loading */}
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/logistics" component={Logistics} />
              <Route path="/kiswahili" component={Linguistics} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/packages" component={Packages} />
              <Route path="/holiday-home" component={AirBnB} />
              {/* Catch all unmatched routes and show NotFound component */}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
          
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;