import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import moviesData from '../movies.json';
import { Movie } from '../interfaces/Types';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    if (id) {
      const movieDetail = () => {
        const movie = moviesData.find((movie) => movie.imdbID === id);
        setMovie(movie);
      };
      movieDetail();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
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
          <Typography variant="body2" color="text.secondary">
            Genre: {movie.Genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Director: {movie.Director}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Actors: {movie.Actors}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ratings:
            {movie.Ratings.map((rating, index) => (
              <div key={index}>
                {rating.Source}: {rating.Value}
              </div>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetails;
