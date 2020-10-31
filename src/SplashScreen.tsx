import * as React from "react";
import "./Splash.css";
import SpotifyContext from "./SpotifyContext";

import { Link } from "react-router-dom";
import { useContext } from "react";

export default function Splash() {
  const { isAuth } = useContext(SpotifyContext);

  return (
    <div>
      <header className="Splash-header">
        <Link to="/spotibike/setup">{isAuth ? "Continue" : "Login"}</Link>
      </header>
    </div>
  );
}
