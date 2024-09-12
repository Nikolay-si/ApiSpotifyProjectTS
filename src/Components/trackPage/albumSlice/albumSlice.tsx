import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AlbumState } from "../../../interface";
import { fetchSpotifyAlbumData } from "../../../fetches";
import { AlbumData } from "../../../interface";
import { RootState } from "../../../store";
const initialState: AlbumState = {
  albumData: [],
  loading: false,
  error: null,
};

export const fetchSpotifyAlbumInfo = createAsyncThunk<
  AlbumData[],
  { albumId: string; token: string },
  { rejectValue: string }
>(
  "albumInfo/fetchAlbumInfo",
  async ({ albumId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchSpotifyAlbumData(albumId, token);
      console.log(response);
      return response;
    } catch {
      return rejectWithValue("Data Fetch Mistake");
    }
  }
);

const albumSlice = createSlice({
  name: "albumSlice",
  initialState,
  reducers: {
    deleteTrack: (state, action) => {
      const id = action.payload.id;
      state.albumData = state.albumData.filter((item) => item.id !== id);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpotifyAlbumInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpotifyAlbumInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.albumData = action.payload;
      })
      .addCase(fetchSpotifyAlbumInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { deleteTrack } = albumSlice.actions;
export default albumSlice.reducer;
export const albumSelector = (state: RootState) => ({
  albumData: state.album.albumData,
  loading: state.album.loading,
  error: state.album.error,
});
