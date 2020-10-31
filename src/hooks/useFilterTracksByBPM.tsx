import { useCallback, useContext, useEffect, useState } from "react";

import SpotifyContext from "./../SpotifyContext";

export default function useFilterTracksByBPM(
  tracks: any,
  minBpm: number,
  maxBpm: number
) {
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
  }, [api, tracks, minBpm, maxBpm]);

  useEffect(() => {
    // filter whenever tracks length changes
    filterTracks();
  }, [tracks.length]);

  return filteredTracks;
}
