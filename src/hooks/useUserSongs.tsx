import { useCallback, useContext, useEffect, useRef, useState } from "react";

import SpotifyContext from "./../SpotifyContext";

export default function useUserSongs() {
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
