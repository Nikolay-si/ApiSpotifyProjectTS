import React from "react";

import styles from "./PlayList.module.css";

interface Props {
  children: React.ReactElement;
  name: string;

  onChange: (value: string) => void;
  onClick: () => void;
}

export const PlayList = ({ children, name, onChange, onClick }: Props) => {

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.playlistName}
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
      {children}
      <button className={styles.button} onClick={onClick}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};
