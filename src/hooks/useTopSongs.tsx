import { useCallback, useContext, useEffect, useRef, useState } from "react";

import SpotifyContext from "./../SpotifyContext";

const GLOBAL_TOP_50_URI = "37i9dQZEVXbMDoHDwVN2tF";

export default function useTopSongs() {
  const [tracks, setTracks] = useState([]);

  const { api } = useContext(SpotifyContext);

  // todo: use offset for load more
  const loadMore = useCallback(() => {
    api.getPlaylistTracks(GLOBAL_TOP_50_URI).then((data: any) => {
      const tracks = data.items.map(({ track }: { track: any }) => track);
      setTracks(tracks);
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
