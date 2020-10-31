import * as React from "react";
import SpotifyContext from "./SpotifyContext";

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

type PlaylistData = {
  external_urls: {
    spotify: string;
  };
  images: string[];
};

function usePlaylistDetails(id: string) {
  const { api } = useContext(SpotifyContext);
  const [playlistData, setPlaylistData] = useState<null | PlaylistData>(null);

  api.getPlaylist(id).then(({ external_urls, images }: PlaylistData) => {
    setPlaylistData({ external_urls, images });
  });

  return playlistData;
}

export default function Success() {
  const { isAuth } = useContext(SpotifyContext);
  const { playlistid: playlistID } = useParams<{ playlistid: string }>();
  const playlistData = usePlaylistDetails(playlistID);

  if (!isAuth) {
    return <></>;
  }

  return (
    <div>
      Playlist Created:{" "}
      <a href={playlistData?.external_urls.spotify}>
        {playlistData?.external_urls.spotify ?? "Loading Details..."}
      </a>
    </div>
  );
}
