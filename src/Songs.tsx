import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useUserSongs from "./hooks/useUserSongs";
import useTopSongs from "./hooks/useTopSongs";
import useFilterTracksByBPM from "./hooks/useFilterTracksByBPM";

import SpotifyContext from "./SpotifyContext";

import {
  Box,
  Button,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  table: {
    minWidth: 750,
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
  },
});

type TrackInfo = {
  id: string;
  uri: string;
};

export default function Songs() {
  const [selectedTrackInfo, setSelectedTrackInfo] = useState<TrackInfo[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("");
  const { isAuth, api, userID } = useContext(SpotifyContext);
  const classes = useStyles();
  const history = useHistory();

  const params = new URLSearchParams(window.location.search);

  const useUserArtists = params.get("use_user_artists") === "true";
  const minBpm = +(params.get("min_bpm") ?? "0");
  const maxBpm = +(params.get("max_bpm") ?? "0");

  const [userTracks] = useUserSongs();
  const [topTracks] = useTopSongs();
  const tracks = useUserArtists ? userTracks : topTracks;

  const filteredTracks: TrackInfo[] = useFilterTracksByBPM(
    tracks,
    minBpm,
    maxBpm
  );

  if (!isAuth) return <></>;

  const handleClick = (id: string, uri: string) => {
    const selectedIndex = selectedTrackInfo.map((info) => info.id).indexOf(id);
    let newSelected: TrackInfo[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTrackInfo, { id, uri });
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTrackInfo.slice(1));
    } else if (selectedIndex === selectedTrackInfo.length - 1) {
      newSelected = newSelected.concat(selectedTrackInfo.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = selectedTrackInfo.concat(
        selectedTrackInfo.slice(0, selectedIndex),
        selectedTrackInfo.slice(selectedIndex + 1)
      );
    }

    setSelectedTrackInfo(newSelected);
  };

  const handleSelectAllClicked = () => {
    if (selectedTrackInfo.length === 0) {
      const selectedTrackInfo = filteredTracks.map(
        ({ id, uri }: { id: string; uri: string }) => ({
          id,
          uri,
        })
      );
      setSelectedTrackInfo(selectedTrackInfo);
    } else {
      setSelectedTrackInfo([]);
    }
  };

  const isCreateButtonDisabled =
    playlistName.trim() === "" || selectedTrackInfo.length < 1;
  const createPlaylist = () => {
    if (isCreateButtonDisabled) {
      return;
    }
    api
      .createPlaylist(userID, {
        name: playlistName,
        public: false, // make playlist private by default
        description: `${minBpm} to ${maxBpm} BPM playlist - Made with Spotibike`,
      })
      .then((data: { id: string }) => {
        const selectedTrackURIs = selectedTrackInfo.map((info) => info.uri);
        // TODO: handle > 100 items to add to playlist
        api.addTracksToPlaylist(data.id, selectedTrackURIs).then(() => {
          history.push(`/spotibike/success/${data.id}`);
        });
      });
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <div>
        <div>Song Select</div>
        <div>
          Enter Playlist Name:{" "}
          <TextField
            label="Playlist Name"
            variant="filled"
            value={playlistName}
            onChange={(event: any) => setPlaylistName(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={createPlaylist}
            className={classes.button}
            disabled={isCreateButtonDisabled}
          >
            Create Playlist
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table className={classes.table} size={"medium"}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAllClicked}
                  indeterminate={
                    selectedTrackInfo.length > 0 &&
                    selectedTrackInfo.length < filteredTracks.length
                  }
                  checked={selectedTrackInfo.length > 0}
                />
              </TableCell>
              <TableCell>Track Name</TableCell>
              <TableCell>Artist(s)</TableCell>
              <TableCell>Album</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTracks.map((track: any) => {
              const isSelected = selectedTrackInfo
                .map((info: { id: string }) => info.id)
                .includes(track.id);
              return (
                <TableRow
                  hover
                  role="checkbox"
                  key={track.id}
                  onClick={() => handleClick(track.id, track.uri)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell>{track.name}</TableCell>
                  <TableCell>
                    {track.artists.map((a: any) => a.name).join(", ")}
                  </TableCell>
                  <TableCell>{track.album.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
