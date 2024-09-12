import { configureStore } from "@reduxjs/toolkit";
import trackInfoReducer from "./Components/trackPage/trackPageSlice";
import albumReducer from "./Components/trackPage/albumSlice/albumSlice";
export const store = configureStore({
  reducer: {
    trackInfo: trackInfoReducer,
    album: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
