import { useState, useContext, Fragment } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
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
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import toast from "react-hot-toast";
import theme from "../theme";
import { AuthContext } from "../../context/auth";
import { authenticate, isAuth } from "../../context/helpers";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "} Dr. Abdulla Kamal Medical Centre {new Date().getFullYear()}.
    </Typography>
  );
}

export default function LogIn() {
  const history = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const vauedata = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        vauedata
      );
      if (data?.error) {
        toast.error("Issues Login.. ");
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        console.log(data);

        authenticate(data, () => {
          isAuth() && isAuth().role === "admin"
            ? history(`/dashboard`)
            : history("/");
        });
      }
    } catch (err) {
      setLoading(false);

      toast.error(`Signin failed.. ${err.response.data.email}`);
    }
  };

  const loginForm = (
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
            Log In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2 }}
                  onSubmit={handleSubmit}
                >
                  Log In
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
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/forgotpassword"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/adminsignup"
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );

  return (
    <Fragment>
      {isAuth() ? <Navigate to="/dashboard" replace /> : loginForm}
    </Fragment>
  );
}
