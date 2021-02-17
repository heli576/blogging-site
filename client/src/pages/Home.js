import React from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Profile from "../components/profile/Profile";
import {getUser} from "../util/userApi";
const Home=()=>{
  return(
    <div>
      <Navbar/>
        <Grid container spacing={16} style={{marginTop:100}}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
      <Profile/>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
        Blog
        </Grid>


        </Grid>
    </div>
  )
}

export default Home;
