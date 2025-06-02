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

const App = () => {
  return (
    <Router>
      <div className="max-w-screen overflow-x-hidden scrollbar-hide debug-screens">
        <TopBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/logistics" component={Logistics} />
          <Route path="/kiswahili" component={Linguistics} />
          <Route path="/aboutUs" component={AboutUs} />
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
