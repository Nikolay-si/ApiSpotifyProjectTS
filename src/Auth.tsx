import { TokenData } from "./interface";

const clientId = "05c3ea21976e455d9ff8c17b2e77c6c1";
const redirectUri =
  process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000/callback";
const scopes = "playlist-modify-public";


export const spotifyAuth = {
  getAccessToken(): string | void {
    const token: string | null = localStorage.getItem("accessToken");
    const tokenExpiresAt: string | null =
      localStorage.getItem("tokenExpiresAt");

    if (token && Date.now() < Number(tokenExpiresAt)) {
      return token;
    }

    const tokenData: TokenData = this.extractTokenFromUrl();
    if (tokenData.accessToken) {
      return tokenData.accessToken;
    } else {
      // Перенаправляем пользователя на авторизацию Spotify
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
    }
  },

  extractTokenFromUrl(): TokenData {
    const hash = window.location.hash.substring(1);
    console.log(hash, "hash");
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (accessToken && expiresIn) {
      const expiresInNumber = parseInt(expiresIn, 10); // Указан radix 10 для явного преобразования
      const tokenExpiresAt = Date.now() + expiresInNumber * 1000;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("tokenExpiresAt", tokenExpiresAt.toString());
      window.history.pushState("", document.title, window.location.pathname);

      return { accessToken, expiresIn: expiresInNumber };
    }
    return { accessToken: null, expiresIn: null };
  },
};
