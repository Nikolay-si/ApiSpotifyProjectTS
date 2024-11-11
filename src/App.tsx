import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { SearchBar } from "./Components/searchBar/searchBar";
import { TrackList } from "./Components/TtrackList/TrackList";
import { SearchResult } from "./Components/SearchResults/SearchResult";
import { PlayList } from "./Components/PlayList/PlayList";
import { Loader } from "./Components/loader/Loader";
import { SongsMap } from "./interface";
import { spotifyAuth } from "./Auth";
import { Header } from "./Components/header/header";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [searchResultId, setSearchResultId] = useState<Set<string>>(new Set());
  const [userPlayListId, setUserPlayListId] = useState<Set<string>>(new Set());
  const [playListName, setPlayListName] = useState("Your Playlist");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const location = useLocation();
  useEffect(() => {
    console.log("Current pathname:", location.pathname);
    const query = searchParams.get("query");
    if (location.pathname === "/" && query === null) {
      setSongsMap({});
      setUserPlayListId(new Set());
      setInputValue("");
    }
  }, [location]);
  useEffect(() => {
    const query = searchParams.get("query");
    if (query && query !== inputValue) {
      setInputValue(query);
      trackSearch(query);
    }
  }, [location.search]);

  useEffect(() => {
    const token = spotifyAuth.getAccessToken();

    if (token) {
      console.log("Acess Token:", token);
    }
  }, []);

  const handleAddTrack = (id: string) => {
    setUserPlayListId((prevSet) => new Set([...prevSet, id]));
    setSearchResultId((prevSet) => {
      const updatedSet = new Set(prevSet);
      updatedSet.delete(id);
      return updatedSet;
    });
  };

  const handleNameChange = (value: string) => {
    setPlayListName(value);
  };

  const handleDelete = (id: string) => {
    const nextPlayListId = new Set(userPlayListId);
    nextPlayListId.delete(id);
    setUserPlayListId(nextPlayListId);
  };
  const getTrackUrisForPlaylist = (): string[] => {
    return Array.from(userPlayListId).map((id) => songsMap[id].uri);
  };
  const handleQuaryChange = (value: string) => {
    setInputValue(value);
  };
  const handleSearch = () => {
    if (inputValue) {
      searchParams.set("query", inputValue);
      navigation(`?${searchParams}`);
      trackSearch(inputValue);
    }
  };
  const trackSearch = async (query: string) => {
    const token = spotifyAuth.getAccessToken();
    if (!token) {
      console.error("No acess token availible");
      return;
    }

    try {
      const data = await fetchSpotifyTracksData(query, token);
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
      setSongsMap((prevMap) => ({
        ...prevMap,
        ...formattedTracks,
      }));
      const trackIdList = tracks.map((track) => track.id);
      const userPlayListSet = new Set(userPlayListId);
      const searchDisplayed = trackIdList.filter(
        (id) => !userPlayListSet.has(id)
      );
      const searchDisplayedId = new Set(searchDisplayed);
      setSearchResultId(searchDisplayedId);

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
      console.log(trackUris);
      await postPlayList({ userId, playListId, token, trackUris });
    } catch (error) {
      console.error(`Error`, error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDisplay = (setId: Set<string>) => {
    return [...setId]
      .map((id) => songsMap[id])
      .filter((song) => song !== undefined);
  };

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <SearchBar
          value={inputValue}
          onChange={handleQuaryChange}
          onClick={handleSearch}
        />
        <div className={styles.lay}>
          <SearchResult>
            <TrackList
              trackList={handleDisplay(searchResultId)}
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
                trackList={handleDisplay(userPlayListId)}
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
