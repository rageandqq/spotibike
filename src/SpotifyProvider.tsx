import * as React from "react";
import SpotifyContext from "./SpotifyContext";

import { useState, useMemo, useEffect } from "react";

type IProps = {
  children: React.ReactNode;
};

export default function SpotifyProvider({ children }: IProps) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [expiresAt, setExpiresAt] = useState<number | undefined>(undefined);

  const hashParams = new URLSearchParams(
    window.location.hash.substr(1) // skip the first char (#)
  );
  const accessTokenFromAuth = hashParams.get("access_token");
  const expiresInFromAuth = hashParams.get("exipres_in");

  useEffect(() => {
    if (accessTokenFromAuth != null) {
      setAccessToken(accessTokenFromAuth);
    }
    if (expiresInFromAuth != null) {
      setExpiresAt(new Date().getTime() + +expiresInFromAuth); // not a typo, use "+" to convert to number
    }
  }, [accessTokenFromAuth, expiresInFromAuth]);

  const providerValue = useMemo(
    () => ({
      accessToken,
      expiresAt,
    }),
    [accessToken, expiresAt]
  );

  return (
    <SpotifyContext.Provider value={providerValue}>
      {children}
    </SpotifyContext.Provider>
  );
}
