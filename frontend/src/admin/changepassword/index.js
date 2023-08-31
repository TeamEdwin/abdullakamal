import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import Axios from "axios";
import { AuthContext } from "../../context/auth";
import { CircularProgress } from "@mui/material";

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

export default function ChangePassword() {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataform = new FormData(event.currentTarget);
    setLoading(true);

    const vauedata = {
      email: dataform.get("email"),
      code: dataform.get("code"),
      newPassword: dataform.get("password"),
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/resetPassword`;
    const options = {
      method: "POST",
      url: url,
      data: vauedata,
    };
    console.log(options);

    await Axios(options)
      .then((res) => {
        toast.success("Password has been reset successfully");
        console.log(res);
        setLoading(false);

        navigate("/adminlogin");
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
        // toast.error(data.error);
        setLoading(false);
      });
  };

  return (
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
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            initialvalues={{ remember: true }}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
                  name="code"
                  label="Enter Reset Code"
                  type="number"
                  id="code"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
