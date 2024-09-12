import { useRef, useState } from "react";
import React from "react";
import styles from "./Track.module.css";
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>

        <img className={styles.albumImage} src={image} alt="album cover" />

        <div className={styles.icon}>
          {isPlaying ? (
            <img onClick={handleClick} src={stopIcon} alt="stop button" />
          ) : (

            <img onClick={handleClick} src={playIcon} alt="play button" />

          )}
        </div>
        <div className={styles.info}>
          <h3>{title}</h3>

          <div className={styles.album}>
            <p>{artist.join(", ")}</p>
            <p>| {album}</p>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={preview_url} />
      <button onClick={onClick} className={styles.button}>
        {buttonSymb}
      </button>
    </div>
  );
};
