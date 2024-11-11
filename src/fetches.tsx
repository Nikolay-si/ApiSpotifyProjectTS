import {
  ApiResponse,
  UserResponse,
  PlaylistResponse,
  TrackResponse,
  AlbumData,
  AlbumResponse,
} from "./interface";
import {} from "./interface";

export const request = async <TResponse,>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> => {
  const response = await fetch(url, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      ...config.headers,
    },
  });

  const text = await response.text();
  const res = text ? JSON.parse(text) : {};

  if (response.ok) {
    return res;
  }

  throw new Error(`Error ${response.status}: ${res}`);
};

export const fetchSpotifyTracksData = async (
  inputValue: string,
  token: string
): Promise<ApiResponse> => {
  return await request<ApiResponse>(
    `https://api.spotify.com/v1/search?type=track&q=${inputValue}&limit=15`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchSpotifyUserData = async (
  token: string
): Promise<UserResponse> => {
  return await request<UserResponse>("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const postPlaylistRequest = async ({
  userId,
  token,
  playListName,
}: {
  userId: string;
  token: string;
  playListName: string;
}) => {
  const data = await request<PlaylistResponse>(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: playListName,
        description: "Custom playlist",
        public: true,
      }),
    }
  );
  const playListId = data.id;
  return playListId;
};

export const postPlayList = async ({
  userId,
  playListId,
  token,
  trackUris,
}: {
  userId: string;
  playListId: string;
  token: string;
  trackUris: string[];
}): Promise<void> => {
  await request<void>(
    `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uris: trackUris,
        position: 0,
      }),
    }
  );
};

export const fetchSpotifyTrackData = async (
  trackId: string,
  token: string
): Promise<TrackResponse> => {
  return await request<TrackResponse>(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const fetchSpotifyAlbumData = async (
  albumId: string,
  token: string
): Promise<AlbumData[]> => {
  const response = await request<AlbumResponse>(
    `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const albumData = response.items;
  return albumData;
};
