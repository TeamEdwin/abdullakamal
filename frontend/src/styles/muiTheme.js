import { createTheme } from "@mui/material/styles";

export default createTheme({
  overrides: {
    MuiMobileStepper: {
      root: {
        "&$completed": {
          color: "pink",
        },
        "&$active": {
          color: "red",
        },
      },
      active: {},
      completed: {},
    },
  },
  palette: {
    common: {
      akmcPrimary: `#bc7fcd`,
    },
    akmcPrimary: {
      main: `#bc7fcd`,
      dark: `#86469c`,
      contrastText: `#fff`,
    },
    white: {
      main: `#fff`,
      contrastText: `#000`,
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Poppins, san-serif",
  },
});
