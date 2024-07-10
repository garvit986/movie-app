import React, { useEffect, useState } from "react";
import { Movie } from "../interfaces/Types";
import { getFavoriteMovies, removeFavoriteMovie } from "../utils/LocalForage";
import moviesData from "../movies.json";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { Grid } from "@mui/material";
import { ListItemText } from "@mui/material";
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
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {favoriteMovies.map((movie) => (
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
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(movie.imdbID)}
                >
                  Remove Favourites
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DisplayFavorites;
