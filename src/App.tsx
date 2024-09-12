import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { SearchBar } from "./Components/searchBar/searchBar";
import { TrackList } from "./Components/TtrackList/TrackList";
import { SearchResult } from "./Components/SearchResults/SearchResult";
import { PlayList } from "./Components/PlayList/PlayList";
import { Loader } from "./Components/loader/Loader";
import { SongsMap } from "./interface";
import { spotifyAuth } from "./Auth";
import bombLogo from "./img/bomb-logo.png";
import {
  fetchSpotifyTracksData,
  fetchSpotifyUserData,
  postPlaylistRequest,
  postPlayList,
} from "./fetches";
const BUTTOM_SYNB_DEL = "x";
const BUTTON_SYNB_AD = "+";

function App() {
  const [songsMap, setSongsMap] = useState<SongsMap>({});
  const [searchResultId, setSearchResultId] = useState<string[]>([]);
  const [userPlayListId, setUserPlayListId] = useState<string[]>([]);
  const [playListName, setPlayListName] = useState("Your Playlist");

  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = spotifyAuth.getAccessToken();

    if (token) {
      console.log("Acess Token:", token);
    }
  }, []);

  const handleAddTrack = (id: string) => {
    if (!userPlayListId.some((playId) => playId === id)) {
      setUserPlayListId([...userPlayListId, id]);
      const nextSearchResultId = searchResultId.filter(
        (playId) => id !== playId
      );
      setSearchResultId(nextSearchResultId);
    }
  };

  const handleNameChange = (value: string) => {
    setPlayListName(value);
  };

  const handleDelete = (id: string) => {
    const nextPlayListId = userPlayListId.filter((playId) => playId !== id);
    setUserPlayListId(nextPlayListId);
  };
  const getTrackUrisForPlaylist = (): string[] => {
    return userPlayListId.map((id) => songsMap[id].uri);
  };
  const handleTextChange = (value: string) => {
    setInputValue(value);
  };
  const handleSearch = async () => {
    const token = spotifyAuth.getAccessToken();
    if (!token) {
      console.error("No acess token availible");
      return;
    }

    try {
      const data = await fetchSpotifyTracksData(inputValue, token);

      const tracks = data.tracks.items;
      const mappedTracks = tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        uri: track.uri,
        album: track.album.name,
        image: track.album.images[2].url,
        preview_url: track.preview_url,
      }));
      const formattedTracks = mappedTracks.reduce((acc, track) => {
        acc[track.id] = track;

        return acc;
      }, {} as SongsMap);
      console.log(formattedTracks);
      setSongsMap(formattedTracks);
      const searchResponse = tracks.map((track) => track.id);
      const userPlayListSet = new Set(userPlayListId);
      const searchDisplayed = searchResponse.filter(
        (id) => !userPlayListSet.has(id)
      );
      setSearchResultId(searchDisplayed);

      console.log(data.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const handlePost = async () => {
    setIsLoading(true);
    const token = spotifyAuth.getAccessToken();
    if (!token) {
      console.error("No acess token availible");
      return;
    }
    try {
      const data = await fetchSpotifyUserData(token);
      const userId = data.id;

      const playListId = await postPlaylistRequest({
        userId,
        token,
        playListName,
      });
      const trackUris = getTrackUrisForPlaylist();

      await postPlayList({ userId, playListId, token, trackUris });
    } catch (error) {
      console.error(`Error`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>
          <span className={styles.header__logo}>Boom</span>
          <img className={styles.header__image} src={bombLogo} alt="logo" />
          box
        </h1>
      </header>
      <div className={styles.main}>
        <SearchBar
          value={inputValue}
          onChange={handleTextChange}
          onClick={handleSearch}
        />
        <div className={styles.lay}>
          <SearchResult>
            <TrackList
              searchResult={searchResultId.map((id) => songsMap[id])}
              onClick={handleAddTrack}
              buttonSymb={BUTTON_SYNB_AD}
            />
          </SearchResult>
          <PlayList
            name={playListName}
            onChange={handleNameChange}
            onClick={handlePost}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <TrackList
                searchResult={userPlayListId.map((id) => songsMap[id])}
                onClick={handleDelete}
                buttonSymb={BUTTOM_SYNB_DEL}
              />
            )}
          </PlayList>
        </div>
      </div>
    </div>
  );
}

export default App;
