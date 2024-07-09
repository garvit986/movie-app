import React, { useState, FC, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { User } from "../interfaces/Types";
import { registerUser } from "../utils/LocalForage";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Register: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email is not valid";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const user: User = {
        id: 0,
        username,
        password,
        name,
        email,
      };
      await registerUser(user);
      setTimeout(() => {
        setLoading(false); // Hide loader after 2 seconds
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
      setLoading(false);
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
            maxWidth: 600,
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
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-password"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-name"
                label="Name"
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-email"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Register
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

export default Register;
