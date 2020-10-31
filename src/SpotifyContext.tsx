import * as React from "react";

interface SpotifyContext {
  expiresAt: number | null; // epoch time this expires at
  isAuth: boolean;
  api: any; // TODO figure out how tf to do this with typescript
  userID: string | null;
}

const _default: SpotifyContext = {
  expiresAt: null,
  isAuth: false,
  api: null,
  userID: null,
};

export default React.createContext(_default);
