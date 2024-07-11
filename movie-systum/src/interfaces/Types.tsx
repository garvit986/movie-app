export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  favorites: string[];
}

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Comments?: { user: User; comment: string }[];
  Rating? : number
}

export interface Comment {
  id: string;
  imdbID: string;
  username: string;
  text: string;
  date: string;
  rating: number;
}

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  suggestions: string[];
}

export interface FormValues  {
  username: string;
  password: string;
  name: string;
  email: string;
  favorites: string[];
};