import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";

const theme=createMuiTheme(themeFile);

const Routes=()=>{
  return(
     <MuiThemeProvider theme={theme}>
  <Router>
      <Switch>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/" exact component={Home}/>
      <Route path="/users/:userId" exact component={User}/>
    </Switch>
    </Router>
    </MuiThemeProvider>
)
}

export default Routes;
