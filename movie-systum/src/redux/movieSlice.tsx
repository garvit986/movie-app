import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieState } from "../interfaces/Types";
import moviesData from "../movies.json";

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

export const loadMovies = createAsyncThunk("movies/loadMovies", async () => {
  return moviesData as Movie[];
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.movies = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load movies";
      });
  },
});

export default moviesSlice.reducer;
