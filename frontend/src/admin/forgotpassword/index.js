import { useState, useContext, Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { isAuth } from "../../context/helpers";

import theme from "../theme";

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

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const vauedata = {
      email: data.get("email"),
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/forgotPassword`,
        vauedata
      );
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Check your email. Password reset code is sent.");
        setLoading(false);
        setVisible(true);
        navigate("/changepassword");
      }
    } catch (err) {
      toast.error("Forgot Password failed. Try again.");
      setLoading(false);
    }
  };

  const forgetPasswordForm = (
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
            Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
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
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
                disabled={loading}
              >
                Reset Password
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );

  return (
    <Fragment>
      {isAuth() ? <Navigate to="/dashboard" replace /> : forgetPasswordForm}
    </Fragment>
  );
}
