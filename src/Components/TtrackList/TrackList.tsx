import React from "react";

import styles from "./TrackList.module.css";

import { Track } from "../Track/Track";
import { Song } from "../../interface";
interface Props {
  searchResult: Song[];
  onClick: (id: string) => void;

  buttonSymb: string;
}

export const TrackList = ({ searchResult, onClick, buttonSymb }: Props) => {
  return (
    <div>
      <ul className={styles.trackList}>
        {searchResult.map((result) => (
          <li key={result.id}>

            <Track
              id={result.id}
              title={result.name}
              artist={result.artists}
              onClick={() => onClick(result.id)}
              buttonSymb={buttonSymb}

              album={result.album}
              image={result.image}
              preview_url={result.preview_url}

            />
          </li>
        ))}
      </ul>
    </div>
  );
};
