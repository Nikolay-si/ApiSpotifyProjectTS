import { ApiResponse } from "./interface";
import { UserResponse } from "./interface";

export const fetchSpotifyTracksData = async (
  inputValue: string,
  token: string
): Promise<ApiResponse> => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${inputValue}&limit=15`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  return data;
};
export const fetchSpotifyUserData = async (
  token: string
): Promise<UserResponse> => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data: UserResponse = await response.json();
  return data;
};

export const postPlaylistRequest = async ({
  userId,
  token,
  playListName,
}: {
  userId: string;
  token: string;
  playListName: string;
}): Promise<string> => {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: `POST`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playListName,
        description: "Custom playlist",
        public: true,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();

  return data.id;
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
  const responsePost = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackUris,
        position: 0,
      }),
    }
  );
  if (!responsePost.ok) {
    throw new Error(`Error: ${responsePost.status}`);
  }
};
