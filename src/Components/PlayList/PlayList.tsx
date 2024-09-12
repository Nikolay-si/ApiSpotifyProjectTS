import React from "react";

import styles from "./PlayList.module.scss";

interface Props {
  children: React.ReactElement;
  name: string;

  onChange: (value: string) => void;
  onClick: () => void;
}

export const PlayList = ({ children, name, onChange, onClick }: Props) => {
  return (
    <div className={styles.playlist}>
      <input
        className={styles.playlist__title}
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
      {children}
      <button className={styles.playlist__button} onClick={onClick}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};
