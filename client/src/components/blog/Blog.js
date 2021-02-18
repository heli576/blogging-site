import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../../util/MyButton";
import DeleteBlog from "./DeleteBlog";
//import LikeButton from "./LikeButton";
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import {isAuthenticated,getUserData} from "../../util/userApi";

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
card:{

   [theme.breakpoints.down('xs')]: {
     position:"relative",
     display:"flex",
     marginTop: 20,
marginLeft:10,
marginRight:10,


   },
   [theme.breakpoints.up('sm')]: {
     position:"relative",
     display:"flex",
      marginBottom: 20,
      marginRight:60,
      marginLeft:60
   },
 [theme.breakpoints.up('md')]: {
   position:"relative",
   display:"flex",
    marginBottom: 20,
    marginRight:100
   }
},

content:{
  [theme.breakpoints.down('sm')]: {
    padding:25,
  objectFit:"cover",

},
[theme.breakpoints.up('md')]: {
 padding:25,
objectFit:"cover",
}
}

}));


const Blog=({blog})=>{
dayjs.extend(relativeTime);
const classes=useStyles();
const [author,setAuthor]=useState({});
const {title,description,createdAt,user,like} =blog;
const userId = isAuthenticated() && isAuthenticated().user._id;

const loadUserData=user=>{
getUserData(user).then(data=>{
  if(data.error){
    console.log(data.error)
  }else{
    setAuthor(data);
}
})
}

useEffect(()=>{
loadUserData(user);
},[]);

      const deleteButton=isAuthenticated() && user==userId?(
        <DeleteBlog blogId={blog._id}/>
      ):null;
return(
    <Card className={classes.card}>
    <CardContent className={classes.content}>
    <Typography variant="h5" component={Link} to={`/users/${author._id}`} color="secondary">{author.name}</Typography>
   {deleteButton}
    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
    <Typography variant="h6" color="secondary">{title}</Typography>
    <Typography variant="body1">{description}</Typography>

    </CardContent>
    </Card>
    )
  }




export default Blog;
