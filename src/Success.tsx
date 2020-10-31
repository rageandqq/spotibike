import * as React from "react";
import SpotifyContext from "./SpotifyContext";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

type PlaylistData = {
  external_urls: {
    spotify: string;
  };
  images: string[];
};

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  buttons: {
    padding: 64,
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
  },
  link: {
    textDecoration: "none",
  },
  table: {
    maxWidth: 500,
    marginBottom: 40,
  },
});

function usePlaylistDetails(id: string) {
  const { api } = useContext(SpotifyContext);
  const [playlistData, setPlaylistData] = useState<null | PlaylistData>(null);

  useEffect(() => {
    // refetch when either API or ID change
    api.getPlaylist(id).then(({ external_urls, images }: PlaylistData) => {
      setPlaylistData({ external_urls, images });
    });
  }, [api, id]);

  return playlistData;
}

const emptyFunction = () => {};
export default function Success() {
  const { isAuth } = useContext(SpotifyContext);
  const { playlistid: playlistID } = useParams<{ playlistid: string }>();
  const playlistData = usePlaylistDetails(playlistID);

  const classes = useStyles();

  if (!isAuth) {
    return <></>;
  }

  return (
    <div>
      <div>
        Playlist Created:{" "}
        <a href={playlistData?.external_urls.spotify}>
          {playlistData?.external_urls.spotify ?? "Loading Details..."}
        </a>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={emptyFunction}
        className={classes.button}
      >
        <Link
          to={"/spotibike/setup"}
          style={{ textDecoration: "none", color: "white" }}
        >
          Make Another
        </Link>
      </Button>
    </div>
  );
}
