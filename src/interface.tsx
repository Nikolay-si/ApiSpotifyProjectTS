export interface Song {
  id: string;
  name: string;
  artists: string[];
  uri: string;
  album: string;
  image: string;
  preview_url: string;
}
export interface ApiResponse {
  tracks: {
    items: ApiSong[];
  };
}
export interface ApiSong {
  id: string;
  name: string;
  artists: { name: string }[];
  uri: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  preview_url: string;
}
export interface SongsMap {
  [id: string]: Song;
}
export interface TokenData {
  accessToken: string | null;
  expiresIn: number | null;
}
export interface UserResponse {
  id: string;
}
