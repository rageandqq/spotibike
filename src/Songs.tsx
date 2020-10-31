import * as React from "react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import SpotifyContext from "./SpotifyContext";

import {
  Box,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  table: {
    minWidth: 750,
  },
});

function useUserSongs() {
  const [tracks, setTracks] = useState([]);
  const tracksRef = useRef(tracks);

  const { api } = useContext(SpotifyContext);

  // todo: use offset for load more
  const loadMore = useCallback(() => {
    api
      .getMySavedTracks({ limit: 50, offset: tracksRef.current.length ?? 0 })
      .then((data: any) => {
        setTracks(
          data.items.map((i: { added_at: string; track: any }) => i.track)
        );
      });
  }, [api]);
  const loadMoreRef = useRef(loadMore);

  useEffect(() => {
    if (tracks.length === 0) {
      loadMoreRef.current();
    }
  }, [tracks]);

  return [tracks, loadMoreRef.current];
}

function useFilterTracksByBPM(tracks: any, minBpm: number, maxBpm: number) {
  const [filteredTracks, setFilteredTracks] = useState([]);
  const { api } = useContext(SpotifyContext);

  const filterTracks = useCallback(() => {
    const ids = tracks.map(({ id }: { id: string }) => id);
    // TODO: handle case of more than limit (50) ids
    api
      .getAudioFeaturesForTracks(ids)
      .then(({ audio_features: features }: { audio_features: any }) => {
        const filteredIds = features
          .filter((feature: { tempo: number }) => {
            if (feature == null) {
              return false;
            }
            const { tempo } = feature;
            return tempo >= minBpm && tempo <= maxBpm;
          })
          .map((feature: any) => feature.id);
        const filteredTracks = tracks.filter((t: any) =>
          filteredIds.includes(t.id)
        );
        setFilteredTracks(filteredTracks);
      });
  }, [api, tracks]);

  useEffect(() => {
    // filter whenever tracks length changes
    filterTracks();
  }, [tracks.length]);

  return filteredTracks;
}

export default function Songs() {
  const [selectedTrackIDs, setSelectedTrackIDs] = useState<string[]>([]);
  const { isAuth } = useContext(SpotifyContext);
  const classes = useStyles();

  const params = new URLSearchParams(window.location.search);

  const useUserArtists = params.get("use_user_artists") === "true";
  const minBpm = +(params.get("min_bpm") ?? "0");
  const maxBpm = +(params.get("max_bpm") ?? "0");

  const [tracks] = useUserSongs();
  const filteredTracks = useFilterTracksByBPM(tracks, minBpm, maxBpm);

  if (!isAuth) return <></>;

  const handleClick = (id: string) => {
    const selectedIndex = selectedTrackIDs.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTrackIDs, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTrackIDs.slice(1));
    } else if (selectedIndex === selectedTrackIDs.length - 1) {
      newSelected = newSelected.concat(selectedTrackIDs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = selectedTrackIDs.concat(
        selectedTrackIDs.slice(0, selectedIndex),
        selectedTrackIDs.slice(selectedIndex + 1)
      );
    }

    setSelectedTrackIDs(newSelected);
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <div> Song Select </div>
      <div> Use user artists: {useUserArtists ? "true" : "false"} </div>
      <TableContainer>
        <Table className={classes.table} size={"medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Selected</TableCell>
              <TableCell>Track Name</TableCell>
              <TableCell>Artist(s)</TableCell>
              <TableCell>Album</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTracks.map((track: any) => {
              const isSelected = selectedTrackIDs.includes(track.id);
              return (
                <TableRow key={track.id} onClick={() => handleClick(track.id)}>
                  <TableCell>
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
