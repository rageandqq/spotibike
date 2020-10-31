import * as React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useUserSongs from "./hooks/useUserSongs";
import useTopSongs from "./hooks/useTopSongs";
import useFilterTracksByBPM from "./hooks/useFilterTracksByBPM";

import SpotifyContext from "./SpotifyContext";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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

// https://scotch.io/courses/the-ultimate-guide-to-javascript-algorithms/array-chunking
function chunkArray(array: any[], size: number) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

function useSongs(
  useUserArtists: boolean
): [any, () => void, boolean, boolean] {
  // TODO: Figure out how to only issue query for one of these
  const userSongs = useUserSongs();
  const topSongs = useTopSongs();

  return useUserArtists ? userSongs : topSongs;
}

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

  const [tracks, loadMore, hasMore, isLoadingMore] = useSongs(useUserArtists);

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
        // Ensure that we only add up to 100 songs at a time
        const chunkedURIs = chunkArray(selectedTrackURIs, 100);
        Promise.all(
          chunkedURIs.map((uris) => api.addTracksToPlaylist(data.id, uris))
        ).then(() => {
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
      {isLoadingMore && <CircularProgress />}
      <Button onClick={loadMore} disabled={!hasMore || isLoadingMore}>
        Load More
      </Button>
    </Box>
  );
}
