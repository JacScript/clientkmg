import React, { Suspense, useEffect } from "react";
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

// Lazy load pages
const Home = React.lazy(() => import("./pages/public/Home"));
const Logistics = React.lazy(() => import("./pages/public/Logistics"));
const Linguistics = React.lazy(() => import("./pages/public/Linguistics"));
const AboutUs = React.lazy(() => import("./pages/public/AboutUs"));
const Gallery = React.lazy(() => import("./pages/public/Gallery"));
const Packages = React.lazy(() => import("./pages/public/Packages"));
const AirBnB = React.lazy(() => import("./pages/public/AirBnB"));
const NotFound = React.lazy(() => import("./pages/public/NotFound"));

// Loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[100vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Layouts
const PublicLayout = ({ children }) => (
  <div className="max-w-screen overflow-x-hidden scrollbar-hide">
    <TopBar />
    <div className="fixed bottom-5 right-5 bg-[#25D366] w-16 h-16 flex justify-center items-center rounded-full z-50">
      <WhatsAppLink />
    </div>
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
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "App.jsx",
    });
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
            {/* Public Routes */}
            <Route exact path="/" component={() => <PublicLayout><Home /></PublicLayout>} />
            <Route path="/kiswahili" component={() => <PublicLayout><Linguistics /></PublicLayout>} />
            <Route path="/about-us" component={() => <PublicLayout><AboutUs /></PublicLayout>} />
            <Route path="/gallery" component={() => <PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/packages" component={() => <PublicLayout><Packages /></PublicLayout>} />
            <Route path="/holiday-home" component={() => <PublicLayout><AirBnB /></PublicLayout>} />

            {/* Auth Route */}
            <Route path="/login" render={() => (isAuth ? <Redirect to="/admin/dashboard" /> : <Auth />)} />

            {/* Private/Admin Routes */}
            {/* Private/Admin Routes */}
<Route path="/admin">
  <PrivateLayout>
    <Switch>
      <AdminRoute path="/admin/dashboard" component={Dashboard} />
      <Redirect exact from="/admin" to="/admin/dashboard" />
    </Switch>
  </PrivateLayout>
</Route>

            {/* <Route path="/admin">
              <PrivateLayout>
                <Switch>
                  <Route path="/admin/dashboard" render={() => (isAuth ? <Dashboard /> : <Redirect to="/login" />)} />
                  <Redirect exact from="/admin" to="/admin/dashboard" />
                </Switch>
              </PrivateLayout>
            </Route> */}

            {/* Catch all */}
            <Route component={() => <PublicLayout><NotFound /></PublicLayout>} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
