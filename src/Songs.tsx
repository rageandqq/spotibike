import * as React from "react";
import { useContext } from "react";

import SpotifyContext from "./SpotifyContext";

import { Box, makeStyles } from "@material-ui/core";

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
});

export default function Songs() {
  const { isAuth } = useContext(SpotifyContext);
  const classes = useStyles();

  const params = new URLSearchParams(window.location.search);

  const useUserArtists = params.get("use_user_artists") === "true";
  const minBpm = +(params.get("min_bpm") ?? "0");
  const maxBpm = +(params.get("max_bpm") ?? "0");

  if (!isAuth) return <></>;

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <div> Song Select </div>
      <div> Use user artists: {useUserArtists ? "true" : "false"} </div>
      <div>
        {" "}
        BPM: {minBpm} - {maxBpm}
      </div>
    </Box>
  );
}
