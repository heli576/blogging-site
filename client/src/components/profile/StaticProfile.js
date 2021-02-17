import React,{Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import dayjs from "dayjs";
import {Link} from "react-router-dom";

import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import EmailIcon from '@material-ui/icons/Email';
import CalendarToday from "@material-ui/icons/CalendarToday";

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


const StaticProfile=({user})=>{
  const classes=useStyles();
  return(
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
    </div>
    </Paper>
  )
}

export default StaticProfile;
