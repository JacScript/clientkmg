import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import WhatsAppLink from "./components/WhatsAppLink";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga4";
import { useSelector } from "react-redux";
import Auth from "./pages/private/Login";
import Dashboard from "./pages/private/Dashboard";
import AdminRoute from "./components/AdminRoute";
import logo from "./assets/kmneww.png";

const Home = React.lazy(() => import("./pages/public/Home"));
const Logistics = React.lazy(() => import("./pages/public/Logistics"));
const Linguistics = React.lazy(() => import("./pages/public/Linguistics"));
const AboutUs = React.lazy(() => import("./pages/public/AboutUs"));
const Gallery = React.lazy(() => import("./pages/public/Gallery"));
const Packages = React.lazy(() => import("./pages/public/Packages"));
const AirBnB = React.lazy(() => import("./pages/public/AirBnB"));
const NespressoPage = React.lazy(() => import("./pages/public/Nespresso"));
const NotFound = React.lazy(() => import("./pages/public/NotFound"));
const ApartmentDetailPage = React.lazy(() => import("./pages/public/ApartmentDetailPage"));

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[100vh] bg-white gap-6">
    {/* Spinning ring with logo centred inside */}
    <div className="relative flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full border-4 border-gray-100 border-t-[#000080] animate-spin" />
      <img src={logo} alt="KM Group" className="w-16 h-16 object-contain" />
    </div>
    {/* Staggered bouncing dots */}
    {/* <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-[#000080] animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 rounded-full bg-[#000080] animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 rounded-full bg-[#000080] animate-bounce" style={{ animationDelay: "300ms" }} />
    </div> */}
  </div>
);

// Lifted out of Home.jsx so every public route gets it automatically.
// Home used to render its own copy — that's been removed to prevent a double
// render on the home route.
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-[54px] left-4 z-50 p-3 bg-[#000080] text-white rounded-full shadow-lg hover:bg-[#000060] transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-offset-2 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

const PublicLayout = ({ children }) => (
  <div className="max-w-screen overflow-x-hidden scrollbar-hide">
    <TopBar />
    {/* WhatsApp button — bottom right */}
    <div className="fixed bottom-[54px] right-5 bg-[#25D366] w-10 h-10 lg:w-16 lg:h-16 flex justify-center items-center rounded-full z-10">
      <WhatsAppLink />
    </div>
    {/* Back to top — bottom left, every public page */}
    <BackToTopButton />
    {children}
    <Footer />
  </div>
);

const PrivateLayout = ({ children }) => (
  <div className="max-w-screen overflow-x-hidden">{children}</div>
);

const App = () => {
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    ReactGA.initialize("G-ZW0GC0WYYD");
    ReactGA.initialize("G-7Z6PVG0LT5");
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
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route exact path="/" component={() => <PublicLayout><Home /></PublicLayout>} />
            <Route path="/kiswahili" component={() => <PublicLayout><Linguistics /></PublicLayout>} />
            <Route path="/about-us" component={() => <PublicLayout><AboutUs /></PublicLayout>} />
            <Route path="/gallery" component={() => <PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/packages" component={() => <PublicLayout><Packages /></PublicLayout>} />
            <Route path="/holiday-home" component={() => <PublicLayout><AirBnB /></PublicLayout>} />
            <Route path="/nespresso" component={() => <PublicLayout><NespressoPage /></PublicLayout>} />
            <Route path="/apartments/:slug" component={() => <PublicLayout><ApartmentDetailPage /></PublicLayout>} />
            <Route path="/login" render={() => (isAuth ? <Redirect to="/admin/dashboard" /> : <Auth />)} />
            <Route path="/admin">
              <PrivateLayout>
                <Switch>
                  <AdminRoute path="/admin/dashboard" component={Dashboard} />
                  <Redirect exact from="/admin" to="/admin/dashboard" />
                </Switch>
              </PrivateLayout>
            </Route>
            <Route component={() => <PublicLayout><NotFound /></PublicLayout>} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;