import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  CardActionArea,
} from "@mui/material";
import { loadMovies } from "../redux/movieSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { addFavoriteMovie } from "../utils/LocalForage";

const MoviesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [addedFavorites, setAddedFavorites] = useState<string[]>([]);
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);

  const handleDetailsClick = (imdbID: string) => {
    navigate(`/movies/${imdbID}`);
  };

  const handleAddToFavouritesClick = async (imdbID: string) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const movie = movies.find((movie) => movie.imdbID === imdbID);
      if (movie) {
        await addFavoriteMovie(currentUser.username, imdbID);
        setAddedFavorites([...addedFavorites, imdbID]);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
          <Card sx={{ maxWidth: 345, mx: "auto" }}>
            <CardActionArea onClick={() => handleDetailsClick(movie.imdbID)}>
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
              </CardContent>
            </CardActionArea>
            {isLoggedIn && (
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddToFavouritesClick(movie.imdbID)}
                >
                  {addedFavorites.includes(movie.imdbID) ? "Added to Favorites" : "Add to Favorites"}
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesList;
