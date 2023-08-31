import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    common: {
      akmcPrimary: `#bc7fcd`,
    },
    akmcPrimary: {
      main: `#bc7fcd`,
      dark: `#86469c`,
      contrastText: `#fff`,
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Roboto, san-serif",
  },
});
