import { useContext } from "react";
import SpotifyContext from "./SpotifyContext";

export default function useIsAuthenticated() {
  const { accessToken } = useContext(SpotifyContext);

  const isAuth = accessToken != null; // TODO: figure out how to use expiresAt

  return [isAuth, accessToken];
}
