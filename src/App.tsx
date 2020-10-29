import Splash from "./SplashScreen";
import Login from "./Login";

import * as React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Splash</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Splash />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
