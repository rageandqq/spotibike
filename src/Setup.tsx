import * as React from "react";
import { useContext } from "react";

import S from "spotify-web-api-js";
import SpotifyContext from "./SpotifyContext";

export default function Setup() {
  const { isAuth, api } = useContext(SpotifyContext);
  if (!isAuth) return <></>;

  api.getUserPlaylists().then((data: any) => {
    console.log(data);
  });
  return <span>Logged In!</span>;
}
