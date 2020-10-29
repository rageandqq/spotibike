import * as React from "react";
import useAuthToken from "./useAuthToken";

import { Route } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  path: string;
}

const SPOTIFY_AUTH_URI = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "";
const REDIRECT_URI = "http://localhost:3000/";

const getRedirectURI = () =>
  encodeURI(
    `${SPOTIFY_AUTH_URI}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`
  );

export default function AuthenticatedRoute(props: IProps) {
  const [isAuth] = useAuthToken();

  if (!isAuth) {
    window.location.href = getRedirectURI();
  }

  return <Route {...props} />;
}
