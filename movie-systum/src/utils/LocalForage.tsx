import localforage from "localforage";
import { User, Comment } from "../interfaces/Types";

const USERS_KEY = "users";
const COMMENTS_KEY_PREFIX = "comments_";

export const registerUser = async (user: User) => {
  let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  users.push(user);
  await localforage.setItem(USERS_KEY, users);
};

export const loginUser = async (username: string, password: string) => {
  let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  if (users) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    return user;
  }
  return null;
};

export const addFavoriteMovie = async (username: string, imdbID: string) => {
  let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex > -1) {
    const user = users[userIndex];
    if (!user.favorites) {
      user.favorites = [];
    }
    if (!user.favorites.includes(imdbID)) {
      user.favorites.push(imdbID);
      users[userIndex] = user;
      await localforage.setItem(USERS_KEY, users);
    }
  }
};

export const getFavoriteMovies = async (
  username: string
): Promise<string[]> => {
  let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const user = users.find((u) => u.username === username);
  return user ? user.favorites || [] : [];
};

export const removeFavoriteMovie = async (
  username: string,
  imdbID: string
): Promise<void> => {
  let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex > -1) {
    const user = users[userIndex];
    if (!user.favorites) {
      user.favorites = [];
    }
    user.favorites = user.favorites.filter((id) => id !== imdbID);
    users[userIndex] = user;
    await localforage.setItem(USERS_KEY, users);
  }
};

export const addComment = async (
  username: string,
  imdbID: string,
  text: string,
  rating: number
) => {
  const comment: Comment = {
    id: `${imdbID}_${Date.now()}`,
    imdbID,
    username,
    text,
    rating,
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
