import Splash from "./SplashScreen";
import Setup from "./Setup";
import AuthenticatedRoute from "./AuthenticatedRoute";
import useAuthToken from "./useAuthToken";

import * as React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SpotifyProvider from "./SpotifyProvider";

function NavLinks() {
  const [isAuth, accessToken] = useAuthToken();
  console.log({ isAuth, accessToken });

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Splash</Link>
          </li>
          {isAuth ? (
            <></>
          ) : (
            <li>
              <Link to="/setup">Setup</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SpotifyProvider>
        <NavLinks />
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
