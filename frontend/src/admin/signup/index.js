import { Fragment, useState, useContext } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import axios from "axios";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { isAuth } from "../../context/helpers";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "} Dr. Abdulla Kamal Medical Centre{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

export default function SignUp() {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataform = new FormData(event.currentTarget);
    setLoading(true);

    const vauedata = {
      name: dataform.get("firstName"),
      // secondname: dataform.get("lastName"),
      email: dataform.get("email"),
      password: dataform.get("password"),
    };
    console.log("-------Value after form ", vauedata);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        vauedata
      );
      if (data?.error) {
        console.log(data.error);
        toast.error(data.error);
        setLoading(false);
      } else {
        console.log("--Sucesss");

        setAuth(data);

        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed up");
        setLoading(false);

        window.location.href = "/adminlogin";
      }
    } catch (err) {
      toast.error(err.response.data.email);
      console.log("Signup failed. Try again.");

      setLoading(false);
    }
  };

  const signUpForm = (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ direction: "ltr" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            initialvalues={{ remember: true }}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  type="text"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  rules={[{ type: "email" }]}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign Up
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-0.8rem",
                    marginLeft: "-1.2rem",
                  }}
                />
              )}
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/adminlogin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );

  return (
    <Fragment>
      {isAuth() ? <Navigate to="/dashboard" replace /> : signUpForm}
    </Fragment>
  );
}
