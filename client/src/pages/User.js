import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import {getUserData} from "../util/userApi";
import StaticProfile from "../components/profile/StaticProfile";

const User=(props)=>{
const [user,setUser]=useState({});
const [error,setError]=useState(false);

const loadUserData=userId=>{
getUserData(userId).then(data=>{
  if(data.error){
    setError(data.error);
  }else{
    setUser(data);
}
})
}

useEffect(()=>{
const userId=props.match.params.userId;
loadUserData(userId);
},[props]);

  return(
    <div>
    <Navbar/>
      <Grid container spacing={16} style={{marginTop:100}}>
      <Grid item lg={4} md={4} sm={12} xs={12}>
    <StaticProfile user={user}/>
    </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12}>
      blog
      </Grid>
      </Grid>
    </div>
  )
}

export default User;
