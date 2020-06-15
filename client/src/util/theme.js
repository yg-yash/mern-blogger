import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import grey from "@material-ui/core/colors/grey";
export default {
  palette: {
    primary: {
      light: purple["300"],
      main: purple["500"],
      dark: purple["900"],
      contrastText: grey["200"]
    },
    secondary: {
      light: pink["300"],
      main: pink["500"],
      dark: pink["900"],
      contrastText: grey["200"]
    },
    error: {
      light: red["300"],
      main: red["500"],
      dark: red["900"],
      contrastText: grey["200"]
    },
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
};
