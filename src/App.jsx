// import React from "react";
// import TopBar from "./components/TopBar";
// import Home from "./pages/Home";
// import Logistics from "./pages/Logistics";
// import {
//   BrowserRouter,
//   Route,
//   Switch,
//   useLocation,
//   Redirect,
// } from "react-router-dom";

// const App = () => {
//   return (
//     <div className="max-w-screen overflow-x-hidden scrollbar-hide">
//       <TopBar/>
//       <Home  />
//       <Logistics/>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Logistics from "./pages/Logistics";
import Footer from "./components/Footer";
import Linguistics from "./pages/Linguistics";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Packages from "./pages/Packages";

// import Visa from "./pages/Visa";
import AirBnB from "./pages/AirBnB";
import { IoLogoWhatsapp } from "react-icons/io";
import WhatsAppLink from "./components/WhatsAppLink";


const App = () => {
  return (
    <Router>
      <div className="max-w-screen overflow-x-hidden scrollbar-hide debug-screens">
        <TopBar />
        <div className="fixed z-60 bottom-[20px] right-0 mr-10 mb-10 bg-[#25D366] w-16 h-16 flex justify-center items-center rounded-full">
        <WhatsAppLink/>
              </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logistics" component={Logistics} />
          <Route path="/kiswahili" component={Linguistics} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/packages" component={Packages} />
          {/* <Route path="/visa" component={Visa} /> */}
          <Route path="/holidayHome" component={AirBnB} />
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
