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
      const movieDetail = () => {
        const movie = moviesData.find((movie) => movie.imdbID === id);
        setMovie(movie);
      };
      movieDetail();

      const fetchComment = async () => {
        const fetched = await getComments(id);
        setComments(fetched);
      };
      fetchComment();
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
      <Card sx={{ maxWidth: 800, mx: "auto" }}>
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
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Comments</Typography>
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id}>
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
      </Card>
    </Box>
  );
};

export default MovieDetails;
