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

export interface PlaylistResponse {
  id: string;
}

export interface TrackResponse {
  id: string;
  name: string;
  artists: [{ id: string; name: string }];
  album: {
    name: string;
    images: { url: string }[];
    release_date: string;
    id: string;
  };
}

export interface TrackState {
  trackData: TrackResponse | null;
  loading: boolean;
  error: string | null;
}

export interface AlbumData {
  artists: AlbumArtist[];
  name: string;
  id: string;
}

export interface AlbumArtist {
  id: string;
  name: string;
}

export interface AlbumState {
  albumData: AlbumData[];
  loading: boolean;
  error: string | null;
}

export interface AlbumResponse {
  items: AlbumData[];
}
