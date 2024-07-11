import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/LocalForage";
import { login } from "../redux/userSlice";
import { FormValues } from "../interfaces/Types";

const Login: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const user = await loginUser(data.username, data.password);
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
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "92%",
            maxWidth: 400,
            mx: "auto",
            p: 2,
            mt: 18,
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
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="outlined-username"
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="outlined-password"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Login
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default Login;