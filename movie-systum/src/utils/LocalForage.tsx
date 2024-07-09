import localforage from "localforage";
import { User, Comment } from "../interfaces/Types";

const USER_KEY_PREFIX = "user_";
const FAVORITES_KEY_PREFIX = "favorites_";
const COMMENTS_KEY_PREFIX = "comments_";

export const registerUser = async (user: User) => {
  const userkey = `${USER_KEY_PREFIX}${user.username}`;
  //const users = await localforage.getItem<User[]>(USER_KEY_PREFIX);
  await localforage.setItem(userkey, user);
};

export const loginUser = async (username: string, password: string) => {
  const userkey = `${USER_KEY_PREFIX}${username}`;
  const user = await localforage.getItem<User>(userkey);
  if (user && user.username === username && user.password === password) {
    return user;
  }
};

export const addFavoriteMovie = async (username: string, imdbID: string) => {
  const favoriteskey = `${FAVORITES_KEY_PREFIX}${username}`;
  let favorites: string[] =
    (await localforage.getItem<string[]>(favoriteskey)) || [];
  if (!favorites.includes(imdbID)) {
    favorites.push(imdbID);
    await localforage.setItem(favoriteskey, favorites);
  }
};

export const getFavoriteMovies = async (
  username: string
): Promise<string[]> => {
  const favoriteskey = `${FAVORITES_KEY_PREFIX}${username}`;
  return (await localforage.getItem<string[]>(favoriteskey)) || [];
};

export const removeFavoriteMovie = async (
  username: string,
  imdbID: string
): Promise<void> => {
  let favoritesKey = `${FAVORITES_KEY_PREFIX}${username}`;
  let favorites: string[] =
    (await localforage.getItem<string[]>(favoritesKey)) || [];
  favorites = favorites.filter((id) => id !== imdbID);
  await localforage.setItem(favoritesKey, favorites);
};

export const addComment = async (
  username: string,
  imdbID: string,
  text: string
) => {
  const comment: Comment = {
    id: `${imdbID}_${Date.now()}`,
    imdbID,
    username,
    text,
    date: new Date().toISOString(),
  };

  let comments: Comment[] =
    (await localforage.getItem<Comment[]>(COMMENTS_KEY_PREFIX)) || [];
  if (!Array.isArray(comments)) {
    comments = [];
  }

  comments.push(comment);
  await localforage.setItem(COMMENTS_KEY_PREFIX, comments);
};

export const getComments = async (imdbID: string): Promise<Comment[]> => {
  const comments =
    (await localforage.getItem<Comment[]>(COMMENTS_KEY_PREFIX)) || [];
  return comments.filter((comment) => comment.imdbID === imdbID);
};
