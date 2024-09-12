import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";
import { TrackPage } from "./Components/trackPage/trackPage";
import { Album } from "./Components/trackPage/albumSlice/album";
import { ROUTES } from "./routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/callback" element={<App />} />
        <Route path="track/:trackId" element={<TrackPage />}>
          <Route path="album/:albumId" element={<Album />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
