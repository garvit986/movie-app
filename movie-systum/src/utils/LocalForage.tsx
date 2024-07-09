import localforage from 'localforage';
import { User } from '../interfaces/Types';

const USER_KEY = 'user';
const FAVORITES_KEY_PREFIX = 'favorites_';


export const registerUser = async (user: User)=> {
  const users = (await localforage.getItem<User[]>(USER_KEY)) || [];
    const userIndex = users.findIndex((u) => u.id === user.id);
      users[userIndex] = user;
      user.id = users.length + 1;
      users.push(user);
    await localforage.setItem(USER_KEY, users);
  };

export const loginUser = async (username: string, password: string) => {
  const user = await localforage.getItem<User>(USER_KEY);
  if (user && user.username === username && user.password === password) {
    return user;
  }
};

export const addFavoriteMovie = async (username: string, imdbID: string) => {
  const favoriteskey = `${FAVORITES_KEY_PREFIX}${username}`
  let favorites: string[] = await localforage.getItem<string[]>(favoriteskey) || [];
  if (!favorites.includes(imdbID)) {
    favorites.push(imdbID);
    await localforage.setItem(favoriteskey, favorites);
  }
};

export const getFavoriteMovies = async (username: string): Promise<string[]> => {
  const favoriteskey = `${FAVORITES_KEY_PREFIX}${username}`
  return await localforage.getItem<string[]>(favoriteskey) || [];
};

export const removeFavoriteMovie = async (username: string, imdbID: string): Promise<void> => {
  let favoritesKey = `${FAVORITES_KEY_PREFIX}${username}`;
  let favorites: string[] = await localforage.getItem<string[]>(favoritesKey) || [];
  favorites = favorites.filter(id => id !== imdbID);
  await localforage.setItem(favoritesKey, favorites);
};