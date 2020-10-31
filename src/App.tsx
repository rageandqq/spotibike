import Splash from "./SplashScreen";
import Setup from "./Setup";
import Songs from "./Songs";
import Success from "./Success";
import AuthenticatedRoute from "./AuthenticatedRoute";

import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SpotifyProvider from "./SpotifyProvider";

function App() {
  return (
    <Router>
      <SpotifyProvider>
        <Switch>
          <AuthenticatedRoute path="/spotibike/success/:playlistid">
            <Success />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/spotibike/songs">
            <Songs />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/spotibike/setup">
            <Setup />
          </AuthenticatedRoute>
          <Route path="/spotibike/">
            <Splash />
          </Route>
        </Switch>
      </SpotifyProvider>
    </Router>
  );
}

export default App;
