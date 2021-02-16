import React,{Fragment} from "react";
import {Link} from "react-router-dom";
import MyButton from "../util/MyButton";
import {isAuthenticated} from "../util/userApi";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";

const Navbar=()=>{
  return(
    <AppBar position="fixed">
     <Toolbar className="nav-container">
    {isAuthenticated()?(
      <Fragment>
     <Link to="/">
     <MyButton tip="Home">
     <HomeIcon/>
     </MyButton>
     </Link>
     </Fragment>
    ):(
      <Fragment>
     <Button color="inherit" component={Link} to="/login">Login</Button>
     <Button color="inherit" component={Link} to="/">Home</Button>
     <Button color="inherit" component={Link} to="/signup">Signup</Button>
     </Fragment>
    )}
    </Toolbar>
      </AppBar>
  )
}

export default Navbar;
