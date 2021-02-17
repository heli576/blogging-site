import React,{Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect,withRouter} from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../../util/MyButton";

//MUI Stuff
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

//Icons
import EmailIcon from "@material-ui/icons/Email";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import CalendarToday from "@material-ui/icons/CalendarToday";

import {signout,isAuthenticated} from "../../util/userApi";

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
paper:{
  [theme.breakpoints.down('sm')]: {
    padding:20,
    marginBottom:20,
    marginLeft:35,
    marginRight:35
  },
  [theme.breakpoints.up('sm')]: {
    padding:20,
    marginLeft:100,
    marginRight:100,
    marginBottom:20
  },
[theme.breakpoints.up('md')]: {
    padding:20,
    marginLeft:100,
    marginRight:20
  }
}
}));


const Profile=({history})=>{

const {user}=isAuthenticated();

const classes=useStyles();

let profileMarkup=isAuthenticated()?(
      <Paper className={classes.paper}>
      <div className={classes.profile}>
      <div className="profile-details">
      <MuiLink component={Link} to={`/users/${user._id}`} color="primary" variant="h5">
@{user.name}
      </MuiLink>
      <hr/>
      {user.about && <Typography variant="body1">{user.about}</Typography>}
      <hr/>
      {user.email && (
        <Fragment>
        <EmailIcon color="primary"/>
        <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
{" "}{user.email}
        </a>
        <hr/>
        </Fragment>
      )}
      <CalendarToday color="primary"/>{" "}
      <span>Joined {dayjs(user.createdAt).format(`MMM YYYY`)}</span>
      </div>
      <MyButton tip="Logout" onClick={() =>signout(() =>{
        history.push("/login")
      })}>
      <KeyboardReturn color="primary"/>
      </MyButton>
      </div>
      </Paper>
    ):(
      <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
      No profile found,please login again
      </Typography>
      <div className={classes.buttons}>
      <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
<Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
      </div>
      </Paper>
    )
    return profileMarkup;


}

export default withRouter(Profile);
