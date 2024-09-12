import React from "react";
import styles from "./searchResult.module.scss";

interface Props {
  children: React.ReactNode;
}

export const SearchResult = ({ children }: Props) => {
  return (
    <div className={styles.searchResult}>
      <h2 className={styles.searchResult__title}>Results</h2>
      {children}
    </div>
  );
};
