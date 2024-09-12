import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotifyAlbumInfo, deleteTrack } from "./albumSlice";
import { useSelector, useDispatch } from "react-redux";
import { albumSelector } from "./albumSlice";
import { AppDispatch } from "../../../store";
import { spotifyAuth } from "../../../Auth";
import { Loader } from "../../loader/Loader";
import styles from "./album.module.scss";
import { infoSelector } from "../trackPageSlice";

export const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { albumData, loading, error } = useSelector(albumSelector);
  const dispatch: AppDispatch = useDispatch();
  const { trackInfo } = useSelector(infoSelector);

  useEffect(() => {
    const token = spotifyAuth.getAccessToken();
    if (token && albumId) {
      dispatch(fetchSpotifyAlbumInfo({ albumId, token }));
    }
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!albumData) return <div>No tracks in this album</div>;

  return (
    <div>
      <h4>
        Totall trakcs in the album - {trackInfo?.album.name} is{" "}
        {albumData.length}
      </h4>
      <ol className={styles.trackList}>
        {albumData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
    </div>
  );
};
