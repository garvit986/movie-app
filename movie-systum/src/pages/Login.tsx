import React, { useState, FC, FormEvent } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/LocalForage";
import { login } from "../redux/userSlice";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await loginUser(username, password);
      setLoading(false);
      if (user) {
        // Login successful, navigate to home or profile page
        console.log("Login successful:", user);
        // Dispatch login action to Redux store
        dispatch(login(user));
        navigate("/movies");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to login");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            p: 2,
            mt: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Login
              </Button>
            </Grid>
          </Grid>
          {message && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default Login;
