import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/store';
import Home from './pages/home';
import Login from './pages/Login';
import Signup from './pages/signup';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import Navbar from './layouts/Navbar';
import AuthRoute from './util/AuthRoute';
import Profile from './components/User/Profile';
import jwtDecode from 'jwt-decode';
import { logout, getUserData } from './store/actions/user';
import { SET_AUTHENTICATED } from './store/types';
import Offline from './components/Offline';
import { Detector } from 'react-detect-offline';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
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
                  <div style={{ margin: '20px' }}>
                    <Switch>
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={Signup} />
                      <AuthRoute path="/profile" component={Profile} />
                      <AuthRoute path="/" component={Home} />
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
