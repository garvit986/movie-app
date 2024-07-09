import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../interfaces/Types'; 
import moviesData from '../movies.json';

interface MovieState {
    movies: Movie[];
    favorites: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
};

export const loadMovies = createAsyncThunk('movies/loadMovies', async () => {
    return moviesData as Movie[];
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<Movie>) {
            state.favorites.push(action.payload);
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(loadMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load movies';
            });
    },
});

export const { addFavorite, removeFavorite } = moviesSlice.actions;

export default moviesSlice.reducer;
