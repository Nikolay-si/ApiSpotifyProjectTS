import React from "react";
import styles from "./searchBar.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

export const SearchBar = ({ value, onChange, onClick }: Props) => {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchBar__input}
        value={value}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a song Title"
      />
      <button
        className={styles.searchBar__button}
        type="button"
        onClick={onClick}
      >
        SEARCH
      </button>
    </div>
  );
};
