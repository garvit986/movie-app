import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { User } from "../interfaces/Types";
import { registerUser } from "../utils/LocalForage";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { FormValues } from "../interfaces/Types";

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setMessage("");

    try {
      const user: User = {
        id: 0,
        ...data,
      };
      await registerUser(user);
      setTimeout(() => {
        setLoading(false);
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
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "92%",
            maxWidth: 600,
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
            Register
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
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="outlined-name"
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email is not valid",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    id="outlined-email"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
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
