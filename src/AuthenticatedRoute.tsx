import * as React from "react";

import { Route } from "react-router-dom";
import SpotifyContext from "./SpotifyContext";
import { useContext } from "react";

const HOSTED_APP_URI = "https://rageandqq.github.io/spotibike/";
const HOSTED_APP_DEV_URI = "http://localhost:3000/spotibike/";

const SPOTIFY_AUTH_URI = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "6fd3ee11d3a146ffad18854c9762964c";

const isDev = process.env.NODE_ENV === "development";
const REDIRECT_URI = isDev ? HOSTED_APP_DEV_URI : HOSTED_APP_URI;

const SCOPES = [
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-read",
];

const ALWAYS_AUTHENTICATE = isDev;

const getRedirectURI = () =>
  encodeURI(
    `${SPOTIFY_AUTH_URI}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
      " "
    )}&show_dialog=${ALWAYS_AUTHENTICATE}`
  );

interface IProps {
  children: React.ReactNode;
  path: string;
}
export default function AuthenticatedRoute(props: IProps) {
  const { isAuth } = useContext(SpotifyContext);

  if (!isAuth) {
    window.location.href = getRedirectURI();
  }

  return <Route {...props} />;
}
