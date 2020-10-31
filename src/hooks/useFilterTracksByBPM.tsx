import { useCallback, useContext, useEffect, useState } from "react";

import SpotifyContext from "./../SpotifyContext";

import usePrevious from "./usePrevious";

// map track ID to tempo
const tempoMap = new Map<string, null | number>();

export default function useFilterTracksByBPM(
  tracks: any,
  minBpm: number,
  maxBpm: number
) {
  const [filteredTracks, setFilteredTracks] = useState([]);
  const { api } = useContext(SpotifyContext);

  // Tracks is going to grow by 50 every time it changes. The audio features
  // endpoints only accepts 50 (maybe 100) ids at a time. If we keep track of
  // ones we've already queried info for, and only query tempo for new tracks,
  // we'll never hit the limit. Hopefully. ಠ⌣ಠ
  const unfetchedIDs = tracks
    .filter(({ id }: { id: string }) => !tempoMap.has(id))
    .map(({ id }: { id: string }) => id);
  const fetchTempoAndRecalculate = useCallback(() => {
    if (unfetchedIDs.length === 0) {
      return;
    }
    api
      .getAudioFeaturesForTracks(unfetchedIDs)
      .then(({ audio_features: features }: { audio_features: any }) => {
        features.forEach((feature: null | any) => {
          if (feature == null) {
            return;
          }
          tempoMap.set(feature.id, feature.tempo);
        });
        const updatedTracks = tracks.filter((track: any) => {
          const fetchedTempo = tempoMap.get(track.id);
          return (
            fetchedTempo != null &&
            fetchedTempo >= minBpm &&
            fetchedTempo <= maxBpm
          );
        });
        setFilteredTracks(updatedTracks);
      });
  }, [api, unfetchedIDs, minBpm, maxBpm, tracks]);

  const prevTracksLength = usePrevious(tracks.length);
  useEffect(() => {
    // filter whenever tracks length changes
    if (tracks.length !== prevTracksLength) {
      fetchTempoAndRecalculate();
    }
  }, [tracks.length, prevTracksLength, fetchTempoAndRecalculate]);

  return filteredTracks;
}
