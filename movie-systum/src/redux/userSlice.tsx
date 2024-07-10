import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: {
    id: number;
    username: string;
    favorites: string[];
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: { id: 0, username: "", favorites: [] },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: number;
        username: string;
        favorites?: string[];
      }>
    ) => {
      state.currentUser = {
        id: action.payload.id,
        username: action.payload.username,
        favorites: action.payload.favorites || [],
      };
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = { id: 0, username: "", favorites: [] };
      state.isLoggedIn = false;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.currentUser.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.currentUser.favorites = state.currentUser.favorites.filter(
        (fav) => fav !== action.payload
      );
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
