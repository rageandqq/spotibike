import * as React from "react";

interface SpotifyContext {
  // accessToken: string | null;
  expiresAt: number | null; // epoch time this expires at
  isAuth: boolean;
  api: any; // TODO figure out how tf to do this with typescript
}

const _default: SpotifyContext = {
  // accessToken: null,
  expiresAt: null,
  isAuth: false,
  api: null,
};

export default React.createContext(_default);
