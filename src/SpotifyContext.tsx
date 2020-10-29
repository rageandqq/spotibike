import * as React from "react";

interface SpotifyContext {
  accessToken?: string;
  expiresAt?: number; // epoch time this expires at
}

const _default: SpotifyContext = {
  accessToken: undefined,
  expiresAt: undefined,
};

export default React.createContext(_default);
