import { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import Header from "./_common/Header";
import theme from "../theme";
import "./index.scss";
import { isAuth } from "../../context/helpers";

function DashboardContent() {
  console.log(isAuth().role === "admin");
  const dashboardEntry = (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", direction: "ltr" }}>
        <CssBaseline />

        <Header />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );

  return (
    <Fragment>
      {isAuth() ? (
        isAuth().role === "admin" ? (
          dashboardEntry
        ) : (
          <Navigate to="/userpage" />
        )
      ) : (
        <Navigate to="/" />
      )}
    </Fragment>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
