import Splash from "./SplashScreen";
import Setup from "./Setup";
import AuthenticatedRoute from "./AuthenticatedRoute";

import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SpotifyProvider from "./SpotifyProvider";

function App() {
  return (
    <Router>
      <SpotifyProvider>
        <Switch>
          <AuthenticatedRoute path="/setup">
            <Setup />
          </AuthenticatedRoute>
          <Route path="/">
            <Splash />
          </Route>
        </Switch>
      </SpotifyProvider>
    </Router>
  );
}

export default App;
