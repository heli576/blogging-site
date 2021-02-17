import React,{useState} from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import {login,authenticate,isAuthenticated} from "../util/userApi";
import Logo from "../images/logo.png";

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,

textField:{
  [theme.breakpoints.down('sm')]: {
   width:"85%",
   margin:"5px auto"
 },
  [theme.breakpoints.up('md')]: {
    margin:"5px auto",
    width:"100%"
  }
}


}));


const Login=()=>{
  const classes=useStyles();
  const [values,setValues]=useState({
   email:"",
   password:"",
   error:"",
   loading:false,
   redirectToReferrer:false
 });

 const {email,password,error,loading,redirectToReferrer}=values;
const {user}=isAuthenticated();
const handleChange=(name)=>(event)=>{
 setValues({...values,error:false,[name]:event.target.value});
};

const handleSubmit=(event)=>{
 event.preventDefault()
 setValues({...values,error:false,loading:true});
 login({email,password})
 .then(data=>{
   if(data.error){
     setValues({...values,error:data.error,loading:false})
   }else{
   authenticate(data,()=>{
     setValues({
       ...values,
       redirectToReferrer:true,
     });
   });
   }
 });
};

const redirectUser=()=>{
  if(redirectToReferrer){
  return <Redirect to="/"/>
  }
}
  return(
    <div>
      <Navbar/>
      <Grid container className={classes.form}>
    <Grid item sm/>
    <Grid item sm>
    <img src={Logo} style={{height:100,width:100,marginTop:100}} alt="logo"/>
<Typography variant="h4" className={classes.pageTitle}>Login</Typography>
<form noValidate onSubmit={handleSubmit}>
<TextField
  color="secondary"
id="email"
name="email"
type="email"
label="Email"
className={classes.textField}
value={email}
onChange={handleChange("email")}
fullWidth/>
<TextField
  color="secondary"
id="password"
name="password"
type="password"
label="Password"
className={classes.textField}
value={password}
onChange={handleChange("password")}
fullWidth/>

{error && (
  <Typography variant="body2" className={classes.customError}>
{error}
  </Typography>
)}
<Button
type="submit"
variant="contained"
color="secondary"
className={classes.button}
disabled={loading}>Login
{loading && (
  <CircularProgress size={30} className={classes.progress}/>
)}
</Button>
<br />
<small>Don't have an account? Signup <Link to="/signup">here</Link></small>
</form>
    </Grid>
    <Grid item sm/>
    </Grid>
    {redirectUser()}
  </div>
  )
}

export default Login;
