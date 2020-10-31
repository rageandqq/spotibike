import * as React from "react";

import { Route } from "react-router-dom";
import SpotifyContext from "./SpotifyContext";
import { useContext } from "react";

interface IProps {
  children: React.ReactNode;
  path: string;
}

const SPOTIFY_AUTH_URI = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "6fd3ee11d3a146ffad18854c9762964c";
const REDIRECT_URI = "http://localhost:3000/";

const SCOPES = [
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-read", // TODO: Determine if we need thsi
];

const ALWAYS_AUTHENTICATE = false; // TODO: we should figure out when we want to authenticate

const getRedirectURI = () =>
  encodeURI(
    `${SPOTIFY_AUTH_URI}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
      " "
    )}&show_dialog=${ALWAYS_AUTHENTICATE}`
  );

export default function AuthenticatedRoute(props: IProps) {
  const { isAuth } = useContext(SpotifyContext);

  if (!isAuth) {
    window.location.href = getRedirectURI();
  }

  return <Route {...props} />;
}
