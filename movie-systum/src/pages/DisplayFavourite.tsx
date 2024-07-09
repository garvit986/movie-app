import React, { useEffect, useState } from "react";
import { Movie } from "../interfaces/Types";
import { getFavoriteMovies, removeFavoriteMovie } from "../utils/LocalForage";
import moviesData from "../movies.json";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const DisplayFavorites: React.FC = () => {
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = await getFavoriteMovies(currentUser.username);
      const favorites = moviesData.filter((movie) =>
        favoriteIds.includes(movie.imdbID)
      );
      setFavoriteMovies(favorites);
    };

    fetchFavorites();
  }, [currentUser.username]);

  const handleDetailsClick = (imdbID: string) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/movies/${imdbID}`);
    }
  };

  const handleRemove = async (imdbID: string) => {
    await removeFavoriteMovie(currentUser.username, imdbID);
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.imdbID !== imdbID
    );
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {favoriteMovies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
          <Card sx={{ maxWidth: 345, mx: "auto" }}>
            <CardMedia
              component="img"
              alt={movie.imdbID}
              height="500"
              image={movie.Poster}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {movie.Title}
              </Typography>
              <List>
                {movie.Ratings.map((rating, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${rating.Source}: ${rating.Value}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetailsClick(movie.imdbID)}
                  sx={{ mr: 2 }}
                >
                  Movie Details
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(movie.imdbID)}
                >
                  Remove Favourites
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayFavorites;
