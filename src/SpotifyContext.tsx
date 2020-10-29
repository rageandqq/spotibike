import * as React from "react";

interface SpotifyContext {
  accessToken: string | null;
  expiresAt: number | null; // epoch time this expires at
}

const _default: SpotifyContext = {
  accessToken: null,
  expiresAt: null,
};

export default React.createContext(_default);
