import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import moviesData from "../movies.json";
import { Movie, Comment } from "../interfaces/Types";
import { addComment, getComments } from "../utils/LocalForage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const username = useSelector(
    (state: RootState) => state.user.currentUser.username
  );

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = () => {
        const selectedMovie = moviesData.find((movie) => movie.imdbID === id);
        setMovie(selectedMovie);
      };
      fetchMovieDetails();

      const fetchComments = async () => {
        const fetchedComments = await getComments(id);
        setComments(fetchedComments);
      };
      fetchComments();
    }
  }, [id]);

  const handleAddComment = async () => {
    if (id && newComment && username) {
      await addComment(username, id, newComment);
      const updatedComments = await getComments(id);
      setComments(updatedComments);
      setNewComment("");
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ display: "flex", maxWidth: 800, mx: "auto" }}>
        <CardMedia
          component="img"
          alt={movie.Title}
          height="500"
          image={movie.Poster}
          sx={{ maxWidth: 300 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" component="div" fontWeight="bold">
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Plot:</strong> {movie.Plot}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Genre:</strong> {movie.Genre}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Director:</strong> {movie.Director}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Actors:</strong> {movie.Actors}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <strong>Ratings:</strong>
              {movie.Ratings.map((rating, index) => (
                <div key={index}>
                  {rating.Source}: {rating.Value}
                </div>
              ))}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Comments</Typography>
              <List>
                {comments.map((comment) => (
                  <ListItem key={comment.id} sx={{ mt: 1 }}>
                    <ListItemText
                      primary={comment.text}
                      secondary={`By ${comment.username} on ${new Date(
                        comment.date
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
              <TextField
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                sx={{ mt: 1 }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default MovieDetails;
