import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";

import Facial from "./pages/facial";
import Eyes from "./pages/eyes";
import Direction from "./pages/direction";
import Webcam from "./pages/webcam";

import TiresCorteLateral from "./pages/tiresCorteLateral";
import TiresDesgaste from "./pages/tiresDesgaste";

import Helmet from "./pages/helmet";
import HelmetVideo from "./pages/helmetVideo";

import Antiparra from "./pages/antiparra";
import AntiparraVideo from "./pages/antiparraVideo";

import CountObjects from "./pages/countObjects";
import TrackingObjects from "./pages/trackingObject";

import Areas from "./pages/areas";
import Truck from "./pages/truck";

import { AnimatePresence } from "framer-motion";

const App = () => {
  const rutaIIS = "/ia-web";
  //const rutaIIS = "";

  return (
    <Router>
      <AnimatePresence>
        <Switch>
          <Route component={Home} exact path={`${rutaIIS}/`} />
          <Route component={Facial} exact path={`${rutaIIS}/facial`} />
          <Route component={Eyes} exact path={`${rutaIIS}/eyes`} />
          <Route component={Direction} exact path={`${rutaIIS}/direction`} />
          <Route component={Webcam} exact path={`${rutaIIS}/webcam`} />
          <Route
            component={TiresCorteLateral}
            exact
            path={`${rutaIIS}/tiresCorteLateral`}
          />
          <Route
            component={TiresDesgaste}
            exact
            path={`${rutaIIS}/tiresDesgaste`}
          />
          <Route component={Helmet} exact path={`${rutaIIS}/helmet`} />
          <Route
            component={HelmetVideo}
            exact
            path={`${rutaIIS}/helmetVideo`}
          />
          <Route component={Antiparra} exact path={`${rutaIIS}/antiparra`} />
          <Route
            component={AntiparraVideo}
            exact
            path={`${rutaIIS}/antiparraVideo`}
          />

          <Route
            component={CountObjects}
            exact
            path={`${rutaIIS}/countObjects`}
          />
          <Route
            component={TrackingObjects}
            exact
            path={`${rutaIIS}/trackingObjects`}
          />

          <Route component={Areas} exact path={`${rutaIIS}/areas`} />
          <Route component={Truck} exact path={`${rutaIIS}/truck`} />
        </Switch>
      </AnimatePresence>
    </Router>
  );
};

export default App;
