// // import React from "react";
// // import TopBar from "./components/TopBar";
// // import Home from "./pages/Home";
// // import Logistics from "./pages/Logistics";
// // import {
// //   BrowserRouter,
// //   Route,
// //   Switch,
// //   useLocation,
// //   Redirect,
// // } from "react-router-dom";

// // const App = () => {
// //   return (
// //     <div className="max-w-screen overflow-x-hidden scrollbar-hide">
// //       <TopBar/>
// //       <Home  />
// //       <Logistics/>
// //     </div>
// //   );
// // };

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import TopBar from "./components/TopBar";
// // import Home from "./pages/Home";
// import Logistics from "./pages/Logistics";
// import Footer from "./components/Footer";
// import Linguistics from "./pages/Linguistics";
// import AboutUs from "./pages/AboutUs";
// import Gallery from "./pages/Gallery";
// import Packages from "./pages/Packages";
// const Home = React.lazy(() => import('./pages/Home'));

// import { ToastContainer } from 'react-toastify';

// // import Visa from "./pages/Visa";
// import AirBnB from "./pages/AirBnB";
// import { IoLogoWhatsapp } from "react-icons/io";
// import WhatsAppLink from "./components/WhatsAppLink";


// const App = () => {
//   return (
//     <>

//      <ToastContainer
//   position="top-right"
//   autoClose={5000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
//   theme="light"
// />
//     <Router>
//       <div className="max-w-screen overflow-x-hidden scrollbar-hide debug-screens">
//         <TopBar />
//         <div className="fixed z-60 bottom-[20px] right-0 mr-10 mb-10 bg-[#25D366] w-16 h-16 flex justify-center items-center rounded-full">
//         <WhatsAppLink/>
//               </div>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route path="/logistics" component={Logistics} />
//           <Route path="/kiswahili" component={Linguistics} />
//           <Route path="/aboutUs" component={AboutUs} />
//           <Route path="/gallery" component={Gallery} />
//           <Route path="/packages" component={Packages} />
//           {/* <Route path="/visa" component={Visa} /> */}
//           <Route path="/holidayHome" component={AirBnB} />
//           <Redirect to="/" />
//         </Switch>
//         <Footer/>
//       </div>
//     </Router>
//     </>
//   );
// };

// export default App;

import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import WhatsAppLink from "./components/WhatsAppLink";
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';

// Lazy load all page components for better code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Logistics = React.lazy(() => import('./pages/Logistics'));
const Linguistics = React.lazy(() => import('./pages/Linguistics'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Packages = React.lazy(() => import('./pages/Packages'));
const AirBnB = React.lazy(() => import('./pages/AirBnB'));

ReactGA.initialize('G-PM8P2MLFTR');
ReactGA.pageview(window.location.pathname + window.location.search);

// Loading component with Tailwind styling
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[100vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

const App = () => {
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
              <Route path="/package" component={Packages} />
              <Route path="/holiday-home" component={AirBnB} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
          
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
