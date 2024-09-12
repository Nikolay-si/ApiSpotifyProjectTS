import React from "react";
import styles from "./searchResult.module.css";

interface Props {
  children: React.ReactNode;
}

export const SearchResult = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Results</h2>
      {children}
    </div>
  );
};
