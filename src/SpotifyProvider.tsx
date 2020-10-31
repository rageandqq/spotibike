import * as React from "react";
import SpotifyContext from "./SpotifyContext";

import { useState, useMemo, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import usePrevious from "./hooks/usePrevious";

type IProps = {
  children: React.ReactNode;
};

const api = new SpotifyWebApi();

export default function SpotifyProvider({ children }: IProps) {
  const [userID, setUserID] = useState<null | string>(null);
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

  const initAPI = useCallback((token) => {
    api.setAccessToken(token);
    api.getMe().then((data) => {
      setUserID(data.id);
    });
  }, []);

  // This is probbaly unnecessary... but if it changes, we should do something
  const prevAccessTokenFromAuth = usePrevious<string | null>(
    accessTokenFromAuth
  );
  const prevExpiresInFromAuth = usePrevious<string | null>(expiresInFromAuth);
  useEffect(() => {
    if (
      accessTokenFromAuth != null &&
      prevAccessTokenFromAuth !== accessTokenFromAuth
    ) {
      setAccessToken(accessTokenFromAuth);
      initAPI(accessTokenFromAuth);
    }
    if (
      expiresInFromAuth != null &&
      prevExpiresInFromAuth !== expiresInFromAuth
    ) {
      setExpiresAt(new Date().getTime() + +expiresInFromAuth); // not a typo, use "+" to convert to number
    }
  }, [
    prevAccessTokenFromAuth,
    accessTokenFromAuth,
    prevExpiresInFromAuth,
    expiresInFromAuth,
    initAPI,
  ]);

  const providerValue = useMemo(
    () => ({
      // accessToken,
      expiresAt,
      isAuth: accessToken != null, // TODO: figure out how to use expiresAt
      api,
      userID,
    }),
    [accessToken, expiresAt, userID]
  );

  return (
    <SpotifyContext.Provider value={providerValue}>
      {children}
    </SpotifyContext.Provider>
  );
}
