import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { loadMovies } from "../redux/movieSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { addFavoriteMovie } from "../utils/LocalForage";
import SearchBar from "../components/Search";
import { Movie } from "../interfaces/Types";

const MoviesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [favoriteStatus, setFavoriteStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

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
        setFavoriteStatus((prevStatus) => ({
          ...prevStatus,
          [imdbID]: true,
        }));
      }
    }
  };

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = movies.filter(
      (movie) =>
        movie.Title.toLowerCase().includes(lowercasedTerm) ||
        movie.Plot.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredMovies(filtered);
  };

  const suggestions = movies.map((movie) => movie.Title);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <SearchBar onSearch={handleSearch} suggestions={suggestions} />
      <Grid container spacing={2}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Card sx={{ maxWidth: 345, mx: "auto" }}>
              <CardActionArea onClick={() => handleDetailsClick(movie.imdbID)}>
                <CardMedia
                  component="img"
                  alt={movie.Title}
                  height="500"
                  image={movie.Poster}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.Plot}
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
                    {favoriteStatus[movie.imdbID]
                      ? "Added to Favorites"
                      : "Add to Favorites"}
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MoviesList;
