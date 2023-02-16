import { teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: teal[800],
      light: "#757ce8",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
});

export default muiTheme;
