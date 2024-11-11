import React, { useEffect } from "react";
import styles from "./trackPage.module.scss";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackInfo } from "./trackPageSlice";
import { spotifyAuth } from "../../Auth";
import { infoSelector } from "./trackPageSlice";
import { AppDispatch } from "../../store";
import { Header } from "../header/header";
import { Loader } from "../loader/Loader";

export const TrackPage = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { trackInfo, loading, error } = useSelector(infoSelector);

  useEffect(() => {
    const token = spotifyAuth.getAccessToken();
    console.log(trackId, token);
    if (trackId && token) {
      dispatch(fetchTrackInfo({ trackId, token }));
      console.log(trackInfo);
    }
  }, []);

  

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!trackInfo) return <div>No track info availible</div>;
  const artists = trackInfo.artists.map((artist) => artist.name).join(" feat ");
  return (
    <div>
      <Header />
      <div className={styles.playerContainer}>
        <h3>{trackInfo.name} </h3>
        <p>{artists}</p>
        <NavLink to={`album/${trackInfo.album.id}`}>
          <img
            className={styles.playerContainer__pic}
            src={trackInfo.album.images[0].url}
            alt=""
          ></img>
        </NavLink>
        <h3>
          <span className={styles.playerContainer__label}>Album:</span>{" "}
          {trackInfo.album.name}
        </h3>
        <p>
          <span className={styles.playerContainer__label}>Release date:</span>{" "}
          {trackInfo.album.release_date}
        </p>
        <iframe
          title="Spotify Track Player"
          className={styles.playerContainer__player}
          src={`https://open.spotify.com/embed/track/${trackId}`}
          frameBorder="0"
        ></iframe>
        <Outlet />
      </div>
    </div>
  );
};
