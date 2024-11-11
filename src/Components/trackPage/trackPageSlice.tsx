import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSpotifyTrackData } from "../../fetches";
import { TrackResponse, TrackState } from "../../interface";
import { RootState } from "../../store";
const initialState: TrackState = {
  trackData: null,
  loading: false,
  error: null,
};

export const fetchTrackInfo = createAsyncThunk<
  TrackResponse,
  { trackId: string; token: string },
  { rejectValue: string }
>(
  "trackInfo/fetchTrackInfo",
  async ({ trackId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchSpotifyTrackData(trackId, token);
      return response;
    } catch (error) {
      return rejectWithValue("Data Fetch Mistake");
    }
  }
);

export const trackInfoSlice = createSlice({
  name: "trackInfoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrackInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.trackData = action.payload;
      })
      .addCase(fetchTrackInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default trackInfoSlice.reducer;
export const infoSelector = (state: RootState) => ({
  trackInfo: state.trackInfo.trackData,
  loading: state.trackInfo.loading,
  error: state.trackInfo.error,
});
