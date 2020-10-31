import { useCallback, useContext, useEffect, useRef, useState } from "react";

import SpotifyContext from "./../SpotifyContext";

export default function useUserSongs(): [any, () => void, boolean, boolean] {
  const [tracks, setTracks] = useState([]);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [trackCount, setTrackCount] = useState<number>(0);
  const [madeFirstRequest, setMadeFirstRequest] = useState<boolean>(false);

  const { api } = useContext(SpotifyContext);

  const offset = tracks.length;
  const loadMore = useCallback(() => {
    setMadeFirstRequest(true);
    setIsLoadingMore(true);
    api
      .getMySavedTracks({ limit: 50, offset })
      .then((data: any) => {
        setTrackCount(data.total);
        const newTracks = data.items.map(
          (i: { added_at: string; track: any }) => i.track
        );
        setTracks(tracks.concat(newTracks));
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [api, tracks, offset]);
  const loadMoreRef = useRef(loadMore);

  useEffect(() => {
    if (tracks.length === 0) {
      loadMoreRef.current();
    }
  }, [tracks]);

  const hasMore = !madeFirstRequest || tracks.length < trackCount;
  return [tracks, loadMore, hasMore, isLoadingMore];
}
