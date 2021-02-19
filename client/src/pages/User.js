import React,{useState,useEffect,Fragment} from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import {getUserBlogs,postBlog,deleteBlog,updateBlog,getBlog,likeBlog} from "../util/blogApi";
import {getUserData,isAuthenticated} from "../util/userApi";
import StaticProfile from "../components/profile/StaticProfile";
import { makeStyles } from '@material-ui/core/styles';
import MyButton from "../util/MyButton";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
submitButton:{
  position:"relative",
  float:"right",
  marginTop:10
},
progressSpinner:{
  position:"absolute"
},
closeButton:{

  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"80%",
    marginTop:4
  },
  [theme.breakpoints.up('sm')]: {
    position:"absolute",
    left:"90%",
    marginTop:4
  },
[theme.breakpoints.up('md')]: {
  position:"absolute",
  left:"90%",
  marginTop:4
  }
},
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
},
deleteButton:{
  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"85%",
    top:"10%"
  },
  [theme.breakpoints.up('md')]: {
    position:"absolute",
    left:"90%",
    top:"10%"
  },

}
}));


const User=(props)=>{
  dayjs.extend(relativeTime);
  const [blogs,setBlogs]=useState([]);
  const classes=useStyles();
const [user,setUser]=useState({});
const [updateblog,setUpdateBlog]=useState({});
const [open,setOpen]=useState(false);
const [error,setError]=useState("");
const id=isAuthenticated()&&isAuthenticated().user._id;
const token=isAuthenticated()&&isAuthenticated().token;


const loadUserData=userId=>{
getUserData(userId).then(data=>{
  if(data.error){
    setError(data.error);
  }else{
    setUser(data);
}
})
}


const getBlogs=(userId)=>{
getUserBlogs(userId)
.then(data=>{
if(data.error)
console.log(data.error)
else {
setBlogs(data);
}
})
}

const deleteblog=(blogId)=>{
deleteBlog(props.match.params.userId,blogId,token).then(data=>{
if(data.error)
console.log(data.error);
else {
  getBlogs(props.match.params.userId);
}
})

};

const handleUpdateOpen=(blog)=>{
  setOpen(true);
  setUpdateBlog(blog);
}

const handleUpdateChange=(name)=>(event)=>{
  const value=event.target.value;
 setUpdateBlog({...updateblog,[name]:value});
};

const handleEdit=(blogId)=>(event)=>{
event.preventDefault();
setUpdateBlog({...updateblog});
const body={title:updateblog.title,description:updateblog.description};

updateBlog(blogId,id,token,body).then(data=>{
setUpdateBlog({});
setOpen(false);
getBlogs(id);
}
)
}

const likeTheBlog=(blogId)=>{
likeBlog(id,blogId,token)
.then(data=>{
  getBlogs(props.match.params.userId)
})
}




const blogComponent=(blog)=>{

const deleteButton=isAuthenticated() && blog.user==id?(  <Fragment>
  <MyButton tip="Delete Blog" onClick={()=>deleteblog(blog._id)}>
<DeleteOutline color="primary"/>
  </MyButton>
</Fragment>):null;

  const updateButton=isAuthenticated() && blog.user==id?(
    <Fragment>
       <MyButton tip="Update Blog" onClick={()=>handleUpdateOpen(blog)} btnClassName={classes.deleteButton}>
   <EditIcon color="secondary"/>
       </MyButton>
       <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
 <MyButton tip="Close" onClick={()=>setOpen(false)} tipClassName={classes.closeButton}>
<CloseIcon/>
 </MyButton>
 <DialogTitle>
 Edit blog
 </DialogTitle>
 <DialogContent>
    <form onSubmit={handleEdit(updateblog._id)}>
      <TextField
      name="title"
      type="text"
      label="Title"
      placeholder="Blog title"
      className={classes.textField}
      value={updateblog.title}
      onChange={handleUpdateChange("title")}
      fullWidth
      />
    <TextField
    name="description"
    type="text"
    label="Description"
    multiline
    rows="4"
    placeholder="Blog description"
    className={classes.textField}
    value={updateblog.description}
    onChange={handleUpdateChange("description")}
    fullWidth
    />
    {error && (
      <Typography variant="body2" className={classes.customError}>
    {error}
  </Typography>
    )}
<Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>
Edit
</Button>
</form>
    </DialogContent>
</Dialog>
</Fragment>

  ):null;
  const likeButton=!isAuthenticated()?(
<Link to ="/login">
      <MyButton tip="Like">
      <ThumbUpAltIcon color="secondary"/>
        </MyButton>
        </Link>

    ):(
        <MyButton tip="Like" onClick={()=>likeTheBlog(blog._id)}>
        <ThumbUpAltIcon color="secondary"/>
        </MyButton>
      );
return(
    <Card className={classes.card}>
    <CardContent className={classes.content}>
       <Typography variant="h6" color="secondary" component={Link} to={`/users/${blog.user}`}>{blog.title}</Typography>
    <Typography variant="body2" color="textSecondary">{dayjs(blog.createdAt).fromNow()}</Typography>
<Typography variant="body1">{blog.description}</Typography>
 {deleteButton}
 {updateButton}
<span>{likeButton}{blog.like} Likes</span>
    </CardContent>
    </Card>
    )
  }


useEffect(()=>{
const userId=props.match.params.userId;
loadUserData(userId);
getBlogs(userId);
},[props]);

  return(
    <div>
    <Navbar/>
      <Grid container spacing={16} style={{marginTop:100}}>
      <Grid item lg={4} md={4} sm={12} xs={12}>
    <StaticProfile user={user}/>
    </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        {blogs.map((b)=>blogComponent(b))}
      </Grid>
      </Grid>
    </div>
  )
}

export default User;
