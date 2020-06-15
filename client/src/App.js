import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "./store/store";
import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import Navbar from "./layouts/Navbar";
import PrivateRoute from "./util/PrivateRoute";
import Profile from "./components/User/Profile";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { logout, getUserData } from "./store/actions/user";
import { SET_AUTHENTICATED } from "./store/types";
import Offline from "./components/Offline";
import { Detector } from "react-detect-offline";
const theme = createMuiTheme(themeFile);
const token = localStorage.jwtToken;
// Check for token to keep user logged in
if (token) {
  const decoded = jwt_decode(token);
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());
    // Redirect to login
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    setAuthToken(token);
    store.dispatch(getUserData());
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Detector
            render={({ online }) => {
              if (online) {
                return (
                  <div style={{ margin: "20px" }}>
                    <Switch>
                      <Route path="/login" exact component={Login} />
                      <Route path="/signup" exact component={Signup} />
                      <PrivateRoute path="/profile" exact component={Profile} />
                      <PrivateRoute path="/" exact component={Home} />
                    </Switch>
                  </div>
                );
              } else {
                return <Offline />;
              }
            }}
          />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
