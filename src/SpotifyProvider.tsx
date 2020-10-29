import * as React from "react";
import SpotifyContext from "./SpotifyContext";

import { useState, useMemo, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

type IProps = {
  children: React.ReactNode;
};

const spotifyApi = new SpotifyWebApi();

export default function SpotifyProvider({ children }: IProps) {
  const api = new SpotifyWebApi();
  const hashParams = new URLSearchParams(
    window.location.hash.substr(1) // skip the first char (#)
  );
  const accessTokenFromAuth = hashParams.get("access_token");
  const expiresInFromAuth = hashParams.get("exipres_in");

  const [accessToken, setAccessToken] = useState<string | null>(
    accessTokenFromAuth
  );
  const [expiresAt, setExpiresAt] = useState<number | null>(
    expiresInFromAuth != null ? +expiresInFromAuth : null // not a typo, use "+" to convert to number
  );

  // This is probbaly unnecessary... but if it changes, we should do something
  useEffect(() => {
    if (accessTokenFromAuth != null) {
      setAccessToken(accessTokenFromAuth);
      api.setAccessToken(accessTokenFromAuth);
    }
    if (expiresInFromAuth != null) {
      setExpiresAt(new Date().getTime() + +expiresInFromAuth); // not a typo, use "+" to convert to number
    }
  }, [accessTokenFromAuth, expiresInFromAuth]);

  if (accessTokenFromAuth != null) {
    api.setAccessToken(accessTokenFromAuth);
  }

  const providerValue = useMemo(
    () => ({
      // accessToken,
      expiresAt,
      isAuth: accessToken != null, // TODO: figure out how to use expiresAt
      api,
    }),
    [accessToken, expiresAt]
  );

  return (
    <SpotifyContext.Provider value={providerValue}>
      {children}
    </SpotifyContext.Provider>
  );
}
