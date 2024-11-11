import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./Track.module.scss";
import playIcon from "../../img/play-icon.svg";
import stopIcon from "../../img/stop-icon.svg";
interface Props {
  title: string;
  artist: string[];
  id: string;
  onClick: () => void;
  buttonSymb: string;
  album: string;
  image: string;
  preview_url: string;
}

export const Track = ({
  title,
  artist,
  id,
  onClick,
  buttonSymb,
  album,
  image,
  preview_url,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!audioRef.current || !preview_url) {
      alert("No preview for this track");
      return;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTitleClick = () => {
    navigate(`/track/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <img
          className={styles.track__albumImage}
          src={image}
          alt="album cover"
        />

        <div className={styles.track__playIcon}>
          {isPlaying ? (
            <img onClick={handleClick} src={stopIcon} alt="stop button" />
          ) : (
            <img onClick={handleClick} src={playIcon} alt="play button" />
          )}
        </div>
        <div className={styles.track__info}>
          <h3 onClick={handleTitleClick}>{title}</h3>

          <div className={styles.track__album}>
            <p>{artist.join(", ")}</p>
            <p>| {album}</p>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={preview_url} />
      <button onClick={onClick} className={styles.track__moveButton}>
        {buttonSymb}
      </button>
    </div>
  );
};
